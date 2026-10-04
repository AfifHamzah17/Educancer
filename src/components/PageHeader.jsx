import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Breadcrumbs from './Breadcrumbs.jsx'
import Scramble from './Scramble.jsx'
import { Art } from './Illustrations.jsx'

// Kepala halaman: breadcrumb, judul yang tersusun saat dibuka, ilustrasi di kanan pada layar lebar.
export default function PageHeader({ title, crumbs, lead, art, back = '/menu', children }) {
  return (
    <header className="grid items-end gap-6 pb-8 pt-4 lg:grid-cols-[1fr_auto] lg:pb-12 lg:pt-10">
      <div className="min-w-0">
        <div className="flex items-center gap-1">
          <Link to={back} aria-label="Kembali" className="-ml-2 grid size-11 place-items-center rounded-full text-brand-ink hover:bg-surface/60 lg:hidden"><ArrowLeft size={20} /></Link>
          <Breadcrumbs items={crumbs} />
        </div>
        <h1 className="mt-2 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"><Scramble text={title} duration={650} /></h1>
        {lead && <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-ink/80 lg:text-lg">{lead}</p>}
        {children}
      </div>
      {art && <Art name={art} className="float hidden size-48 shrink-0 lg:block xl:size-56" />}
    </header>
  )
}
