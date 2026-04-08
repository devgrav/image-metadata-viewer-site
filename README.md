# image-metadata-viewer-site

Static site for the **Image Metadata Viewer** Chrome extension (main app repo: `image-metadata-viewer`).

- **`/`** — landing page with a Chrome Web Store call-to-action.
- **`/welcome/`** — onboarding page (served as a real folder so it works on GitHub Pages without rewrites).

## Version and releases

The build injects the version into `data-welcome-version` on the footer (no visible text in the UI). The source of truth is `"version"` in [`package.json`](package.json).

## Workflow

- **Feature work**: branch from `master` using `feature/<name>`, open a PR back into `master`.
- **Hotfixes**: branch from `master` using `hotfix/<name>`, merge back into `master`, then release immediately.

## Releases

- **Version source of truth**: `"version"` in [`package.json`](package.json) (e.g. `1.2.3`)
- **Release tag**: `vX.Y.Z` must match `package.json` (e.g. `v1.2.3`)

Release steps (from `master`):

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

Pushing the tag triggers GitHub Actions to:
- create a **GitHub Release**
- build the site into `dist/`
- deploy to **GitHub Pages**

Run **`npm run build`** before deploy; the script replaces `__SITE_VERSION__` in [`index.html`](index.html) and [`welcome/index.html`](welcome/index.html) and writes output to **`dist/`**.

## Commands

```bash
npm ci
npm run build
npm run preview
```

`preview` serves **`dist/`** on **http://localhost:4100** (port is set in [`package.json`](package.json) `preview` script).

## GitHub Pages

The site is deployed from **`dist/`** via GitHub Actions.

## Static assets

Static files are kept in **`public/`** (for example `public/assets/` and `public/styles.css`) and copied as-is into **`dist/`** during `npm run build`.
