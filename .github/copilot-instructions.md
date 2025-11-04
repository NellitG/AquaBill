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

Examples (copyable patterns)
- Use API wrapper:
  - `import { get } from '@/providers/api/main.js'` then `const resp = await get('posts'); const data = resp.data;`
- Use fetch-wrapper for local-mode mock:
  - `import { fetchWrapper } from '@/helpers/fetch-wrapper.js'` then `fetchWrapper.post(
      `${baseUrl}/login`, { username, password }
    )`

Files you can edit safely to extend functionality
- `app/src/providers/api/*` — add new wrappers or endpoints.
- `app/src/helpers/*` — local test helpers (fake-backend) and fetch wrapper.
- `app/src/store/*` — new Pinia stores; register them by exporting in `app/src/store/index.js`.

Quick reference (paths)
- App root: `app/`
- Entry: `app/src/main.js` and `app/index.html`
- Routes: `app/src/router/index.js`
- Stores: `app/src/store/*.js` (auth.store.js, users.store.js)
- API: `app/src/providers/api/` (axios.js, main.js, getPosts.js)
- Helpers: `app/src/helpers/fetch-wrapper.js`, `app/src/helpers/fake-backend.js`

If anything here is ambiguous or you'd like more detail on a specific area (routing, auth flow, or data plumbing), tell me which file or flow and I'll expand the instructions with concrete code examples and tests.
