const W = { payudara: '#E0679A', ovarium: '#EE8A2B', rektum: '#3F78B8', nasofaring: '#7B5AB5', trofoblastik: '#D43C3C', nhl: '#8DB63F', serviks: '#1F9C8E', kss: '#B08457', paru: '#E3C34A', testis: '#C21F7E' }
export const TOPICS = [
  ['payudara', 'Kanker Payudara'], ['ovarium', 'Kanker Ovarium'], ['rektum', 'Kanker Rektum'],
  ['nasofaring', 'Karsinoma Nasofaring'], ['trofoblastik', 'Trofoblastik Gestasional'], ['nhl', 'Kanker NHL'],
  ['serviks', 'Kanker Serviks'], ['kss', 'Karsinoma Sel Skuamosa'], ['paru', 'Kanker Paru'], ['testis', 'Kanker Testis'],
].map(([slug, nama]) => ({ slug, nama, warna: W[slug], img: `/images/kanker/${slug}.webp`, pdf: `/materi/kanker${slug}.pdf` }))
