import { Home, BookOpen, PlayCircle, ListChecks, HelpCircle, MessageCircle, Stethoscope, Star, MapPin } from 'lucide-react'

export const NAV = [
  { to: '/menu', label: 'Beranda', icon: Home },
  { to: '/materi', label: 'Materi', icon: BookOpen },
  { to: '/video', label: 'Video', icon: PlayCircle },
  { to: '/quiz', label: 'Quiz', icon: ListChecks },
  { to: '/faq', label: 'FAQ', icon: HelpCircle },
  { to: '/konsultasi', label: 'Konsultasi', icon: MessageCircle },
  { to: '/profil-layanan', label: 'Layanan onkologi', short: 'Layanan', icon: Stethoscope },
  { to: '/kata-mereka', label: 'Kata mereka', icon: Star },
  { to: '/lokasi', label: 'Lokasi', icon: MapPin },
]
export const TABS = ['/menu', '/materi', '/video', '/quiz', '/profil-layanan'].map((to) => NAV.find((n) => n.to === to))
