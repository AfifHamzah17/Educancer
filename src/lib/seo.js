import { useEffect } from 'react'

export const SITE = 'https://educancer.my.id'

const upsertMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const upsertLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function useSEO({ title, description, path = '/', jsonLd } = {}) {
  const ld = JSON.stringify(jsonLd)
  useEffect(() => {
    const fullTitle = title
      ? `${title} | Educancer RSUD Provinsi NTB`
      : 'Educancer: Edukasi Kanker Terintegrasi — RSUD Provinsi NTB'
    document.title = fullTitle
    if (description) {
      upsertMeta('name', 'description', description)
      upsertMeta('property', 'og:description', description)
      upsertMeta('name', 'twitter:description', description)
    }
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('property', 'og:url', SITE + path)
    upsertLink('canonical', SITE + path)

    let script
    if (ld) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = ld
      document.head.appendChild(script)
    }
    return () => script?.remove()
  }, [title, description, path, ld])
}