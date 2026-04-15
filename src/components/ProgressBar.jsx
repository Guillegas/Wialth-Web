import { useEffect, useState } from 'react'

export default function ProgressBar() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(62.4), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="h-[2px] bg-transparent overflow-hidden" aria-hidden="true">
      <div
        className="h-full pbar-gradient transition-all duration-[1800ms] ease-[cubic-bezier(.22,1,.36,1)]"
        style={{ width: `${width}%`, transitionDelay: '300ms' }}
      />
    </div>
  )
}
