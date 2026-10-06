import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight, Smartphone, WifiOff, HeartHandshake, BookOpen, PlayCircle, ListChecks, MessageCircle, Star, Hospital, Stethoscope, BookOpenCheck, HandCoins, LayoutGrid } from 'lucide-react'
import Scramble from '../components/Scramble.jsx'
import Spot from '../components/Spot.jsx'
import Carousel from '../components/Carousel.jsx'
import TopicCard from '../components/TopicCard.jsx'
import ReviewCard from '../components/ReviewCard.jsx'
import ApkCard from '../components/ApkCard.jsx'
import LokasiSection from '../components/LokasiSection.jsx'
import { TextBand, ChipBand } from '../components/Marquee.jsx'
import { Staff, LayarVideo, PapanKuis, Buku } from '../components/Illustrations.jsx'
import { TOPICS } from '../data/topics.js'
import { VIDEOS } from '../data/videos.js'
import { QUIZ } from '../data/quiz.js'
import { FAQ } from '../data/faq.js'
import { REVIEWS, SAMPLE } from '../data/reviews.js'
import { useShell } from '../lib/shell.js'

const SOAL = Object.values(QUIZ).reduce((a, q) => a + q.length, 0)
const STATS = [[TOPICS.length, 'jenis kanker tertinggi di NTB'], ["600+", 'pengguna aplikasi/website'], ["200+", 'konsultasi online'], ["93,2%", 'tingkat kepuasan pengguna']]
const LANGKAH = [
  ['Buka materi', 'Pilih jenis kanker, baca modulnya.', '/materi'],
  ['Tonton video', 'Penjelasan ringkas dari tenaga kesehatan.', '/video'],
  ['Kerjakan kuis', 'Lima soal untuk tiap jenis kanker.', '/quiz'],
  ['Tanya tim', 'Konsultasi lewat WhatsApp pada jam layanan.', '/konsultasi'],
  ['Beri ulasan', 'Ceritakan pengalaman Anda memakai Educancer.', '/kata-mereka'],
]
const KEUNGGULAN = [
  [HandCoins, 'Akses gratis untuk semua'],
  [Hospital, 'Dikembangkan oleh RSUD Provinsi NTB'],
  [Stethoscope, 'Materi disusun tenaga kesehatan lintas profesi'],
  [BookOpenCheck, 'Informasi berbasis sumber ilmiah'],
  [Smartphone, 'Mudah diakses melalui smartphone'],
  [WifiOff, 'Tersedia fitur akses offline (melalui aplikasi)'],
  [LayoutGrid, 'Membahas kanker dari berbagai aspek'],
]
const NAMA_TOPIK = TOPICS.map((t) => t.nama.replace(/^Kanker /, ''))

const H2 = ({ children, id }) => <h2 id={id} className="font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{children}</h2>

