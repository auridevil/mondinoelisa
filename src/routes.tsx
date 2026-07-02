import type { RouteRecord } from 'vite-react-ssg'
import Layout from './components/Layout'
import Home from './pages/Home'
import Work from './pages/Work'
import CategoryPage from './pages/CategoryPage'
import ProjectPage from './pages/ProjectPage'
import Press from './pages/Press'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { visibleCategories } from './content/categories'
import { projects } from './lib/content'

/**
 * The route tree is built from the content: every category and every
 * project Markdown file becomes a concrete route, so vite-react-ssg
 * prerenders each one to its own static HTML file at build time.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'lavori', element: <Work /> },
      ...visibleCategories.map((c) => ({
        path: `lavori/${c.slug}`,
        element: <CategoryPage category={c} />,
      })),
      ...projects.map((p) => ({
        path: `lavori/${p.category}/${p.slug}`,
        element: <ProjectPage project={p} />,
      })),
      { path: 'stampa', element: <Press /> },
      { path: 'contatti', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
