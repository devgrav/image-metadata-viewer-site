# image-metadata-viewer-site

Static site for the **Image Metadata Viewer** Chrome extension (main app repo: `image-metadata-viewer`).

- **`/`** — landing page with a Chrome Web Store call-to-action.
- **`/welcome/`** — onboarding page (served as a real folder so it works on GitHub Pages without rewrites).

## Version and releases

The build injects the version into `data-welcome-version` on the footer (no visible text in the UI). The source of truth is `"version"` in [`package.json`](package.json).

**Before merging into `master`** from a branch that changes the site, bump **`version`** in [`package.json`](package.json), then add a **git tag** for that release (for example `v1.2.3` matching the semver in `package.json`). That keeps deploys and extension releases aligned and traceable.

Run **`npm run build`** before deploy; the script replaces `__SITE_VERSION__` in [`index.html`](index.html) and [`welcome.html`](welcome.html) and writes output to **`dist/`** (including `serve.json` for local preview).
Run **`npm run build`** before deploy; the script replaces `__SITE_VERSION__` in [`index.html`](index.html) and [`welcome.html`](welcome.html) and writes output to **`dist/`**.

## Commands

```bash
npm ci
npm run build
npm run preview
```

`preview` serves **`dist/`** on **http://localhost:4100** (port is set in [`package.json`](package.json) `preview` script).

## GitHub Pages

The site is deployed from **`dist/`** via GitHub Actions.
