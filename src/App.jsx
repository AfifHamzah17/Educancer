import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Shell from './components/Shell.jsx'
import UpdateToast from './components/UpdateToast.jsx'
import { FullSkeleton } from './components/Skeletons.jsx'

const Splash = lazy(() => import('./pages/Splash.jsx'))
const Menu = lazy(() => import('./pages/Menu.jsx'))
const Materi = lazy(() => import('./pages/Materi.jsx'))
const PdfReader = lazy(() => import('./pages/PdfReader.jsx'))
const Video = lazy(() => import('./pages/Video.jsx'))
const QuizList = lazy(() => import('./pages/QuizList.jsx'))
const QuizPlay = lazy(() => import('./pages/QuizPlay.jsx'))
const QuizResult = lazy(() => import('./pages/QuizResult.jsx'))
const Faq = lazy(() => import('./pages/Faq.jsx'))
const Konsultasi = lazy(() => import('./pages/Konsultasi.jsx'))
const ProfilLayanan = lazy(() => import('./pages/ProfilLayanan.jsx'))
const KataMereka = lazy(() => import('./pages/KataMereka.jsx'))
const Lokasi = lazy(() => import('./pages/Lokasi.jsx'))

export default function App() {
  return (
    <>
      <Suspense fallback={<FullSkeleton />}>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/quiz/:slug/play" element={<QuizPlay />} />
          <Route element={<Shell />}>
            <Route path="/menu" element={<Menu />} />
            <Route path="/materi" element={<Materi />} />
            <Route path="/materi/:slug" element={<PdfReader />} />
            <Route path="/video" element={<Video />} />
            <Route path="/quiz" element={<QuizList />} />
            <Route path="/quiz/:slug/result" element={<QuizResult />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/konsultasi" element={<Konsultasi />} />
            <Route path="/profil-layanan" element={<ProfilLayanan />} />
            <Route path="/kata-mereka" element={<KataMereka />} />
            <Route path="/lokasi" element={<Lokasi />} />
          </Route>
          <Route path="*" element={<Navigate to="/menu" replace />} />
        </Routes>
      </Suspense>
      <UpdateToast />
    </>
  )
}
