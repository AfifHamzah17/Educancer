import { useState } from 'react'
import { MessageCircle, Users, Clock, Info, Send, ArrowUpRight, Phone } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Spot from '../components/Spot.jsx'
import Field from '../components/Field.jsx'
import { Staff } from '../components/Illustrations.jsx'
import { KONSULTASI, waLink } from '../data/links.js'
import { RS } from '../data/contact.js'

const ICON = { umum: MessageCircle, khusus: Users }

export default function Konsultasi() {
  const [f, setF] = useState({ nama: '', status: 'umum', pesan: '' })
  const [err, setErr] = useState({})
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); if (err[k]) setErr({ ...err, [k]: undefined }) }

  const submit = (e) => {
    e.preventDefault()
    const n = {}
    if (f.nama.trim().length < 2) n.nama = 'Tulis nama Anda, minimal 2 huruf.'
    if (f.pesan.trim().length < 10) n.pesan = 'Tulis pertanyaan Anda, minimal 10 karakter.'
    setErr(n)
    if (Object.keys(n).length) return
    const teks = `Halo tim Educancer, saya ${f.nama.trim()} (${f.status === 'pasien' ? 'pasien RSUD Provinsi NTB' : 'masyarakat umum'}).\n\n${f.pesan.trim()}`
    window.open(waLink(teks), '_blank', 'noopener,noreferrer')
  }

  return (
    <main>
      <PageHeader title="Link konsultasi" crumbs={[{ to: '/menu', label: 'Beranda' }, { label: 'Konsultasi' }]} art="dokter"
        lead="Tim medis menjawab lewat WhatsApp. Pilih jalur yang sesuai dengan kondisi Anda." />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
        <div className="space-y-5">
          {KONSULTASI.map((k) => {
            const Icon = ICON[k.id]
            return (
              <Spot key={k.id} as="a" href={k.url} target="_blank" rel="noopener noreferrer"
                className="group flex min-h-48 flex-col rounded-[2.5rem] bg-surface p-6 shadow-soft transition-transform duration-300 [transition-timing-function:cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 active:scale-[.98] sm:p-8">
                <span className="grid size-14 place-items-center rounded-2xl bg-pale text-brand-ink"><Icon size={26} aria-hidden /></span>
                <h2 className="mt-5 text-3xl font-semibold">{k.judul}</h2>
                <p className="mt-2 max-w-[52ch] text-lg leading-relaxed text-muted">{k.ket}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-lg font-bold text-brand-ink">{k.aksi}<ArrowUpRight size={20} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
              </Spot>
            )
          })}
        </div>

        <aside className="space-y-5">
          <div className="rounded-[2.5rem] bg-surface p-6 shadow-soft sm:p-8">
            <div className="flex items-center gap-3"><span className="live-dot size-3 rounded-full bg-brand" aria-hidden /><h2 className="text-2xl font-semibold">Jam konsultasi</h2></div>
            <p className="mt-4 flex items-start gap-3 text-lg"><Clock size={22} className="mt-0.5 shrink-0 text-brand-ink" aria-hidden /><span><b>{RS.jamKonsultasi}</b><br /><span className="tnum">{RS.jamKonsultasiJam}</span></span></p>
            <p className="mt-3 flex items-start gap-3 text-lg"><Phone size={22} className="mt-0.5 shrink-0 text-brand-ink" aria-hidden /><a href={RS.teleponHref} className="tnum underline decoration-brand/40 underline-offset-4">{RS.telepon}</a></p>
          </div>
          <div className="flex gap-4 rounded-[2.5rem] bg-pale/80 p-6 sm:p-8">
            <Info size={24} className="mt-1 shrink-0 text-brand-ink" aria-hidden />
            <div><h2 className="text-xl font-semibold">Catatan penting</h2><p className="mt-1 leading-relaxed text-ink/80">Konsultasi ini bersifat informasi. Untuk diagnosis dan tindakan, datang langsung ke RSUD Provinsi NTB. Jika kondisi darurat, segera ke IGD.</p></div>
          </div>
        </aside>
      </div>

      {/* Formulir: menyusun pesan WhatsApp */}
      <section className="mt-12 grid gap-8 rounded-[2.5rem] bg-surface p-6 shadow-soft sm:p-10 lg:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14" aria-labelledby="h-form">
        <div className="flex flex-col">
          <h2 id="h-form" className="text-3xl font-semibold sm:text-4xl">Kirim pertanyaan Anda</h2>
          <p className="mt-3 max-w-[40ch] text-lg leading-relaxed text-muted">Isi formulir, lalu kami buka WhatsApp dengan pesan yang sudah tersusun. Anda tetap bisa mengeditnya sebelum mengirim.</p>
          <Staff role="dokter" className="mt-auto hidden h-56 self-start lg:block" />
        </div>
        <form onSubmit={submit} noValidate className="space-y-5">
          <Field label="Nama" name="nama" autoComplete="name" value={f.nama} onChange={set('nama')} error={err.nama} placeholder="Nama Anda" />
          <Field as="select" label="Anda adalah" name="status" value={f.status} onChange={set('status')} hint={f.status === 'pasien' ? 'Pasien onkologi bisa juga bergabung ke grup WhatsApp di atas untuk jawaban lebih cepat.' : undefined}>
            <option value="umum">Masyarakat umum</option>
            <option value="pasien">Pasien RSUD Provinsi NTB</option>
          </Field>
          <Field as="textarea" label="Pertanyaan" name="pesan" value={f.pesan} onChange={set('pesan')} error={err.pesan} placeholder="Tulis pertanyaan Anda di sini" hint="Jangan tulis nomor KTP atau data pribadi lain." />
          <button type="submit" className="btn btn-primary btn-lg w-full sm:w-auto"><Send size={19} aria-hidden />Lanjut ke WhatsApp</button>
        </form>
      </section>
    </main>
  )
}
