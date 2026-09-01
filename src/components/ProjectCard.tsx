import { Link } from 'react-router-dom'
import type { Project } from '../lib/content'
import { asset } from '../lib/asset'

export function ProjectCard({
  project,
  image,
}: {
  project: Project
  /** Show a specific photo instead of the cover (used by the home collage). */
  image?: string
}) {
  return (
    <Link to={`/work/${project.category}/${project.slug}`} className="card">
      <div className="card__media">
        <img src={asset(image ?? project.cover)} alt={project.title} loading="lazy" />
      </div>
      <div className="card__meta">
        <h3 className="card__title">{project.title}</h3>
        <p className="card__sub">
          {project.location} · {project.year}
        </p>
      </div>
    </Link>
  )
}
