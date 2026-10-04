import { Download } from 'lucide-react'
import { PonselChat } from './Illustrations.jsx'
import Spot from './Spot.jsx'
import { useShell } from '../lib/shell.js'

// Kartu unduhan APK versi Unity. Tombol membuka dialog konfirmasi di Shell.
export default function ApkCard({ className = '' }) {
  const { openApk } = useShell()
  return (
    <Spot className={`relative overflow-hidden rounded-[2.5rem] bg-surface p-6 shadow-soft sm:p-8 ${className}`}>
      <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Educancer untuk Android</h2>
          <p className="mt-2 max-w-[48ch] leading-relaxed text-muted">Versi aplikasi Unity (APK) dengan tampilan penuh layar. File tersedia di folder Google Drive tim Educancer.</p>
          <ol className="mt-4 space-y-1.5 text-sm text-muted">
            <li>1. Buka folder unduhan, pilih file APK terbaru.</li>
            <li>2. Izinkan pemasangan dari sumber ini saat Android bertanya.</li>
          </ol>
          <button onClick={openApk} className="btn btn-primary btn-lg mt-6"><Download size={20} aria-hidden />Unduh APK</button>
        </div>
        <PonselChat className="float mx-auto size-36 sm:size-44" />
      </div>
    </Spot>
  )
}
