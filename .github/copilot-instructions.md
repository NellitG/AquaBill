## Copilot / AI agent instructions for this repo

Short summary
- This is a Vue 3 + Vite single-page app located in `app/`.
- Key runtime: Vite dev server (npm scripts live in `app/package.json`).

Quick start (what humans run)
- cd into the app folder: `cd app`
- Install: `npm install`
- Run dev server: `npm run dev`
- The project sometimes uses a JSON mock API: start with `json-server --watch data/db.json` (see `app/README.md`).

Where to look (architecture & boundaries)
- Frontend app root: `app/src/`
- Routing: `app/src/router/index.js` — routes use lazy import for several views (e.g. `TravelPlanView.vue`).
- State: Pinia stores under `app/src/store/`.
  - Exports: `app/src/store/index.js` (`useAuthStore`, `useUsersStore`).
- API providers: `app/src/providers/api/`.
  - `axios.js` creates a shared axios instance and handles 401 by dynamically importing `auth.store` to avoid circular deps.
  - `main.js` exposes small wrappers (get/post/patch/delete) used across the app.
  - `getPosts.js` shows the calling convention: async composable returning refs and calling `get('posts')`.
- Helpers: `app/src/helpers/`.
  - `fetch-wrapper.js` is an alternate fetch-based wrapper used by local-mode auth flows. It builds auth headers from `useAuthStore()` and checks `import.meta.env.VITE_API_URL`.
  - `fake-backend.js` hijacks `window.fetch` for local development when `VITE_MODE` is `local` (routes: `/login`, `/users`).

Important conventions and patterns (concrete)
- Environment-driven mode:
  - `import.meta.env.VITE_MODE` toggles behavior in `auth.store.js` — `local` uses `fetch-wrapper` + `fake-backend`, `remote` uses `providers/api/main.js`.
  - `VITE_API_URL` is used consistently (axios baseURL and fetch-wrapper checks).
- Auth/token storage:
  - The project uses `useLocalStorage` (from `@vueuse/core`) in stores and `axios.js` to persist tokens under keys: `user` and `x-token`.
  - `axios` adds Authorization header from `x-token`; `fetch-wrapper` uses `useAuthStore()` to attach JWT when the URL starts with `VITE_API_URL`.
- Data access patterns:
  - Prefer `app/src/providers/api/main.js` wrappers (get/post/patch/delete) for remote API calls.
  - Some components/composables demonstrate using those wrappers then reading `response.data` (see `getPosts.js`).
- Error & logout flow:
  - 401 handling is centralized in `app/src/providers/api/axios.js` (interceptor) and `fetch-wrapper.js` (response handler). On 401/403 the stores call `logout()` and redirect to `/login`.

Developer scripts & linting
- `app/package.json` scripts: `dev`, `build`, `preview`, `lint` (eslint + autofix), `format` (prettier on `src/`).
- Before committing code changes, prefer running `npm run lint` and `npm run format` in `app/`.

What AI agents should do first (practical checklist)
1. When adding or changing API calls, check `app/src/providers/api/axios.js` and `app/src/providers/api/main.js` to follow the existing wrapper pattern.
2. If your change touches auth, verify `VITE_MODE` logic in `app/src/store/auth.store.js` and do not break the `fake-backend` local flow.
3. For new routes, add them to `app/src/router/index.js` and prefer lazy-loaded view imports for non-critical routes.
4. Use `useLocalStorage` for persistent values (consistency with current stores) rather than ad-hoc localStorage usage.

