# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

건강해짐 (To Be Healthy) — a fitness center schedule management PWA for trainers and members (students). Built with Next.js 14 App Router.

## Commands

```bash
npm run dev          # Dev server on :3000
npm run build        # Production build
npm run lint         # ESLint (next lint)
npm run lint:style   # Stylelint on TSX files
npm run type-check   # TypeScript check (tsconfig.prod.json)
npm run test         # Jest tests
npm run mock         # MSW Express mock server on :9090
```

Pre-commit hooks (Husky + lint-staged) run ESLint, Prettier, Stylelint, and next lint automatically.

## Architecture — FSD (Feature-Sliced Design)

```
src/
├── app/              # Next.js App Router (routes, providers, global styles)
├── page/             # Page-level compositions (combine features & widgets)
├── widget/           # Layout & composition components (navigation, pickers)
├── feature/          # Feature business logic (api/, hooks/, model/, ui/)
├── entity/           # Domain entities (auth, gym, diet, image, alarm)
└── shared/           # Reusable: api/, hooks/, ui/, utils/, mixin/, assets/
```

**Import rule**: layers can only import from layers below them (shared → entity → feature → widget → page → app).

Each feature/entity folder follows a consistent structure:
- `api/` — React Query queries and mutations
- `model/` — Zustand stores and TypeScript types
- `ui/` — React components
- `hooks/` — Custom hooks
- `index.ts` — Barrel exports

## Key Patterns

**Two user roles**: `STUDENT` and `TRAINER` — stored in `memberType`. Routes are split under `(login-required)/student/` and `(login-required)/trainer/`. Many components render differently per role.

**State management**: Zustand with persist (localStorage key: `auth-storage`) and devtools middleware. Use `useAuthSelector` for optimized re-renders with shallow equality.

**Data fetching**: TanStack React Query v5 + Axios. Two Axios instances in `shared/api/baseApi.ts`:
- `api` — no auth header (public endpoints)
- `authApi` — attaches access token, handles 401 with token refresh

**API response wrapper**: All responses use `BaseResponse<T>` (`{ statusCode, message, data }`). Errors extend `BaseError` (AxiosError).

**UI components**: Shadcn/Radix UI in `shared/ui/`. Configured via `components.json` with aliases `@/shared` and `@/shared/utils/tw-utils`.

**Layout compound component**: `widget/layout.tsx` — use as `<Layout type='student'>` with `Layout.Header`, `Layout.Contents`, `Layout.BottomArea`.

**Typography**: Use constants from `shared/mixin/typography.ts` (e.g., `HEADING_1`, `TITLE_1`, `BODY_2`).

## Styling

- Tailwind CSS with custom spacing scale (1=4px, 2=6px, 3=8px, 6=16px, 7=20px, 8=24px)
- CSS variables for colors defined in `app/_styles/global.css` (e.g., `--primary-500`, `--gray-500`, `--point-color`)
- Pretendard font (Korean-optimized)
- Max layout width: 440px (mobile-first)
- `cn()` utility from `shared/utils/tw-utils.ts` for merging Tailwind classes
- Prettier plugin auto-sorts Tailwind classes

## Code Conventions

- Path alias: `@/*` → `./src/*`
- Import sorting enforced by `simple-import-sort` ESLint plugin
- `no-console: error` — no console.log in committed code
- `@typescript-eslint/no-explicit-any: warn`
- Prettier: single quotes, 90 print width, trailing commas (es5), JSX single quotes
- SVGs imported as React components via `@svgr/webpack`

## Environment Variables

Key env var: `NEXT_PUBLIC_AUTH_URL` — backend API base URL (proxied via Next.js rewrites in `next.config.mjs`).
