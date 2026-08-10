# Quốc Khánh Việt Nam 2/9 Landing Page

Existing GitHub Pages project for:

- Repository: https://github.com/quanlehoang/test
- Deployment: https://quanlehoang.github.io/test/

The site is a Vite + React landing page celebrating Vietnam National Day. The current work preserves the existing visual identity while improving SEO, accessibility, content, sharing, responsive behavior, and GitHub Pages readiness.

## Run Locally

```bash
npm install
npm run dev
```

With `base: '/test/'`, the Vite dev URL is usually:

```txt
http://localhost:5173/test/
```

## Build

```bash
npm run build
npm run preview
```

## Google Sheets Wish Form

The wish form sends submissions to a Google Apps Script Web App and writes to:

```txt
https://docs.google.com/spreadsheets/d/18OSkCpf0uJRaRMLJRiYEPwvP2RLzD1InOhmixlhjBQw/edit
```

The Apps Script source is in:

```txt
scripts/google-apps-script.js
```

Required `.env` value:

```bash
VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Recommended Google Sheet header row:

```txt
Created At | Name | Email | Message | Page | User Agent
```

## GitHub Pages

The Vite base path is configured for `/test/` in `vite.config.js`. The generated `dist/` folder includes `404.html`, `robots.txt`, `sitemap.xml`, manifest, favicons, and public images.
