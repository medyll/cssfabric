
# Copilot Coding Agent Instructions for @medyll/cssfabric

## Project Overview
- **@medyll/cssfabric** is a Svelte-based CSS utility framework inspired by Tailwind, providing utility class names, theme support, and dynamic module documentation. CSS utilities are framework-agnostic and usable in any frontend stack.
- Key directories:
  - `src/` — Svelte app, utilities, components, and navigation logic
  - `src/lib/legacy/scripts/` — Core CSS module generation and legacy utilities
  - `src/lib/cssf/` — Advanced CSS logic, mixins, and documentation
  - `src/components/` — Svelte UI and documentation components
  - `src/routes/` — SvelteKit routes for module docs/demos
  - `lib/css/`, `style/`, `styles/` — Built CSS outputs

## Architecture & Patterns
- **CSS Module System:**
  - Modules are defined in JS/TS and exposed via `cssfabric.getModuleList()` and related helpers.
  - Navigation and documentation are dynamically generated from module metadata (see `src/scripts/utils.ts`, `src/lib/legacy/scripts/cssfabric.js`).
- **Theme Support:**
  - Themes are set via the `data-theme` attribute on `<body>`; custom themes can be imported as SCSS.
- **Component Usage:**
  - Svelte components use utility classes directly in markup.
  - Navigation and documentation components (e.g., `InnerMenu.svelte`, `DocsClassNames.svelte`) use `fabricNavigation` helpers for dynamic menus.

## Developer Workflows
- **Build:**
  - Use `npm run build` for main build. CSS is output to `lib/css/`, `style/`, and `styles/`.
  - Gulp, Vite, and Webpack configs are present for advanced builds.
- **Test:**
  - Run tests in `src/index.test.js` and `src/index.test.ts` with `npm test`.
- **Debug:**
  - SvelteKit debugging follows standard Vite/SvelteKit workflow.
  - For CSS module debugging, inspect `src/lib/legacy/scripts/cssfabric.js` and related utilities.

## Project-Specific Conventions
- **Module Navigation:**
  - All navigation is handled via `fabricNavigation` (see `src/scripts/utils.ts`).
  - Module pages are under `/cssfabric-modules/[module]/` with subpages for `demo`, `docs`, and `classnames`.
- **Class Name Generation:**
  - Use `cssfabric.getModuleClassNames` and helpers for class name generation and documentation.
- **SCSS/JSON Export:**
  - Use `sass-json-export` (see `src/vendor/sass-json-export/`) for exporting Sass data as JSON.

## Integration Points
- **External:**
  - Usable as an npm/yarn dependency; CSS can be imported in any frontend project.
- **Extension:**
  - VS Code extension in `src/lib/extensions/cssfabric-vscode/` (see its README for usage).

## Key Files & References
- `README.md` — Main usage and setup
- `src/scripts/utils.ts` — Navigation and module logic
- `src/lib/legacy/scripts/cssfabric.js` — Core CSS module logic
- `src/components/` — UI and documentation components
- `src/routes/cssfabric-modules/` — Dynamic module documentation
- `lib/css/`, `style/`, `styles/` — Built CSS outputs

---

**For AI agents:**
- Use existing navigation/module helpers for new features.
- Follow Svelte + utility CSS patterns for new components.
- Reference module metadata and navigation helpers for dynamic page/content generation.
- For new documentation or UI, check patterns in `src/components/` and `src/routes/`.
- When extending build/test/debug workflows, prefer existing scripts and configs.
