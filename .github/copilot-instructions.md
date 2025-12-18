# GitHub Copilot Instructions for Slidev Starter

This project is a **Slidev** presentation starter template that supports multiple presentations in a single repository, managed by a custom CLI.

## 🏗 Project Architecture

- **Core Framework**: [Slidev](https://sli.dev/) (Vue 3 + Markdown).
- **Multi-Presentation Support**: Unlike standard Slidev projects, this repo hosts multiple slide decks in `slides/*.md`.
- **Unified CLI**: `scripts/cli.mjs` is the central controller. It wraps Slidev commands to handle the multi-file structure.
- **Shared Components**: `slides/components/` contains Vue components available to ALL presentations (auto-imported).
- **Configuration**:
  - `slidev.config.json`: Stores user preferences (author, defaults).
  - `vite.config.ts`: Configures Vite and component auto-importing.

## 🚀 Developer Workflow

**DO NOT** run `slidev` commands directly. Use the provided `bun` scripts which invoke the custom CLI.

### Common Commands
- **Start Dev Server**:
  - `bun run dev` -> Interactive menu to choose a presentation.
  - `bun run dev:demo` -> Starts the `demo.md` presentation directly.
- **Build for Production**:
  - `bun run build` -> Interactive menu.
  - `bun run build:all` -> Builds ALL presentations in `slides/`.
  - `bun run build:<name>` -> Builds a specific presentation (e.g., `bun run build:demo`).
- **Initialize**: `bun run init` -> Sets up author info in `slidev.config.json`.

## 📝 Slide Creation Patterns

### Markdown Structure (`slides/*.md`)
- **Frontmatter**: Must include `title` and `theme`.
  ```markdown
  ---
  theme: default
  title: My Presentation
  info: Description for the landing page
  ---
  ```
- **Layouts**: Use `---` separator with layout params.
  ```markdown
  ---
  layout: center
  ---
  # Centered Content
  ```

### Component Usage
- **Auto-Import**: Components in `slides/components/` are auto-imported. **DO NOT** manually import them in `<script setup>`.
- **Standard Components**:
  - `<CoverSlide />`: Use for the first slide.
    ```html
    <CoverSlide 
      title="My Title" 
      subtitle="My Subtitle" 
      version="1.0" 
      date="2025" 
    />
    ```
    *Note: `CoverSlide` applies a gradient color to the **second word** and onwards of the title.*
  - `<SectionTitle />`: Use for section breaks.
    ```html
    <SectionTitle number="01" title="Topic Name" subtitle="Brief description" />
    ```
  - `<EndSlide />`: Use for the final slide.
  - `<QASlide />`: Use for Q&A sections.

### Styling & Animations
- **Tailwind CSS**: Use Windi CSS/Tailwind classes directly in HTML/Markdown.
- **Animations**: Use `<v-clicks>` for step-by-step revealing of list items.
  ```html
  <v-clicks>
  - Point 1
  - Point 2
  </v-clicks>
  ```

## 🔧 Code Conventions

- **Vue Components**: Use `<script setup lang="ts">`.
- **Props**: Define props using `defineProps<{ ... }>()` with `withDefaults`.
- **CLI Script (`scripts/cli.mjs`)**:
  - Uses Node.js built-ins (`fs`, `path`, `child_process`).
  - Parses Markdown frontmatter manually to list available slides.
  - When adding new CLI features, ensure they handle the `slides/` directory context correctly.

## 🔄 Markdown to Slides Conversion

When converting a regular Markdown document (e.g., `docs/*.md`) to a Slidev presentation in `slides/`:

1. **Create new file** in `slides/` with `.md` extension (e.g., `slides/my-talk.md`).
2. **Add frontmatter** at the top:
   ```markdown
   ---
   theme: default
   title: <Extract from document title>
   info: <Brief description>
   ---
   ```
3. **First slide**: Use `<CoverSlide />` with title extracted from the document.
4. **Split content** by `---` separators. Each section becomes a slide. Guidelines:
   - One main idea per slide
   - Long lists → split across multiple slides or wrap with `<v-clicks>`
   - Code blocks → use Slidev's syntax highlighting (keep ` ```lang `)
   - Large diagrams/tables → consider `layout: center` or `layout: image`
5. **Add section breaks**: Use `<SectionTitle />` for major topic transitions.
6. **Final slide**: Use `<EndSlide />` or `<QASlide />`.

### Conversion Example
**Before** (regular Markdown):
```markdown
# My Architecture Guide
This document explains our system architecture.
## Overview
- Component A handles requests
- Component B processes data
```

**After** (`slides/architecture.md`):
```markdown
---
theme: default
title: My Architecture Guide
---
<CoverSlide title="My Architecture Guide" subtitle="System Overview" />

---

<SectionTitle number="01" title="Overview" />

---

# Architecture Components

<v-clicks>

- Component A handles requests
- Component B processes data

</v-clicks>

---

<EndSlide />
```

## ⚠️ Gotchas

- **Images**: Place static assets in `public/` and reference them with `/` (e.g., `/image.png`).
- **Routing**: The CLI handles port assignment and routing. Do not hardcode ports.
- **Package Manager**: Prefer `bun` for script execution, though `npm`/`yarn` work via the `node` scripts.
