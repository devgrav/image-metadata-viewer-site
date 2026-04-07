# image-metadata-viewer-site

Static welcome / onboarding page for the **Image Metadata Viewer** Chrome extension (main app repo: `image-metadata-viewer`).

## Version

The deployed page exposes the build version in `data-welcome-version` on the footer node (not shown in the UI). The source of truth is `"version"` in [`package.json`](package.json). Bump it when you align with an extension release.

Run **`npm run build`** before deploy; the script replaces the `__SITE_VERSION__` placeholder in the root [`index.html`](index.html) and writes output to **`dist/`**.

## Commands

```bash
npm ci
npm run build
```

Preview the built site locally by opening `dist/index.html` or serving the `dist/` folder.

## Vercel

[`vercel.json`](vercel.json): install `npm ci`, build `npm run build`, output **`dist`**. Root directory = repository root.

`ignoreCommand` skips a deployment when the latest commit touches none of: `index.html`, `styles.css`, `assets/`, `package.json`, `scripts/`, `vercel.json`, `package-lock.json`.

## Assets

Add onboarding screenshots as `assets/Browser_Welcome_1.png` and `assets/Browser_Welcome_2.png` if they are not present (referenced from `index.html`). Optional: `favicon.png` in the repo root is copied into `dist/` when present.
