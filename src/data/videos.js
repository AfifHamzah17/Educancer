// 12 video: 10 YouTube unik + 2 Instagram Reel. Judul bisa diedit.
const yt = ['yJrJpTBPM4w','pomiFEjKinc','CplbhsdY7P0','m0mXf03LO1E','guysYc6584Q','P7yBca8EowA','k5Tf5qbLToQ','s8LqeQqKSCU','wJl3Bux1384','NO9HTkoHI1E']
const ig = ['CoUBttMgzDR','DCadsjiO39X']
export const VIDEOS = [
  ...ig.map((id, i) => ({ type: 'ig', id, judul: `Video Edukasi ${i + 1}`, url: `https://www.instagram.com/reel/${id}/` })),
  ...yt.map((id, i) => ({ type: 'yt', id, judul: `Video Edukasi ${i + 3}`, url: `https://www.youtube-nocookie.com/embed/${id}` })),
]