```markdown
## Copilot / AI agent instructions for this repo

Short summary
- This repository is a Vue 3 + Vite Single Page App under `app/`.
- Key runtime: Vite dev server (npm scripts in `app/package.json`). Mock data lives at `data/db.json`.

Fast repro (what humans run)
- cd into the app folder: `cd app`
- Install deps: `npm install`
- Run dev server: `npm run dev`
- Optional mock API (local dev): `json-server --watch data/db.json` (or use `VITE_MODE=local` + `fake-backend.js`).

High-level architecture & why it is organized this way
- Frontend app root: `app/src/` — a small SPA with lazy-loaded views to keep bundle size low.
- Routing: `app/src/router/index.js` — routes use lazy import for several views (example: `TravelPlanView.vue`).
- State: Pinia under `app/src/store/` (auth and users are primary stores). Pinia is used for global auth/token state and UI state.
- API layer: `app/src/providers/api/` — centralized axios instance and tiny wrappers (`get`, `post`, `patch`, `delete`) so components avoid repeating HTTP logic.
- Local development: `app/src/helpers/fake-backend.js` intercepts `fetch` when `VITE_MODE=local` so auth and users endpoints can be mocked without a running backend.

Key project-specific conventions (do these exactly)
- Environment-driven mode: `import.meta.env.VITE_MODE` controls flows:
  - `local` -> `auth.store.js` uses `fetch-wrapper` + `fake-backend` (no remote API required).
  - `remote` -> uses `app/src/providers/api/main.js` (axios wrappers) and `VITE_API_URL`.
- Token storage: use `useLocalStorage` (from `@vueuse/core`) in stores; tokens/credentials live under keys `user` and `x-token`.
- API wrapper usage: always import wrappers from `@/providers/api/main.js` rather than calling axios directly. Example:
  - `import { get } from '@/providers/api/main.js'
  - `const resp = await get('posts'); const data = resp.data`
- Avoid circular deps: `app/src/providers/api/axios.js` dynamically imports `auth.store` inside the 401 interceptor — if you touch axios/auth code, maintain that pattern.

Critical files to check before editing related areas
- Auth: `app/src/store/auth.store.js` (VITE_MODE branching), `app/src/helpers/fake-backend.js` (mock endpoints `/login`, `/users`).
- API: `app/src/providers/api/axios.js` (interceptors + auth header from `x-token`), `app/src/providers/api/main.js` (wrappers).
- Stores: `app/src/store/index.js` (exports), `app/src/store/users.store.js`.
- Routing: `app/src/router/index.js` (lazy-loaded views pattern).

Developer workflows & useful commands
- Install & run app:
  - `cd app; npm install; npm run dev`
- Start JSON mock server (if you need full API):
  - `npm i -g json-server; json-server --watch data/db.json`
- Build/preview:
  - `npm run build` then `npm run preview`
- Lint/format:
  - `npm run lint` (eslint + autofix) and `npm run format` (prettier for `src/`).

Small contract for edits (inputs/outputs, success criteria)
- Inputs: change to store, API wrapper, components, or routes.
- Outputs: UI behavior and network calls should still work under both `VITE_MODE=local` and `remote`.
- Success: dev server runs, auth flows work in local mode, and no uncaught 401s break navigation.

Edge cases to watch for
- Circular imports between stores and providers — keep dynamic import pattern in `axios.js`.
- Missing/incorrect `VITE_API_URL` when switching to `remote` mode.
- Tests or components that assume immediate `response.data` shape — prefer checking `resp?.data`.

What AI agents should do first (practical checklist)
1. When adding/changing API calls: update `app/src/providers/api/main.js` + check `axios.js` interceptor behavior.
2. If touching auth: run app with both `VITE_MODE=local` and `VITE_MODE=remote` to verify fake-backend and real API flows.
3. For new routes: register them in `app/src/router/index.js` and use lazy-loaded view imports.
4. Persist values with `useLocalStorage` in stores (follow `auth.store.js` patterns).

Where to make safe edits
- `app/src/providers/api/*`, `app/src/helpers/*` (fake backend + fetch wrapper), and `app/src/store/*` (register new stores via `app/src/store/index.js`).

Quick reference (paths)
- App root: `app/`
- Entry: `app/src/main.js` and `app/index.html`
- Routes: `app/src/router/index.js`
- Stores: `app/src/store/*.js` (auth.store.js, users.store.js)
- API: `app/src/providers/api/` (axios.js, main.js, getPosts.js)
- Helpers: `app/src/helpers/fetch-wrapper.js`, `app/src/helpers/fake-backend.js`

If anything here is missing or unclear, tell me which file/flow you want expanded and I will add concrete examples, small unit tests, or a short checklist to validate changes.

```
