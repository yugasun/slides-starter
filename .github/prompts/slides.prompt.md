```prompt
---
description: "Convert specified Markdown into Slidev PPT (output to slides/)"
agent: slides
---

Convert the Markdown document I provide into **Slidev** presentation format and write the result to a new file in the `slides/` directory.

Inputs:
- Source Markdown file (usually in `docs/`, provided via #file: or pasted content)
- Optional: output filename (without extension), theme (default: `default`), cover subtitle/version/date

Requirements:
- Output to: `slides/<name>.md`
- Must include frontmatter at the top (at minimum `theme`, `title`, optionally `info`)
- Use `<CoverSlide />` for the first slide
- Split into multiple pages with `---`: each page covers one topic
- Use `<SectionTitle />` for major section breaks
- Use `<v-clicks>` for lists that should appear item-by-item
- Preserve code block language markers (```lang)
- **Convert all flowcharts/architecture diagrams/sequence diagrams to Mermaid**:
	- Prefer `flowchart TD` / `sequenceDiagram` / `stateDiagram-v2` / `classDiagram`
	- Make structure "visualization-friendly": short node names, clear hierarchy, avoid long edge labels
	- If the source contains ASCII diagrams, indented trees, numbered flows, or image descriptions, extract the semantic meaning and redraw as Mermaid
- End with `<EndSlide />` or `<QASlide />`

If no output filename is specified:
- Use the source filename in kebab-case as `slides/<name>.md`

Before starting, ask 1 clarification question if needed: should the output filename align with existing deck naming conventions.
```
