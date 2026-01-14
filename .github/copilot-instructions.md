# Copilot Coding Agent Instructions for @medyll/cssfabric

## Project Overview
- **@medyll/cssfabric** is a CSS utility framework inspired by Tailwind, providing ready-to-use utility class names and theme support.
- The project is Svelte-based, but the CSS utilities are framework-agnostic and can be used in any frontend stack.
- Major directories:
  - `src/` — Svelte app, utilities, and components
  - `src/lib/legacy/scripts/` — Core logic for CSS module generation and utilities
  - `src/lib/cssf/` — Advanced CSS logic, mixins, and documentation
  - `src/components/` — Svelte UI components and documentation views
  - `src/routes/` — SvelteKit routes, including module documentation and demos
  - `lib/css/` — Built CSS files (minified, responsive, etc.)

## Architecture & Patterns
- **CSS Module System:**
  - Modules are defined in JS/TS and exposed via `cssfabric.getModuleList()` and related methods.
  - Navigation and documentation pages are dynamically generated from module metadata.
  - See `src/scripts/utils.ts` and `src/lib/legacy/scripts/cssfabric.js` for navigation and module logic.
- **Theme Support:**
  - Themes are set via the `data-theme` attribute on `<body>`. See main `README.md` for usage.
  - Custom themes can be imported as SCSS files.
- **Component Conventions:**
  - Svelte components use utility classes from `@medyll/cssfabric` directly in markup.
  - Navigation and documentation components (e.g., `InnerMenu.svelte`, `DocsClassNames.svelte`) use `fabricNavigation` helpers.

## Developer Workflows
- **Build:**
  - Standard Node.js build tools (Vite, Webpack, Gulp) are present. Use `npm run build` for main build.
  - CSS is built and output to `lib/css/` and `style/`.
- **Test:**
  - Tests are in `src/index.test.js` and `src/index.test.ts`. Run with `npm test`.
- **Debug:**
  - SvelteKit debugging via standard SvelteKit/Vite workflow.
  - For CSS module debugging, inspect `src/lib/legacy/scripts/cssfabric.js` and related utils.

## Project-Specific Conventions
- **Module Navigation:**
  - All module navigation is handled via `fabricNavigation` (see `src/scripts/utils.ts`).
  - Module pages are under `/cssfabric-modules/[module]/` with subpages for `demo`, `docs`, and `classnames`.
- **Class Name Generation:**
  - Class names are generated and documented via `cssfabric.getModuleClassNames` and related helpers.
- **SCSS/JSON Export:**
  - Use `sass-json-export` (see `src/vendor/sass-json-export/`) for exporting Sass data as JSON.

## Integration Points
- **External:**
  - Can be used as a dependency via npm/yarn.
  - Integrates with SvelteKit, but CSS can be imported in any frontend project.
- **Extension:**
  - VS Code extension in `src/lib/extensions/cssfabric-vscode/` (see its README for details).

## Key Files & References
- `README.md` — Main usage and setup
- `src/scripts/utils.ts` — Navigation and module logic
- `src/lib/legacy/scripts/cssfabric.js` — Core CSS module logic
- `src/components/` — UI and documentation components
- `src/routes/cssfabric-modules/` — Dynamic module documentation
- `lib/css/` — Built CSS outputs

---

**For AI agents:**
- Prefer using existing navigation and module helpers for new features.
- Follow the established Svelte + utility CSS pattern for new components.
- Reference module metadata and navigation helpers for dynamic page/content generation.
- When in doubt, check for similar patterns in `src/components/` and `src/routes/`.
