import { Pita } from './Illustrations.jsx'

// Pita kecil sebagai pemisah antar kata.
const Sep = () => <Pita className="mx-6 size-9 shrink-0 opacity-90" />

export function TextBand({ items, reverse = false, dur = 46 }) {
  const row = items.map((t, i) => (
    <span key={i} className="flex items-center whitespace-nowrap font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
      style={i % 2 ? { color: 'transparent', WebkitTextStroke: '1.5px var(--brand-ink)' } : undefined}>
      {t}<Sep />
    </span>
  ))
  return (
    <div className="marquee" aria-hidden style={{ '--dur': `${dur}s` }}>
      <div className={`marquee-track ${reverse ? 'rev' : ''}`}>{row}{row}</div>
    </div>
  )
}

export function ChipBand({ items, reverse = false, dur = 52 }) {
  const row = items.map((t) => (
    <span key={t.slug} className="mr-3 flex items-center gap-3 rounded-full bg-surface/80 py-2 pl-2 pr-5 text-sm font-semibold shadow-soft">
      <img src={t.img} alt="" width="40" height="40" loading="lazy" className="size-10 rounded-full" />{t.nama}
    </span>
  ))
  return (
    <div className="marquee" aria-hidden style={{ '--dur': `${dur}s` }}>
      <div className={`marquee-track ${reverse ? 'rev' : ''}`}>{row}{row}</div>
    </div>
  )
}
