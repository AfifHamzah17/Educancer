import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-sm font-medium text-muted">
        {items.map((it, i) => {
          const last = i === items.length - 1
          return (
            <li key={it.label} className="flex items-center gap-1">
              {last ? <span aria-current="page" className="text-ink">{it.label}</span>
                : <Link to={it.to} className="rounded-md py-2 hover:text-brand-ink hover:underline">{it.label}</Link>}
              {!last && <ChevronRight size={14} aria-hidden className="opacity-60" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
