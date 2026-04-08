/**
 * Injects package.json "version" into HTML data-welcome-version (__SITE_VERSION__).
 * Writes static output to dist/ (index + welcome route).
 */
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
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
const versionText = version.trim()

function writeHtml(templateRelPath, outRelPath) {
  const templatePath = join(root, templateRelPath)
  let html = readFileSync(templatePath, 'utf8')
  if (!html.includes(marker)) {
    console.error(`build-site: ${templatePath} must contain placeholder "${marker}".`)
    process.exit(1)
  }
  html = html.replaceAll(marker, versionText)
  const outFile = join(dist, outRelPath)
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, html, 'utf8')
}

mkdirSync(dist, { recursive: true })
writeHtml('index.html', 'index.html')
writeHtml(join('welcome', 'index.html'), join('welcome', 'index.html'))

cpSync(join(root, 'public'), dist, { recursive: true })

console.log(`build-site: wrote version ${version} into dist/*.html (data-welcome-version).`)
