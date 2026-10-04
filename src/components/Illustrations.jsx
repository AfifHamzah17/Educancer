// Ilustrasi datar bergaya sama dengan ikon dokter referensi:
// lingkaran biru muda, kulit #F4C090, topi #95CCDD, garis #D9E8E3.
const SKY = '#95CCDD', SKY2 = '#6FB3CB', SKIN = '#F4C090', MINT = '#E3F5EF', EDGE = '#D9E8E3', GRAY = '#666666', INK = '#4D6872'

const Wrap = ({ vb, className, label, children }) => (
  <svg viewBox={vb} className={className} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
    {children}
  </svg>
)

const Body = () => (
  <>
    <path d="M1 387V272C1 236 31 208 70 208H212C251 208 281 236 281 272V387Z" fill="#fff" stroke={EDGE} strokeWidth="2" />
    <path d="M122 208H160L141 247Z" fill={MINT} />
  </>
)

export function Staff({ role = 'dokter', className = '', label }) {
  return (
    <Wrap vb="0 0 282 387" className={className} label={label}>
      <circle cx="141" cy="146" r="140" fill="var(--illus)" />
      {role === 'perawat' && <><circle cx="141" cy="16" r="24" fill="#4B3B33" /><circle cx="141" cy="90" r="78" fill="#4B3B33" /></>}
      {role === 'apoteker' && <path d="M69 80C66 22 104 6 141 6S216 22 213 80C192 46 168 40 141 40S90 46 69 80Z" fill="#6B5444" />}
      <Body />
      <circle cx="141" cy="88" r={role === 'perawat' ? 66 : 72} fill={role === 'perawat' ? '#E9B07C' : SKIN} />
      {role === 'dokter' && <><path d="M71 54V30C71 12 84 2 104 2H178C198 2 211 12 211 30V54C211 57 209 58 206 58H76C73 58 71 57 71 54Z" fill={SKY} /><rect x="105" y="97" width="72" height="44" rx="16" fill="#fff" /></>}
      {role === 'perawat' && <><path d="M80 58Q141 18 202 58V72Q141 36 80 72Z" fill="#fff" stroke={EDGE} strokeWidth="2" /><rect x="105" y="100" width="72" height="42" rx="16" fill="#fff" /></>}
      {role === 'apoteker' && <><circle cx="111" cy="92" r="19" fill="#fff" fillOpacity=".5" stroke={INK} strokeWidth="4" /><circle cx="171" cy="92" r="19" fill="#fff" fillOpacity=".5" stroke={INK} strokeWidth="4" /><path d="M130 92H152" stroke={INK} strokeWidth="4" /><path d="M118 128Q141 146 164 128" stroke="#B06F3F" strokeWidth="5" strokeLinecap="round" fill="none" /></>}
      {role === 'dokter' && <><path d="M96 226C62 272 60 330 100 336C126 340 134 322 132 306" stroke={GRAY} strokeWidth="6" strokeLinecap="round" fill="none" /><circle cx="131" cy="338" r="14" fill={SKY} /></>}
      {role === 'perawat' && <g transform="translate(168 246) rotate(-7)"><rect width="84" height="112" rx="10" fill={SKY} /><rect x="9" y="16" width="66" height="88" rx="5" fill="#fff" /><rect x="26" y="4" width="32" height="16" rx="6" fill={GRAY} /><path d="M20 40H64M20 56H64M20 72H46" stroke={SKY} strokeWidth="5" strokeLinecap="round" /></g>}
      {role === 'apoteker' && <><rect x="190" y="268" width="58" height="46" rx="7" fill="#fff" stroke={EDGE} strokeWidth="2" /><g transform="rotate(-24 220 262)"><rect x="205" y="246" width="30" height="14" rx="7" fill={SKY} /><path d="M220 246H228A7 7 0 0 1 228 260H220Z" fill="#fff" stroke={SKY} /></g></>}
    </Wrap>
  )
}

export function Pita({ className = '', label }) {
  return (
    <Wrap vb="0 0 200 200" className={className} label={label}>
      <circle cx="100" cy="100" r="96" fill="var(--illus)" />
      <path d="M100 52C72 22 36 56 72 100L116 168" stroke={SKY} strokeWidth="24" strokeLinecap="round" fill="none" />
      <path d="M100 52C128 22 164 56 128 100L84 168" stroke={SKY2} strokeWidth="24" strokeLinecap="round" fill="none" />
    </Wrap>
  )
}

