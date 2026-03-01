# CLAUDE.md

This file provides guidance to AI assistants working with this codebase.

## Project Overview

This is an **Angular 21 Nx monorepo** implementing a **Micro Frontend (MFE) architecture** using `@angular-architects/native-federation`. The workspace name is `@nxseed2/source`.

The project uses a host/remote pattern where a portal application (host) loads remote micro frontend applications at runtime via Native Federation.

## Tech Stack

- **Framework**: Angular 21.1
- **Monorepo Tool**: Nx 22.5
- **Module Federation**: @angular-architects/native-federation
- **Build System**: @angular/build (esbuild-based)
- **Unit Testing**: Vitest 4 with @analogjs/vitest-angular
- **Linting**: ESLint 9 (flat config) with @nx/eslint-plugin and angular-eslint
- **Formatting**: Prettier 3.6 (single quotes enabled)
- **Styling**: SCSS (inline style language)
- **Language**: TypeScript 5.9

## Repository Structure

```
angular-nx-mfe/
├── apps/
│   ├── portal/          # Host application (port 4200)
│   └── mfe-fiscal/      # Remote MFE application (port 4201)
├── libs/
│   └── shared/
│       ├── ui/          # Shared UI components (@nxseed2/ui)
│       ├── auth/        # Shared auth components (@nxseed2/auth)
│       └── contracts/   # Shared contracts/interfaces (@nxseed2/contracts)
├── nx.json              # Nx workspace configuration
├── package.json         # Dependencies and npm scripts
├── tsconfig.base.json   # Root TypeScript configuration
├── eslint.config.mjs    # Root ESLint flat config
├── vitest.workspace.ts  # Vitest workspace configuration
└── .prettierrc          # Prettier configuration
```

## Applications

### portal (Host)
- **Port**: 4200
- **Role**: Host/shell application that loads remote MFEs
- **Federation config**: `apps/portal/federation.config.js` - consumes remotes
- **Manifest**: `apps/portal/src/assets/federation.manifest.json` - maps remote names to URLs
- **Entry point**: `apps/portal/src/main.ts` -> `bootstrap.ts`

### mfe-fiscal (Remote)
- **Port**: 4201
- **Role**: Remote micro frontend for fiscal functionality
- **Federation config**: `apps/mfe-fiscal/federation.config.js` - exposes `./routes`
- **Exposes**: `./routes` -> `apps/mfe-fiscal/src/app/app.routes.ts`
- **Entry point**: `apps/mfe-fiscal/src/main.ts` -> `bootstrap.ts`

## Shared Libraries

All shared libraries live under `libs/shared/` and use the `lib` selector prefix.

| Library | Import Path | Purpose |
|---------|------------|---------|
| ui | `@nxseed2/ui` | Shared UI components |
| auth | `@nxseed2/auth` | Authentication components |
| contracts | `@nxseed2/contracts` | Shared interfaces/contracts |

Path aliases are defined in `tsconfig.base.json`.

## Common Commands

```bash
# Start individual apps
npm run start:portal        # Serve portal on port 4200
npm run start:mfe-fiscal    # Serve mfe-fiscal on port 4201
npm run start:all           # Serve all apps in parallel

# Build
npx nx build portal
npx nx build mfe-fiscal
npx nx run-many --target=build --all

# Test
npx nx test portal          # Unit tests for portal
npx nx test mfe-fiscal      # Unit tests for mfe-fiscal
npx nx test ui              # Unit tests for shared/ui lib
npx nx test auth            # Unit tests for shared/auth lib
npx nx test contracts       # Unit tests for shared/contracts lib
npx nx run-many --target=test --all

# Lint
npx nx lint portal
npx nx lint mfe-fiscal
npx nx run-many --target=lint --all

# Visualize project graph
npx nx graph
```

## Code Conventions

### Angular Components
- **Standalone components**: All components use standalone architecture (imports array in `@Component` decorator, no NgModules)
- **Selector prefixes**: Apps use `app-` prefix; libraries use `lib-` prefix
- **Component class naming**: Use plain class names without `Component` suffix (e.g., `App`, `Ui`, `Auth`, not `AppComponent`)
- **Template/style files**: Use separate `.html` and `.scss` files (referenced via `templateUrl` and `styleUrl`)
- **File naming**: Component files are named without the `.component` suffix (e.g., `app.ts`, `ui.ts`, not `app.component.ts`)

### TypeScript
- **Strict mode** is enabled per-app (`strict: true` in each app's tsconfig.json)
- **Angular strict templates** are enabled (`strictTemplates: true`)
- **Module resolution**: `bundler` (per-app), `node` (base)
- **Target**: ES2022 (per-app), ES2015 (base)

### File Organization
- Each app has: `project.json`, `federation.config.js`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.spec.json`, `eslint.config.mjs`
- Each library has: `project.json`, `vite.config.mts`, `tsconfig.json`, `tsconfig.lib.json`, `tsconfig.spec.json`, `eslint.config.mjs`
- Libraries export through a barrel file: `src/index.ts`
- Public assets go in `public/` directory within each app

### ESLint
- Uses flat config format (`eslint.config.mjs`)
- Root config extends `@nx/eslint-plugin` base, TypeScript, and JavaScript configs
- App configs extend root and add `@nx/angular` and `@nx/angular-template` configs
- `@nx/enforce-module-boundaries` rule is enabled at root level
- Component selectors: `kebab-case` for elements, `camelCase` for directives

### Formatting
- Prettier with single quotes enabled
- 2-space indentation (from `.editorconfig`)
- UTF-8 charset
- Final newline inserted

## Testing

- **Framework**: Vitest with `@analogjs/vitest-angular` adapter
- **Environment**: jsdom
- **Test files**: `*.spec.ts` or `*.test.ts` pattern
- **Setup**: Each library has a `src/test-setup.ts` that initializes `@angular/compiler` and `@analogjs/vitest-angular`
- **Apps**: Use `@angular/build:unit-test` executor
- **Libraries**: Use `@nx/vitest:test` executor with `vite.config.mts`
- **Coverage**: v8 provider, output to `coverage/` directory

## Module Federation Architecture

This project uses **Native Federation** (not Webpack Module Federation):
- Dependencies are shared as singletons with strict versioning (`shareAll` with `singleton: true, strictVersion: true`)
- Unused RxJS subpackages are skipped: `rxjs/ajax`, `rxjs/fetch`, `rxjs/testing`, `rxjs/webSocket`
- The portal discovers remotes via `federation.manifest.json`
- Remote apps expose routes that can be lazily loaded by the host

## Build & Output

- Build output goes to `dist/apps/<app-name>/`
- Production builds include output hashing and bundle budgets:
  - Initial bundle: warning at 500KB, error at 1MB
  - Component styles: warning at 4KB, error at 8KB

## Adding New Features

### New Remote MFE
1. Generate a new Angular app: `npx nx g @nx/angular:application <name>`
2. Add a `federation.config.js` with `exposes` for routes
3. Register the remote in `apps/portal/src/assets/federation.manifest.json`
4. Add a serve script to `package.json` and update `start:all`

### New Shared Library
1. Generate: `npx nx g @nx/angular:library --directory=libs/shared/<name>`
2. Add the path alias to `tsconfig.base.json` under `paths`
3. Export public API from `src/index.ts`

## Important Notes

- Always run `npm install` after pulling changes to ensure dependencies are up to date
- When modifying federation configs, restart both host and remote dev servers
- The `node_modules` directory is not committed; run `npm install` to restore dependencies
- No e2e test runner is configured (set to `none` in nx.json generators)
- The project does not use NgModules; all components are standalone
