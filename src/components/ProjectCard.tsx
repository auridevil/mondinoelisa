import { Link } from 'react-router-dom'
import type { Project } from '../lib/content'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/lavori/${project.category}/${project.slug}`} className="card">
      <div className="card__media">
        <img src={project.cover} alt={project.title} loading="lazy" />
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
