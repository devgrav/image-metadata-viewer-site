/**
 * Injects package.json "version" into HTML data-welcome-version (__SITE_VERSION__).
 * Writes static output to dist/ (templates at repo root).
 */
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'dist')
const pkgPath = join(root, 'package.json')

const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
const version = pkg.version
if (typeof version !== 'string' || !version.trim()) {
  console.error('build-site: package.json has no valid "version" field.')
  process.exit(1)
}

const marker = '__SITE_VERSION__'
const templates = ['index.html', 'welcome.html']

mkdirSync(dist, { recursive: true })

for (const name of templates) {
  const templatePath = join(root, name)
  let html = readFileSync(templatePath, 'utf8')
  if (!html.includes(marker)) {
    console.error(`build-site: ${templatePath} must contain placeholder "${marker}".`)
    process.exit(1)
  }
  html = html.replaceAll(marker, version.trim())
  writeFileSync(join(dist, basename(name)), html, 'utf8')
}

cpSync(join(root, 'styles.css'), join(dist, 'styles.css'))
cpSync(join(root, 'assets'), join(dist, 'assets'), { recursive: true })
const serveConfig = join(root, 'serve.json')
if (existsSync(serveConfig)) {
  cpSync(serveConfig, join(dist, 'serve.json'))
}
const favicon = join(root, 'favicon.png')
if (existsSync(favicon)) {
  cpSync(favicon, join(dist, 'favicon.png'))
}

console.log(`build-site: wrote version ${version} into dist/*.html (data-welcome-version).`)
