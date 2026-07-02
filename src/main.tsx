import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'

import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/pages.css'

// vite-react-ssg prerenders every route to static HTML at build time,
// then hydrates it in the browser.
export const createRoot = ViteReactSSG({ routes })