export default function Menu() {
  const { install } = useShell()
  const card = 'relative flex flex-col overflow-hidden rounded-[2.5rem] bg-surface p-6 shadow-soft transition-transform duration-300 [transition-timing-function:cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 active:scale-[.98] sm:p-8'
  return (
    <main>
      {/* Hero: teks kiri, komposisi berlapis kanan */}
      <section className="grid items-center gap-10 py-8 lg:min-h-[78dvh] lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:py-12" aria-labelledby="judul-hero">
        <div>
          <h1 id="judul-hero" className="text-5xl font-semibold leading-[1.02] sm:text-6xl xl:text-7xl">
            <Scramble text="Jelajahi informasi kanker yang lengkap dan terpercaya." duration={1100} />
          </h1>
          <p className="rise mt-6 max-w-[52ch] text-lg leading-relaxed text-ink/80" style={{ '--i': 5 }}>
            Disusun secara kolaboratif oleh tenaga kesehatan lintas profesi di RSUD Provinsi NTB. Dokter, perawat, ahli gizi, apoteker, dan fisioterapis.
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ '--i': 7 }}>
            <Link to="/materi" className="btn btn-primary btn-lg"><BookOpen size={20} aria-hidden />Tentang Educancer</Link>
            <a href="#h-langkah" className="btn btn-soft btn-lg">Mulai Dari Sini</a>
          </div>
          <div className="rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ '--i': 9 }}>
            <div className="flex items-center gap-2">
              <img src="/images/logo-rsud.png" alt="" width="360" height="360" className="size-11" />
              <img src="/images/logo-pkrs.png" alt="" width="360" height="360" className="-ml-1 size-11" />
              <span className="ml-1 text-sm font-semibold leading-tight">Disusun oleh<br />RSUD Provinsi NTB</span>
            </div>
            {install.canInstall && (
              <button onClick={() => (install.hasPrompt ? install.prompt() : window.dispatchEvent(new Event('educancer:install-help')))} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-ink underline decoration-brand/40 underline-offset-4">
                <Smartphone size={17} aria-hidden />Pasang di layar utama
              </button>
            )}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl pb-10 lg:max-w-none">
          <div className="px-b">
            <img src="/images/bg-rsud.webp" alt="Gedung RSUD Provinsi NTB dilihat dari udara" width="1280" height="720" fetchPriority="high"
              className="aspect-[4/5] w-full rounded-[2.5rem] rounded-tl-[7rem] object-cover object-[52%_50%] shadow-soft sm:aspect-[5/5]" />
          </div>
          <div className="px-a absolute -bottom-2 -left-3 w-32 sm:w-44 lg:-left-10 lg:w-52"><Staff role="dokter" label="Ilustrasi dokter RSUD Provinsi NTB" className="float drop-shadow-[0_18px_22px_rgba(18,66,84,.25)]" /></div>
          <div className="px-c absolute right-2 top-10 sm:-right-4 lg:-right-6">
            {/* <div className="float glass flex items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-4" style={{ animationDelay: '-2s' }}>
              <span className="grid size-10 place-items-center rounded-xl bg-pale text-brand-ink"><HeartHandshake size={20} aria-hidden /></span>
              <span className="text-sm font-semibold leading-tight">Gratis untuk<br />semua warga</span>
            </div> */}
          </div>
          <div className="px-a absolute bottom-16 right-2 sm:-right-4 lg:-right-8">
            {/* <div className="float glass flex items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-4" style={{ animationDelay: '-4s' }}>
              <span className="grid size-10 place-items-center rounded-xl bg-pale text-brand-ink"><WifiOff size={20} aria-hidden /></span>
              <span className="text-sm font-semibold leading-tight">Materi terbaca<br />tanpa internet</span>
            </div> */}
          </div>
        </div>
      </section>

      {/* Angka dari isi aplikasi sendiri */}
      <section aria-label="Isi aplikasi" className="glass -mt-2 rounded-[2rem] px-4 py-5 sm:px-8">
        <dl className="grid grid-cols-2 gap-y-5 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {STATS.map(([n, l]) => (
            <div key={l} className="flex flex-col px-3 text-center lg:text-left">
              <dt className="order-2 text-sm font-medium text-muted">{l}</dt>
              <dd className="font-display text-4xl font-semibold tnum lg:text-5xl">{n}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Marquee */}
      <section aria-label="Jenis kanker yang dibahas" className="mt-16 space-y-4 lg:mt-24">
        <TextBand items={NAMA_TOPIK} />
        <ChipBand items={TOPICS} reverse />
      </section>
      {/* Apa itu Educancer */}
      <section className="mt-20 lg:mt-28" aria-labelledby="h-tentang">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16">
          <div>
            <H2 id="h-tentang">Apa itu EDUCANCER?</H2>
            <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink/75">
              EDUCANCER adalah platform edukasi kanker terintegrasi dari RSUD Provinsi NTB
              yang membantu Anda memahami kanker, mengenali tanda dan risikonya, serta
              menemukan informasi yang tepat untuk langkah selanjutnya.
            </p>
          </div>
          <div className="glass rounded-[2rem] p-6 sm:p-8">
            <h3 className="text-xl font-semibold">Mengapa Memilih Educancer?</h3>
            <ul className="mt-5 space-y-3.5">
              {KEUNGGULAN.map(([Icon, teks]) => (
                <li key={teks} className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-pale text-brand-ink">
                    <Icon size={18} aria-hidden />
                  </span>
                  <span className="text-sm font-medium sm:text-base">{teks}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* Carousel materi */}
      <section className="mt-20 lg:mt-28" aria-labelledby="h-topik">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div><H2 id="h-topik">Materi per jenis kanker</H2><p className="mt-3 max-w-[56ch] text-lg text-ink/75">Setiap modul bisa dibaca ulang tanpa internet setelah dibuka satu kali.</p></div>
          <Link to="/materi" className="btn btn-soft">Lihat semua materi<ArrowRight size={18} aria-hidden /></Link>
        </div>
        <Carousel label="Materi per jenis kanker" itemClass="w-[68%] sm:w-[38%] lg:w-[23.5%]">
          {TOPICS.map((t) => <TopicCard key={t.slug} t={t} to={`/materi/${t.slug}`} />)}
        </Carousel>
      </section>

      {/* Bento: cara belajar lain */}
      <section className="mt-20 lg:mt-28" aria-labelledby="h-lain">
        <H2 id="h-lain">Belajar dengan cara lain</H2>
        <div className="mt-8 grid gap-4 lg:grid-cols-12 lg:gap-5">
          <Spot as={Link} to="/video" className={`${card} min-h-64 lg:col-span-7`}>
            <PlayCircle size={30} className="text-brand-ink" aria-hidden />
            <h3 className="mt-4 text-3xl font-semibold">Video edukasi</h3>
            <p className="mt-2 max-w-[34ch] text-muted">{VIDEOS.length} video singkat tentang gejala, pengobatan, dan perawatan.</p>
            <span className="mt-6 inline-flex items-center gap-1 font-bold text-brand-ink">Tonton sekarang<ArrowUpRight size={18} aria-hidden /></span>
            <LayarVideo className="absolute -bottom-6 -right-4 size-52 sm:size-64" />
          </Spot>
          <Spot as={Link} to="/quiz" className={`${card} min-h-72 lg:col-span-5 lg:row-span-2`}>
            <ListChecks size={30} className="text-brand-ink" aria-hidden />
            <h3 className="mt-4 text-3xl font-semibold">Kuis per topik</h3>
            <p className="mt-2 max-w-[30ch] text-muted">{SOAL} soal. Skor tersimpan di perangkat Anda dan bisa diulang kapan saja.</p>
            <span className="mt-6 inline-flex items-center gap-1 font-bold text-brand-ink">Mulai kuis<ArrowUpRight size={18} aria-hidden /></span>
            <PapanKuis className="mx-auto mt-auto size-52 pt-6 lg:size-72" />
          </Spot>
          <Spot as={Link} to="/faq" className={`${card} min-h-60 lg:col-span-4`}>
            <Buku className="absolute -right-6 -top-6 size-36 opacity-90" />
            <h3 className="mt-auto text-3xl font-semibold">Tanya jawab</h3>
            <p className="mt-2 text-muted">{FAQ.length} pertanyaan yang paling sering diajukan pasien.</p>
            <span className="mt-4 inline-flex items-center gap-1 font-bold text-brand-ink">Baca jawabannya<ArrowUpRight size={18} aria-hidden /></span>
          </Spot>
          <Spot as={Link} to="/konsultasi" className={`${card} min-h-60 lg:col-span-3`}>
            <MessageCircle size={30} className="text-brand-ink" aria-hidden />
            <h3 className="mt-auto text-3xl font-semibold">Konsultasi</h3>
            <p className="mt-2 text-muted">Lewat WhatsApp, Senin sampai Jumat.</p>
          </Spot>
        </div>
      </section>

      {/* Lima langkah, urutan sungguhan */}
      <section className="mt-20 lg:mt-28" aria-labelledby="h-langkah">
        <H2 id="h-langkah">Lima langkah memakai Educancer</H2>
        <ol className="relative mt-10 grid gap-6 lg:grid-cols-5 lg:gap-5">
          <span aria-hidden className="absolute left-[1.65rem] top-4 h-[calc(100%-2rem)] w-px bg-brand/25 lg:left-8 lg:right-8 lg:top-[1.65rem] lg:h-px lg:w-auto" />
          {LANGKAH.map(([t, d, to], i) => (
            <li key={t} className="relative flex gap-4 lg:block">
              <span className="relative z-0 grid size-14 shrink-0 place-items-center rounded-2xl bg-brand font-display text-xl font-semibold text-white shadow-soft tnum">{i + 1}</span>
              <div className="lg:mt-5">
                <h3 className="text-xl font-semibold"><Link to={to} className="underline decoration-brand/30 underline-offset-4 hover:decoration-brand">{t}</Link></h3>
                <p className="mt-1 text-muted">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Testimoni */}
      <section className="mt-20 lg:mt-28" aria-labelledby="h-kata">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <H2 id="h-kata">Kata mereka</H2>
          <Link to="/kata-mereka" className="btn btn-soft"><Star size={18} aria-hidden />Semua ulasan</Link>
        </div>
        <Carousel label="Ulasan pengguna" itemClass="w-[88%] sm:w-[48%] lg:w-[32%]">
          {REVIEWS.map((r) => <ReviewCard key={r.id} r={r} />)}
        </Carousel>
        {/* {SAMPLE && <p className="mt-2 text-sm text-muted">Ulasan contoh untuk tampilan. Ganti dengan ulasan asli di src/data/reviews.js.</p>} */}
      </section>

      <section className="mt-20 lg:mt-28" aria-label="Unduh aplikasi"><ApkCard /></section>

      {/* Lokasi */}
      <section className="mt-20 lg:mt-28" aria-labelledby="h-lokasi">
        <H2 id="h-lokasi">Temui kami di RSUD Provinsi NTB</H2>
        <div className="mt-8"><LokasiSection /></div>
      </section>
    </main>
  )
}
