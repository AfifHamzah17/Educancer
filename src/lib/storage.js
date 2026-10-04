const P = 'educancer:'
export const load = (k) => { try { return JSON.parse(localStorage.getItem(P + k)) } catch { return null } }
export const save = (k, v) => { try { localStorage.setItem(P + k, JSON.stringify(v)) } catch { /* penyimpanan penuh/diblokir */ } }
