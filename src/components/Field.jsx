import { useId } from 'react'

// Kolom formulir: label di atas, petunjuk opsional, pesan galat di bawah.
export default function Field({ label, hint, error, as = 'input', children, className = '', ...props }) {
  const id = useId()
  const describe = [hint && `${id}-h`, error && `${id}-e`].filter(Boolean).join(' ') || undefined
  const base = `w-full rounded-2xl border-2 bg-surface px-4 text-base text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand ${error ? 'border-red-500/70' : 'border-line'}`
  const El = as
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="font-semibold">{label}</label>
      <El id={id} aria-invalid={!!error} aria-describedby={describe}
        className={`${base} ${as === 'textarea' ? 'min-h-32 resize-y py-3' : 'min-h-14'}`} {...props}>{children}</El>
      {hint && !error && <p id={`${id}-h`} className="text-sm text-muted">{hint}</p>}
      {error && <p id={`${id}-e`} role="alert" className="text-sm font-medium text-red-700 dark:text-red-300">{error}</p>}
    </div>
  )
}
