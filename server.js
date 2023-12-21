import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { build as esbuild } from 'esbuild'
import { fileURLToPath } from 'node:url'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'

const app = new Hono()

app.get('/', async c => {
  const Page = await import('./build/page.js')
  const html = renderToString(createElement(Page.default))
  return c.html(html)
})

serve(app, async info => {
  await build()
  console.log(`Server listening on http://localhost:${info.port}`)
})

async function build() {
  await esbuild({
    bundle: true,
    format: 'esm',
    logLevel: 'error',
    entryPoints: [resolveApp('page.jsx')],
    outdir: resolveBuild(),
    packages: 'external',
  })
}

const appDir = new URL('./app/', import.meta.url)
const buildDir = new URL('./build/', import.meta.url)

function resolveApp(path = '') {
  return fileURLToPath(new URL(path, appDir))
}

function resolveBuild(path = '') {
  return fileURLToPath(new URL(path, buildDir))
}
