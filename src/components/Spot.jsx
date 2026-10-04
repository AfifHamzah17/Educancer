import { useSpot } from '../lib/hooks.js'

// Pembungkus kartu: tepi menyala mengikuti kursor (lihat .spot di index.css).
export default function Spot({ as: Tag = 'div', className = '', children, ...rest }) {
  const move = useSpot()
  return <Tag onPointerMove={move} className={`spot ${className}`} {...rest}>{children}</Tag>
}
