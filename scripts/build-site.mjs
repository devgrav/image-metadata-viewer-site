/**
 * Injects package.json "version" into index.html data-welcome-version (__SITE_VERSION__).
 * Writes static output to dist/ (root index.html is the committed template).
 */
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'dist')
const pkgPath = join(root, 'package.json')
const templatePath = join(root, 'index.html')

const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
const version = pkg.version
if (typeof version !== 'string' || !version.trim()) {
  console.error('build-site: package.json has no valid "version" field.')
  process.exit(1)
}

const marker = '__SITE_VERSION__'
let html = readFileSync(templatePath, 'utf8')
if (!html.includes(marker)) {
  console.error(`build-site: ${templatePath} must contain placeholder "${marker}".`)
  process.exit(1)
}

mkdirSync(dist, { recursive: true })
html = html.replaceAll(marker, version.trim())
writeFileSync(join(dist, 'index.html'), html, 'utf8')

cpSync(join(root, 'styles.css'), join(dist, 'styles.css'))
cpSync(join(root, 'assets'), join(dist, 'assets'), { recursive: true })
const favicon = join(root, 'favicon.png')
if (existsSync(favicon)) {
  cpSync(favicon, join(dist, 'favicon.png'))
}

console.log(`build-site: wrote version ${version} into dist/index.html (data-welcome-version).`)
