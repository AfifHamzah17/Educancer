// 5 soal x 20 poin. 20 poin = 1 bintang.
export function grade(questions, answers) {
  const rows = questions.map((q, i) => ({ q, pick: answers[i], ok: answers[i] === q.a }))
  const benar = rows.filter((r) => r.ok).length
  return { rows, benar, salah: rows.length - benar, total: rows.length, skor: benar * 20, bintang: benar }
}
// Teks soal dibuat besar; hanya soal yang sangat panjang yang turun satu tingkat.
export const textClass = (s) => (s.length <= 60 ? 'text-3xl lg:text-4xl' : s.length <= 110 ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl')
export const verdict = (skor) => (skor >= 80 ? 'Sangat baik' : skor >= 60 ? 'Cukup baik' : 'Perlu belajar lagi')
