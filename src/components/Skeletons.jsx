export const Sk = ({ className = '' }) => <div className={`skeleton rounded-2xl ${className}`} aria-hidden />

export function PageSkeleton() {
  return (
    <div className="py-8" aria-busy="true" aria-label="Memuat halaman">
      <Sk className="h-4 w-40" />
      <Sk className="mt-4 h-14 w-3/4 max-w-xl" />
      <Sk className="mt-4 h-5 w-full max-w-lg" />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 10 }, (_, i) => <Sk key={i} className="aspect-[4/5] rounded-[2rem]" />)}
      </div>
    </div>
  )
}

export function FullSkeleton() {
  return <div className="grid min-h-dvh place-items-center" aria-busy="true"><Sk className="size-40 rounded-full" /></div>
}
