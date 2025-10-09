# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Shaun Bent (https://www.shaunbent.co.uk), hosted on GitHub Pages. It's built using Eleventy (11ty) as a static site generator with custom SCSS styling, showcasing posts, talks, and professional background.

## Development Commands

### Install dependencies
```bash
pnpm install
```

### Development (watch mode)
```bash
pnpm start
```
Runs Eleventy dev server with live reload AND Sass watch mode in parallel.

### Production build
```bash
pnpm build
```
Builds Eleventy templates and compiles/minifies Sass to CSS. Output goes to `_site/`.

## Architecture

### Eleventy Structure

The site uses Eleventy 3.x as the static site generator:

**Directory Structure:**
- `src/` - Source files for Eleventy templates
  - `_layouts/` - Page layouts (Nunjucks templates)
    - `base.njk` - Base HTML layout with `<head>` and wrapper
  - `_includes/` - Reusable template partials
  - `_data/` - Global data files (JavaScript or JSON)
  - `*.njk` - Page templates (e.g., `index.njk`)
- `_site/` - Build output directory (git-ignored)

**Configuration:**
- `eleventy.config.js` - Eleventy configuration (ES modules)
- Template engine: Nunjucks (`.njk`)
- Passthrough copy for static assets (images, CSS, CNAME, etc.)

**Build Process:**
1. Sass compiles `styles/main.scss` → `_site/css/style.css`
2. Eleventy processes templates from `src/` → `_site/`
3. Static assets are copied to `_site/`

### CSS Architecture (ITCSS-based)

The project follows the Inverted Triangle CSS (ITCSS) architecture, organizing styles by specificity:

1. **Global** (`styles/global/`) - Configuration, variables, breakpoints, colors
   - `_config.scss`: Global configuration (font size, line height, breakpoints)
   - `_color.scss`: Color system with CSS custom properties and theme support (light/dark)
   - `_spacing.scss`: Spacing scale
   - `_variables.scss`: Centralized imports

2. **Generic** (`styles/generic/`) - Reset, normalize, box-sizing

3. **Elements** (`styles/elements/`) - Base HTML element styles (typography, images, root)

4. **Objects** (`styles/objects/`) - Layout patterns (wrap, list-bare, list-inline)

5. **Components** (`styles/components/`) - UI components (page, masthead, social-links, archive)

6. **Utilities** (`styles/utilities/`) - Single-purpose helpers (clearfix, visibility)

### Key Technical Patterns

**Sass Module System**: The project uses the modern `@use` and `@forward` syntax instead of `@import`. When working with styles:
- Use `@use 'path/to/module'` to import functionality
- Access variables/mixins with namespace: `config.$base-font-size`
- The `tools/_mq.scss` forwards the `sass-mq` library with custom breakpoints

**Responsive Design**:
- Breakpoints defined in `global/_config.scss`: xs (320px), sm (740px), md (980px), lg (1300px)
- Uses `sass-mq` library for media queries
- Import with `@use '../tools/mq'` and use `@include mq.mq($from: sm) { ... }`

**Type Scale System**:
- Located in `tools/_type-scale.scss`
- Generates CSS custom properties for responsive typography
- Uses mathematical scale (default 1.25 - major third)
- Creates `--h1` through `--h6` variables dynamically

**Theme System**:
- Supports light/dark themes via `[data-theme]` attribute on body
- Color tokens use CSS custom properties: `--c-text`, `--c-bg`, `--c-text-highlight`, etc.
- Theme-specific values defined in `global/_color.scss`

**Vertical Rhythm**:
- Mixins in `tools/_mixins.scss` for consistent spacing
- `line-height()`, `margin-top()`, `margin-bottom()` maintain rhythm

## Deployment

The site automatically deploys to GitHub Pages on pushes to `main` via GitHub Actions (`.github/workflows/static.yml`):
1. Installs pnpm (v10) and dependencies
2. Runs production build (`pnpm build`)
3. Uploads `_site/` directory to GitHub Pages
4. Deploys to GitHub Pages

## Code Style

- Indentation: 2 spaces (enforced by `.editorconfig`)
- Line endings: LF
- Charset: UTF-8
- Trim trailing whitespace
- Insert final newline (except for `.md` files)

## Important Notes

- Main template is `src/index.njk` which outputs to `_site/index.html`
- The project uses ES modules (`"type": "module"` in package.json)
- Compiled CSS outputs to `_site/css/style.css`
- Uses Node.js 22.x in CI/CD
- Package manager: pnpm (v10)
- No test suite currently configured

## Adding New Pages

To add new pages:
1. Create a new `.njk` file in `src/` (e.g., `src/about.njk`)
2. Add front matter to specify layout: `layout: base.njk`
3. Build will automatically generate the page in `_site/`

For data-driven pages (like future blog or vinyl collection):
1. Create JavaScript data file in `src/_data/` that exports data
2. Reference data in templates using the filename (e.g., `{{ posts }}`)
3. Data files can be async and fetch from APIs at build time
