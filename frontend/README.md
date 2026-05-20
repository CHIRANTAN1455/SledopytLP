# Sledopyt AI — Frontend

A static React (CRA + craco) site. Zero backend dependency.

## Local development

```bash
cd frontend
yarn install
yarn start            # http://localhost:3000
```

## Production build

```bash
yarn build            # outputs to ./build
```

## Deploy to Vercel

This repo is pre-configured for Vercel.

### Option A — Vercel Dashboard (no CLI)

1. Push this repo to GitHub (or GitLab / Bitbucket).
2. Go to <https://vercel.com/new> and import the repo.
3. **Root Directory:** `frontend`
4. Framework Preset: **Create React App** (auto-detected via `vercel.json`).
5. Build Command: `yarn build` (auto)
6. Output Directory: `build` (auto)
7. Click **Deploy**.

### Option B — Vercel CLI

```bash
npm i -g vercel
cd frontend
vercel            # follow prompts
vercel --prod     # production deploy
```

### Custom domain

After your first deploy:

1. Open your project in Vercel → **Settings → Domains**.
2. Add `sledopytai.com` and `www.sledopytai.com`.
3. Vercel will show DNS records to add at your registrar (typically an `A` record `76.76.21.21` for the apex and a `CNAME` to `cname.vercel-dns.com` for `www`).
4. SSL is auto-provisioned.

## Environment variables

None required. The contact form posts directly to FormSubmit.co.

If you later add a backend, add `REACT_APP_BACKEND_URL` in **Vercel → Settings → Environment Variables**.

## Notes

- All images and videos are served from `/public/assets/`, so they are bundled with the site.
- SPA routing is handled by the rewrite rule in `vercel.json`.
