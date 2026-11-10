import PageHeader from '../components/PageHeader.jsx'
import LokasiSection from '../components/LokasiSection.jsx'
import { usePageSEO } from '../lib/seo.js'

export default function Lokasi() {
  usePageSEO('/lokasi')
  return (
    <main>
      <PageHeader title="Lokasi dan kontak" crumbs={[{ to: '/menu', label: 'Beranda' }, { label: 'Lokasi' }]} art="lokasi"
        lead="Datang langsung ke RSUD Provinsi NTB di Mataram atau hubungi kami lewat telepon dan WhatsApp." />
      <LokasiSection />
    </main>
  )
}
