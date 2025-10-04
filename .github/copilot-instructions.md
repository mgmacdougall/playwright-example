<!--
Purpose: Guidance for automated coding agents working in this repository.
Keep this short and focused on discoverable, actionable facts about this project.
-->
# Copilot instructions for this repo

Summary
- This repository is a small Playwright + TypeScript test project using a Page Object Model.
- Key folders: `pages/` (page objects), `tests/` (Playwright tests), `utils/` (helpers).

Quick commands (Windows PowerShell)
- Install dependencies: `npm install`
- Run all Playwright tests: `npx playwright test`
- Run a single spec file: `npx playwright test tests/login.spec.ts`
- Run a single test by name: `npx playwright test -g "Login with invalid credentials shows error"`
- Debug with Playwright inspector (PowerShell):
  - `$env:PWDEBUG=1; npx playwright test -g "Login with invalid credentials shows error"`
- Type-check only: `npx tsc --noEmit`

Project layout & architecture (big picture)
- Page Object Model: page objects live under `pages/`. Example: `pages/LoginPage.ts` defines a `LoginPage` class and is instantiated from tests as `new LoginPage(page)`.
- Tests use the `@playwright/test` runner and its fixtures (`test`, `expect`, fixture `page`). Example test: `tests/login.spec.ts`.
- TypeScript config: `tsconfig.json` includes `tests`, `pages`, `utils`. The project uses `strict: true` so be careful with types and nullable returns.

Conventions & patterns (what to follow)
- Page objects accept the Playwright Page fixture in the constructor and expose actions and queries (navigate(), login(), getErrorMessage()). Follow the shape used in `pages/LoginPage.ts`.
- Tests are grouped in `tests/*.spec.ts` and use `test()` (Playwright) with the injected `{ page }` fixture. Example: `tests/login.spec.ts`.
- Return values from page queries sometimes use `page.textContent()` (which can return `string | null`). When editing or adding code, handle possible `null` values rather than assuming a string.

Integration points / external dependencies
- Tests navigate to an external URL in `pages/LoginPage.ts`: `https://example.com/login`. Treat this as an external system; do not hardcode alternative endpoints unless a change is intentional.
- Important dependencies are declared in `package.json`: `@playwright/test`, `playwright`, `typescript`, `ts-node`. The repo does not define a `test` npm script—use `npx playwright test` until a maintainer explicitly adds a script.

Known issues & gotchas discovered (actionable)
- `pages/LoginPage.ts` currently imports the wrong type and will cause TypeScript errors:
  - Current: `import { page } from '@playwright/test'; constructor(private page: page) { }`
  - Fix: use the Playwright `Page` type: `import { Page } from '@playwright/test'; constructor(private page: Page) { }`
  - When making this fix, run `npx tsc --noEmit` to ensure there are no other type issues.
- `page.textContent(...)` can return `null`. Tests (e.g. `tests/login.spec.ts`) call `expect(error).toContain('Invalid credentials')` which assumes a non-null string. When modifying `getErrorMessage()` or assertions, normalize the value: e.g., `return (await this.page.textContent('.error-message')) ?? ''`.

Editing & testing workflow for AI agents
- When changing TypeScript sources or tests:
  1. Run `npx tsc --noEmit` to catch type issues quickly.
 2. Run the affected tests with `npx playwright test <path or -g "name">`.
 3. Use the Playwright debug mode above when a failing test needs interactive inspection.
- If you add or change a top-level command, suggest adding/updating `package.json` scripts but do not modify `package.json` unless the user asks.

Files to read first (high signal)
- `package.json` — lists dependencies. (Note: there is currently no `test` script.)
- `tsconfig.json` — `strict: true` is enabled; watch for typing issues.
- `pages/LoginPage.ts` — canonical Page Object to mirror when adding pages.
- `tests/login.spec.ts` — canonical test showing how page objects are used.

If something is unclear
- Ask the maintainer whether to centralize environment/config values (URLs, credentials) or leave them hardcoded in page objects.
- Confirm whether adding npm scripts (e.g. "test": "playwright test") is acceptable before changing `package.json`.

End
- After making edits, always run the fast checks above (tsc + specific Playwright test) and include the exact commands you ran in your commit message or PR description.
