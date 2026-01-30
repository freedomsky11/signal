# Project Rules: Signal (Newsletter Booklet)

## Project Identity
- **Type**: Standalone Content Project (VitePress).
- **Goal**: Maintain a curated, high-value history of "Signal" newsletters.
- **Structure**: Modeled after `projects/happiness` (Digital Booklet).

## Directory Structure
- `docs/`: The content root.
  - `docs/posts/`: All newsletter markdown files go here.
    - `YYYY/MM/DD.md`: (e.g. `2026/01/08.md`)
  - `docs/public/images/`: All static assets.
  - `docs/.vitepress/`: Configuration.
- `package.json`: Build scripts.

## Content Governance
1.  **Format**: Markdown with Frontmatter.
2.  **Naming**: `YYYY-MM-DD.md` (Simplest form).
3.  **Images**: Colocated in `./assets/` inside the post directory (e.g. `docs/posts/2026/01/assets/`). This ensures portability.

## Agent Behavior
- When archiving, ALWAYS target `projects/signal/docs/posts/YYYY/MM/`.
- Use the date as the filename.
