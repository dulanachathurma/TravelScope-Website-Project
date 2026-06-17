import { useEffect } from 'react'

export default function Snow() {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768
    const count = isMobile ? 15 : 30
    const flakes = []

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div')
      el.className = 'snowflake'
      el.textContent = '❄'
      el.style.left = Math.random() * 100 + 'vw'
      el.style.fontSize = (Math.random() * 8 + 8) + 'px'
      el.style.animationDuration = (Math.random() * 4 + 3) + 's'
      el.style.animationDelay = (Math.random() * 5) + 's'
      el.style.opacity = (Math.random() * 0.5 + 0.2).toString()
      document.body.appendChild(el)
      flakes.push(el)
    }

    return () => flakes.forEach(f => f.remove())
  }, [])

  return null
}
