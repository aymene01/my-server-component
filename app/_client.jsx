import { createRoot } from 'react-dom/client'
import { createFromFetch } from 'react-server-dom-webpack/client'

// @ts-expect-error Property '__webpack_require__' does not exist on type 'Window & typeof globalThis'.
window.__webpack_require__ = async id => {
  return import(id)
}

const root = createRoot(document.getElementById('root'))

createFromFetch(fetch('/rsc')).then(comp => {
  root.render(comp)
})
