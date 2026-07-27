export interface Category {
  slug: string
  label: string
  /** Categories with no content yet can be hidden without deleting them. */
  hidden?: boolean
}

export const categories: Category[] = [
  { slug: 'residenziale', label: 'Residenziale' },
  { slug: 'commerciale', label: 'Commerciale', hidden: true }, // vuoto al momento
  { slug: 'workspace', label: 'Workspace' },
  { slug: 'hospitality', label: 'Hospitality', hidden: true }, // nessun progetto reale al momento
  { slug: 'in-corso', label: 'In corso', hidden: true }, // TODO: mostrare quando i render saranno assegnati
]

export const visibleCategories = categories.filter((c) => !c.hidden)
