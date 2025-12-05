# Slidev Starter

[中文](./README.zh.md)

A Slidev starter template with pre-built components, unified CLI, and multi-presentation support.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yugasun/slides-starter)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yugasun/slides-starter)

## ✨ Features

- 🎨 **Pre-built Components** - Cover, Section, Q&A, End slides ready to use
- 📁 **Multi-PPT Support** - Manage multiple presentations in one project
- 🛠️ **Unified CLI** - Single command interface for dev, build, and export
- ⚙️ **Project Init** - Configure author info and update components automatically
- 🎯 **Best Practices** - Clean architecture for scalable presentations

## Prerequisites

- [Node.js](https://nodejs.org/) >= 22.x
- [Bun](https://bun.sh/) >= 1.x (or npm/yarn/pnpm)

## Quick Start

```bash
# Install dependencies
bun install

# Initialize project with your info
bun run init

# Start demo presentation
bun run dev:demo

# Or use interactive mode
bun run dev
```

## Project Initialization

Run `bun run init` to configure your project:

```bash
$ bun run init

⚙️ Slidev Starter - Project Setup

👤 Author Information

  Name: John Doe
  Email: john@example.com
  GitHub URL: https://github.com/johndoe

📊 Theme Defaults

  Gradient From: blue-600
  Gradient To: cyan-600
  Q&A Subtitle: Thanks for listening!

✅ Configuration saved to slidev.config.json

📦 Updating components...
  ✅ CoverSlide.vue
  ✅ QASlide.vue
  ✅ GithubLink.vue

🎉 Project initialized successfully!
```

This will:
- Save your configuration to `slidev.config.json`
- Update component defaults (GitHub URL, email, theme colors)

## Project Structure

```
├── slides/                  # Presentations directory
│   ├── demo.md              # Demo presentation
│   └── components/          # Reusable Vue components
│       ├── CoverSlide.vue   # Cover page
│       ├── SectionTitle.vue # Section divider
│       ├── QASlide.vue      # Q&A page
│       ├── EndSlide.vue     # Ending page
│       └── GithubLink.vue   # GitHub link icon
├── scripts/
│   └── cli.mjs              # Unified CLI tool
├── slidev.config.json       # Project configuration
├── public/                  # Static assets
└── snippets/                # Code snippets for slides
```

## CLI Usage

```bash
# Initialize project
bun run init

# Development
bun run dev              # Interactive selection
bun run dev:demo         # Start demo directly

# Build
bun run build            # Interactive selection
bun run build:all        # Build all presentations

# Export & Preview
bun run export           # Export to PDF
bun run preview          # Preview built files

# List presentations
bun run list
```

### CLI Commands

| Command         | Alias | Description                         |
| --------------- | ----- | ----------------------------------- |
| `init`          | `i`   | Initialize project with author info |
| `dev [name]`    | `d`   | Start development server            |
| `build [name]`  | `b`   | Build for production                |
| `export [name]` | `e`   | Export to PDF                       |
| `list`          | `ls`  | List all presentations              |

## Creating a Presentation

1. Create `slides/my-talk.md`:

```markdown
---
theme: default
title: My Talk
---

<CoverSlide 
  title="My Talk"
  subtitle="A great presentation"
/>

---

# Slide 2

Content here...

---

<EndSlide title="Thanks!" />
```

2. Run `bun run dev` and select your presentation

## Built-in Components

### CoverSlide

```markdown
<CoverSlide 
  title="Project Name"
  subtitle="Description"
  version="1.0"
  githubUrl="https://github.com/user/repo"
/>
```

### SectionTitle

```markdown
<SectionTitle number="01" title="Introduction" color="blue" />
```

### QASlide

```markdown
<QASlide title="Questions?" email="hi@example.com" />
```

### EndSlide

```markdown
<EndSlide title="Thank You" features="Fast · Modern · Beautiful" />
```

## Configuration

`slidev.config.json`:

```json
{
  "author": {
    "name": "Your Name",
    "email": "your@email.com",
    "github": "https://github.com/username"
  },
  "defaults": {
    "gradientFrom": "blue-600",
    "gradientTo": "cyan-600",
    "qaSubtitle": "Thanks for listening!"
  }
}
```

## NPM Scripts

| Script      | Description                      |
| ----------- | -------------------------------- |
| `init`      | Initialize project configuration |
| `dev`       | Interactive dev mode             |
| `dev:demo`  | Start demo directly              |
| `build`     | Interactive build                |
| `build:all` | Build all presentations          |
| `export`    | Export to PDF                    |
| `preview`   | Preview built files              |
| `list`      | List presentations               |

## Resources

- [Slidev Documentation](https://sli.dev/)
- [Slidev GitHub](https://github.com/slidevjs/slidev)
- [UnoCSS](https://unocss.dev/)
- [Iconify](https://iconify.design/)

## License

[Apache 2.0](./LICENSE)
