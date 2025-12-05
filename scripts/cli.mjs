#!/usr/bin/env node
/**
 * Slidev Starter CLI
 * A unified command-line interface for managing Slidev presentations
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, basename } from 'node:path'
import { spawn } from 'node:child_process'
import { createInterface } from 'node:readline'

// ============================================================================
// Configuration
// ============================================================================

const ROOT_DIR = process.cwd()
const SLIDES_DIR = join(ROOT_DIR, 'slides')
const COMPONENTS_DIR = join(SLIDES_DIR, 'components')
const CONFIG_FILE = join(ROOT_DIR, 'slidev.config.json')

const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
}

const ICONS = {
  slides: '📊',
  rocket: '🚀',
  package: '📦',
  check: '✅',
  error: '❌',
  party: '🎉',
  info: 'ℹ️',
  gear: '⚙️',
  user: '👤',
}

// ============================================================================
// Utilities
// ============================================================================

const log = {
  info: (msg) => console.log(`${COLORS.cyan}${msg}${COLORS.reset}`),
  success: (msg) => console.log(`${COLORS.green}${msg}${COLORS.reset}`),
  warn: (msg) => console.log(`${COLORS.yellow}${msg}${COLORS.reset}`),
  error: (msg) => console.log(`${COLORS.red}${msg}${COLORS.reset}`),
  dim: (msg) => console.log(`${COLORS.dim}${msg}${COLORS.reset}`),
}

function loadConfig() {
  try {
    if (existsSync(CONFIG_FILE)) {
      return JSON.parse(readFileSync(CONFIG_FILE, 'utf-8'))
    }
  } catch {
    // ignore
  }
  return null
}

function saveConfig(config) {
  writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2) + '\n')
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}

  const frontmatter = {}
  match[1].split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length) {
      frontmatter[key.trim()] = valueParts.join(':').trim()
    }
  })
  return frontmatter
}

function getSlides() {
  try {
    return readdirSync(SLIDES_DIR)
      .filter((f) => f.endsWith('.md'))
      .map((f) => {
        const content = readFileSync(join(SLIDES_DIR, f), 'utf-8')
        const fm = parseFrontmatter(content)
        return {
          name: basename(f, '.md'),
          file: f,
          path: `slides/${f}`,
          title: fm.title || basename(f, '.md'),
        }
      })
  } catch {
    return []
  }
}

function runCommand(cmd, args, options = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, {
      stdio: 'inherit',
      shell: true,
      cwd: ROOT_DIR,
      ...options,
    })

    proc.on('close', (code) => {
      code === 0 ? resolve() : reject(new Error(`Command failed with code ${code}`))
    })

    proc.on('error', reject)
  })
}

async function prompt(question, defaultValue = '') {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  const hint = defaultValue ? ` ${COLORS.dim}(${defaultValue})${COLORS.reset}` : ''
  return new Promise((resolve) => {
    rl.question(`${question}${hint}: `, (answer) => {
      rl.close()
      resolve(answer.trim() || defaultValue)
    })
  })
}

async function selectSlide(slides, { allowAll = false, message = 'Select a presentation' } = {}) {
  console.log(`\n${ICONS.slides} ${COLORS.bold}${message}:${COLORS.reset}\n`)

  if (allowAll) {
    console.log(`  ${COLORS.dim}0.${COLORS.reset} All presentations`)
  }

  slides.forEach((s, i) => {
    const num = `${COLORS.dim}${i + 1}.${COLORS.reset}`
    const title = s.title !== s.name ? ` ${COLORS.dim}(${s.title})${COLORS.reset}` : ''
    console.log(`  ${num} ${s.name}${title}`)
  })

  console.log()
  const answer = await prompt(`${COLORS.cyan}Enter number${COLORS.reset}`)
  const idx = parseInt(answer, 10)

  if (allowAll && idx === 0) {
    return slides
  }

  if (isNaN(idx) || idx < 1 || idx > slides.length) {
    log.error(`${ICONS.error} Invalid selection`)
    process.exit(1)
  }

  return [slides[idx - 1]]
}

// ============================================================================
// Component Templates
// ============================================================================

function generateCoverSlide(config) {
  const { author, defaults } = config
  return `<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    version?: string;
    date?: string;
    stage?: string;
    githubUrl?: string;
    gradientFrom?: string;
    gradientTo?: string;
  }>(),
  {
    gradientFrom: '${defaults.gradientFrom}',
    gradientTo: '${defaults.gradientTo}',
    githubUrl: '${author.github}',
  },
);
</script>

<template>
  <div class="cover-container">
    <h1>
      {{ title.split(' ')[0] }}
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r"
        :class="\`from-\${gradientFrom || '${defaults.gradientFrom}'} to-\${
          gradientTo || '${defaults.gradientTo}'
        }\`">
        {{ title.split(' ').slice(1).join(' ') }}
      </span>
    </h1>

    <div v-if="subtitle" class="text-2xl text-slate-600 mt-2">
      {{ subtitle }}
    </div>

    <div v-if="version || date || stage" class="pt-8">
      <span
        class="px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-300 text-blue-700 font-medium">
        <span v-if="version">v{{ version }}</span>
        <span v-if="version && date"> | </span>
        <span v-if="date">{{ date }}</span>
        <span v-if="(version || date) && stage"> | </span>
        <span v-if="stage">{{ stage }}</span>
      </span>
    </div>

    <div v-if="githubUrl" class="abs-br m-6 flex gap-2">
      <a
        :href="githubUrl"
        target="_blank"
        alt="GitHub"
        class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-blue-600">
        <carbon-logo-github />
      </a>
    </div>
  </div>
</template>

<style scoped>
.cover-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}
</style>
`
}

function generateQASlide(config) {
  const { author, defaults } = config
  return `<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    email?: string;
  }>(),
  {
    title: 'Q&A',
    subtitle: '${defaults.qaSubtitle}',
    email: '${author.email}',
  },
);
</script>

<template>
  <div class="qa-container">
    <h1 class="text-5xl text-slate-800">{{ title }}</h1>

    <div class="text-slate-600 text-xl mt-4">
      {{ subtitle }}
    </div>

    <div
      v-if="email"
      class="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm">
      📧 Contact: <span class="text-blue-600">{{ email }}</span>
    </div>
  </div>
</template>

<style scoped>
.qa-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}
</style>
`
}

function generateGithubLink(config) {
  const { author } = config
  return `<script setup lang="ts">
withDefaults(
  defineProps<{
    githubUrl?: string;
  }>(),
  {
    githubUrl: '${author.github}',
  },
);
</script>

<template>
  <div v-if="githubUrl" class="abs-br m-6 flex gap-2">
    <a 
      :href="githubUrl" 
      target="_blank" 
      alt="GitHub"
      class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-blue-600"
    >
      <carbon-logo-github />
    </a>
  </div>
</template>
`
}

// ============================================================================
// Commands
// ============================================================================

async function init() {
  console.log(`\n${ICONS.gear} ${COLORS.bold}Slidev Starter - Project Setup${COLORS.reset}\n`)

  const existingConfig = loadConfig()
  const defaults = existingConfig || {
    author: { name: '', email: '', github: 'https://github.com/' },
    defaults: { gradientFrom: 'blue-600', gradientTo: 'cyan-600', qaSubtitle: 'Thanks for listening!' },
  }

  console.log(`${ICONS.user} ${COLORS.cyan}Author Information${COLORS.reset}\n`)

  const name = await prompt('  Name', defaults.author.name)
  const email = await prompt('  Email', defaults.author.email)
  const github = await prompt('  GitHub URL', defaults.author.github)

  console.log(`\n${ICONS.slides} ${COLORS.cyan}Theme Defaults${COLORS.reset}\n`)

  const gradientFrom = await prompt('  Gradient From', defaults.defaults.gradientFrom)
  const gradientTo = await prompt('  Gradient To', defaults.defaults.gradientTo)
  const qaSubtitle = await prompt('  Q&A Subtitle', defaults.defaults.qaSubtitle)

  const config = {
    author: { name, email, github },
    defaults: { gradientFrom, gradientTo, qaSubtitle },
  }

  // Save config
  saveConfig(config)
  log.success(`\n${ICONS.check} Configuration saved to slidev.config.json`)

  // Update components
  console.log(`\n${ICONS.package} Updating components...`)

  writeFileSync(join(COMPONENTS_DIR, 'CoverSlide.vue'), generateCoverSlide(config))
  log.success(`  ${ICONS.check} CoverSlide.vue`)

  writeFileSync(join(COMPONENTS_DIR, 'QASlide.vue'), generateQASlide(config))
  log.success(`  ${ICONS.check} QASlide.vue`)

  writeFileSync(join(COMPONENTS_DIR, 'GithubLink.vue'), generateGithubLink(config))
  log.success(`  ${ICONS.check} GithubLink.vue`)

  console.log(`\n${ICONS.party} Project initialized successfully!\n`)
  console.log(`${COLORS.dim}Run 'bun run dev' to start developing.${COLORS.reset}\n`)
}

async function dev(slideName) {
  const slides = getSlides()

  if (slides.length === 0) {
    log.error(`${ICONS.error} No presentations found in slides/ directory`)
    process.exit(1)
  }

  let selected
  if (slideName) {
    selected = slides.find((s) => s.name === slideName)
    if (!selected) {
      log.error(`${ICONS.error} Presentation "${slideName}" not found`)
      log.dim(`Available: ${slides.map((s) => s.name).join(', ')}`)
      process.exit(1)
    }
    selected = [selected]
  } else {
    selected = await selectSlide(slides, { message: 'Select presentation to develop' })
  }

  const slide = selected[0]
  console.log(`\n${ICONS.rocket} Starting ${COLORS.cyan}${slide.name}${COLORS.reset}...\n`)

  await runCommand('npx', ['slidev', slide.path, '--open'])
}

async function build(slideName) {
  const slides = getSlides()

  if (slides.length === 0) {
    log.error(`${ICONS.error} No presentations found in slides/ directory`)
    process.exit(1)
  }

  let toBuild
  if (slideName) {
    if (slideName === 'all') {
      toBuild = slides
    } else {
      const found = slides.find((s) => s.name === slideName)
      if (!found) {
        log.error(`${ICONS.error} Presentation "${slideName}" not found`)
        process.exit(1)
      }
      toBuild = [found]
    }
  } else {
    toBuild = await selectSlide(slides, { allowAll: true, message: 'Select presentation to build' })
  }

  for (const slide of toBuild) {
    console.log(`\n${ICONS.package} Building ${COLORS.cyan}${slide.name}${COLORS.reset}...`)

    const outDir = join(ROOT_DIR, 'dist', slide.name)
    // Use root base path for single presentation deployment
    const basePath = toBuild.length === 1 ? '/' : `/${slide.name}/`

    try {
      await runCommand('npx', [
        'slidev',
        'build',
        slide.path,
        '--base',
        basePath,
        '--out',
        outDir,
      ])
      log.success(`${ICONS.check} ${slide.name} -> dist/${slide.name}/`)
    } catch (err) {
      log.error(`${ICONS.error} Failed to build ${slide.name}`)
      throw err
    }
  }

  console.log(`\n${ICONS.party} Build completed!\n`)
}

async function exportPDF(slideName) {
  const slides = getSlides()

  if (slides.length === 0) {
    log.error(`${ICONS.error} No presentations found`)
    process.exit(1)
  }

  let selected
  if (slideName) {
    selected = slides.find((s) => s.name === slideName)
    if (!selected) {
      log.error(`${ICONS.error} Presentation "${slideName}" not found`)
      process.exit(1)
    }
    selected = [selected]
  } else {
    selected = await selectSlide(slides, { message: 'Select presentation to export' })
  }

  const slide = selected[0]
  console.log(`\n${ICONS.package} Exporting ${COLORS.cyan}${slide.name}${COLORS.reset} to PDF...`)

  await runCommand('npx', ['slidev', 'export', slide.path, '--output', `${slide.name}.pdf`])
  log.success(`${ICONS.check} Exported to ${slide.name}.pdf`)
}

function showHelp() {
  console.log(`
${COLORS.bold}Slidev Starter CLI${COLORS.reset}

${COLORS.cyan}Usage:${COLORS.reset}
  node scripts/cli.mjs <command> [options]

${COLORS.cyan}Commands:${COLORS.reset}
  init            Initialize project with author info
  dev [name]      Start development server
  build [name]    Build for production (use "all" for all slides)
  export [name]   Export to PDF
  list            List all presentations
  help            Show this help message

${COLORS.cyan}Examples:${COLORS.reset}
  ${COLORS.dim}# Initialize project${COLORS.reset}
  node scripts/cli.mjs init

  ${COLORS.dim}# Interactive mode${COLORS.reset}
  node scripts/cli.mjs dev
  node scripts/cli.mjs build

  ${COLORS.dim}# Direct mode${COLORS.reset}
  node scripts/cli.mjs dev demo
  node scripts/cli.mjs build all
  node scripts/cli.mjs export demo
`)
}

function listSlides() {
  const slides = getSlides()

  if (slides.length === 0) {
    log.warn(`${ICONS.info} No presentations found in slides/ directory`)
    return
  }

  console.log(`\n${ICONS.slides} ${COLORS.bold}Available Presentations:${COLORS.reset}\n`)
  slides.forEach((s) => {
    const title = s.title !== s.name ? ` ${COLORS.dim}(${s.title})${COLORS.reset}` : ''
    console.log(`  • ${s.name}${title}`)
  })
  console.log()
}

// ============================================================================
// Main
// ============================================================================

const [, , command, ...args] = process.argv

switch (command) {
  case 'init':
  case 'i':
    init()
    break
  case 'dev':
  case 'd':
    dev(args[0])
    break
  case 'build':
  case 'b':
    build(args[0])
    break
  case 'export':
  case 'e':
    exportPDF(args[0])
    break
  case 'list':
  case 'ls':
  case 'l':
    listSlides()
    break
  case 'help':
  case '-h':
  case '--help':
    showHelp()
    break
  default:
    if (command) {
      log.error(`Unknown command: ${command}`)
    }
    showHelp()
    break
}
