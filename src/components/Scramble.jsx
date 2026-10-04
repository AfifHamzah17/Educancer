import { useScramble } from '../lib/hooks.js'

// Teks diacak lalu tersusun. Salinan tak terlihat menjaga ukuran baris,
// salinan sr-only menjaga keterbacaan untuk pembaca layar.
export default function Scramble({ text, as: Tag = 'span', className = '', duration = 900, onHover = false }) {
  const [out, run] = useScramble(text, { duration })
  return (
    <Tag className={className} onPointerEnter={onHover ? run : undefined}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="relative inline-block">
        <span className="invisible">{text}</span>
        <span className="absolute inset-0">{out}</span>
      </span>
    </Tag>
  )
}