export function Buku({ className = '', label }) {
  return (
    <Wrap vb="0 0 200 200" className={className} label={label}>
      <circle cx="100" cy="100" r="96" fill="var(--illus)" />
      <path d="M26 62Q72 48 100 70V158Q72 138 26 150Z" fill="#fff" stroke={EDGE} strokeWidth="3" strokeLinejoin="round" />
      <path d="M174 62Q128 48 100 70V158Q128 138 174 150Z" fill={MINT} stroke={EDGE} strokeWidth="3" strokeLinejoin="round" />
      <path d="M42 84Q68 78 84 90M42 102Q68 96 84 108M42 120Q60 116 72 124" stroke={SKY} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M116 90Q132 78 158 84M116 108Q132 96 158 102" stroke={SKY2} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M128 52V80L138 72L148 80V56Z" fill={SKIN} />
    </Wrap>
  )
}

export function LayarVideo({ className = '', label }) {
  return (
    <Wrap vb="0 0 200 200" className={className} label={label}>
      <circle cx="100" cy="100" r="96" fill="var(--illus)" />
      <rect x="32" y="56" width="136" height="90" rx="14" fill="#fff" stroke={EDGE} strokeWidth="3" />
      <rect x="42" y="66" width="116" height="62" rx="8" fill={SKY} />
      <path d="M90 82L118 97L90 112Z" fill="#fff" />
      <rect x="42" y="134" width="70" height="5" rx="2.5" fill={EDGE} /><rect x="42" y="134" width="30" height="5" rx="2.5" fill={SKY2} />
      <path d="M78 146H122L130 162H70Z" fill={MINT} stroke={EDGE} strokeWidth="2" />
    </Wrap>
  )
}

export function PonselChat({ className = '', label }) {
  return (
    <Wrap vb="0 0 200 200" className={className} label={label}>
      <circle cx="100" cy="100" r="96" fill="var(--illus)" />
      <rect x="62" y="24" width="76" height="152" rx="16" fill="#fff" stroke={EDGE} strokeWidth="3" />
      <rect x="70" y="42" width="60" height="116" rx="8" fill={MINT} />
      <rect x="90" y="30" width="20" height="4" rx="2" fill={EDGE} />
      <rect x="76" y="54" width="38" height="22" rx="8" fill={SKY} /><path d="M82 76L80 84L90 76Z" fill={SKY} />
      <rect x="86" y="86" width="38" height="20" rx="8" fill="#fff" /><path d="M118 106L122 113L112 106Z" fill="#fff" />
      <rect x="76" y="116" width="30" height="18" rx="8" fill={SKY2} />
      <circle cx="100" cy="148" r="5" fill={SKIN} />
    </Wrap>
  )
}

export function PinLokasi({ className = '', label }) {
  return (
    <Wrap vb="0 0 200 200" className={className} label={label}>
      <circle cx="100" cy="100" r="96" fill="var(--illus)" />
      <ellipse cx="100" cy="164" rx="42" ry="9" fill={EDGE} />
      <rect x="40" y="108" width="40" height="52" rx="4" fill="#fff" stroke={EDGE} strokeWidth="2" /><rect x="120" y="96" width="42" height="64" rx="4" fill={MINT} stroke={EDGE} strokeWidth="2" />
      <path d="M100 26C72 26 54 48 54 72C54 104 100 156 100 156S146 104 146 72C146 48 128 26 100 26Z" fill={SKY} stroke="#fff" strokeWidth="4" />
      <circle cx="100" cy="72" r="19" fill="#fff" /><path d="M100 62V82M90 72H110" stroke={SKY2} strokeWidth="6" strokeLinecap="round" />
    </Wrap>
  )
}

export function PapanKuis({ className = '', label }) {
  return (
    <Wrap vb="0 0 200 200" className={className} label={label}>
      <circle cx="100" cy="100" r="96" fill="var(--illus)" />
      <rect x="54" y="34" width="92" height="130" rx="12" fill="#fff" stroke={EDGE} strokeWidth="3" />
      <rect x="80" y="24" width="40" height="20" rx="7" fill={GRAY} />
      {[62, 92, 122].map((y, i) => (
        <g key={y}>
          <circle cx="78" cy={y} r="9" fill={i < 2 ? SKY : '#fff'} stroke={SKY} strokeWidth="2.5" />
          {i < 2 && <path d={`M73 ${y}L77 ${y + 4}L84 ${y - 5}`} stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />}
          <rect x="94" y={y - 4} width={i === 1 ? 34 : 40} height="8" rx="4" fill={EDGE} />
        </g>
      ))}
      <path d="M140 126L146 138L159 140L150 149L152 162L140 156L128 162L130 149L121 140L134 138Z" fill={SKIN} />
    </Wrap>
  )
}

const MAP = { dokter: Staff, perawat: Staff, apoteker: Staff, pita: Pita, buku: Buku, video: LayarVideo, ponsel: PonselChat, lokasi: PinLokasi, kuis: PapanKuis }
export function Art({ name, className = '', label }) {
  const C = MAP[name] || Pita
  return name in { dokter: 1, perawat: 1, apoteker: 1 } ? <C role={name} className={className} label={label} /> : <C className={className} label={label} />
}
