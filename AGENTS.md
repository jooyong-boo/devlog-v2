# Repository Guidelines

## Project Structure & Module Organization

This repository uses Next.js App Router with Feature-Sliced Design (FSD).

- `app/`: route groups and API routes (`(public)`, `(admin)`, `api/`, auth pages).
- `src/`: domain code by layer: `widgets/`, `features/`, `entities/`, `shared/`.
- `prisma/`: schema and seed scripts.
- `specs/`: product/behavior notes.
- `.storybook/`: Storybook configuration.

Keep import direction consistent: `app -> widgets -> features -> entities -> shared`.
Co-locate tests in `__tests__/` folders near the unit they verify.

## Build, Test, and Development Commands

Use `pnpm`.

- `pnpm dev`: runs Next.js dev server (Turbo) and Vitest watch mode.
- `pnpm build`: production build.
- `pnpm start`: run built app.
- `pnpm lint`: run ESLint.
- `pnpm test`: run Vitest.
- `pnpm test:coverage`: generate text/json/html coverage reports.
- `pnpm storybook`: run Storybook on `:6006`.
- `pnpm prisma:migrate` / `pnpm prisma:generate`: database workflow.

## Coding Style & Naming Conventions

TypeScript is strict (`strict: true`) and uses alias imports (`@/*` -> `src/*`).
Formatting is Prettier-driven: 2 spaces, single quotes, semicolons, 80-char line width.
Run `pnpm format` or `pnpm format:check` before pushing.
ESLint enforces Next.js + TypeScript rules; unused variables are allowed only with `_` prefix.
Use PascalCase for React components (`PostCard.tsx`), camelCase for functions/variables, and descriptive slice names (e.g., `features/comment/create`).

## Testing Guidelines

Framework: Vitest + Testing Library (`jsdom` environment).
Test files should end with `.test.ts` or `.test.tsx` and live in `__tests__/` near source.
Use `src/shared/config/test-setup.ts` defaults for test globals/matchers.
No fixed coverage threshold is configured; new logic should include meaningful unit tests.

## Commit & Pull Request Guidelines

Recent history follows conventional prefixes: `feat:`, `fix:`, `chore:`, `edit:`.
Prefer concise, scoped messages, for example: `fix: validate empty TipTap content`.
Before PR: run `pnpm lint`, `pnpm tsc --noEmit`, and `pnpm test` (mirrors Husky hooks).
PRs should include: purpose, key changes, test results, and screenshots/GIFs for UI updates.
Link related issues/specs when applicable.

## Security & Configuration Tips

Never commit secrets. Keep credentials in `.env` (Supabase/DB/Auth values).
After dependency install, Prisma client is auto-generated (`postinstall`); regenerate manually if schema changes.
