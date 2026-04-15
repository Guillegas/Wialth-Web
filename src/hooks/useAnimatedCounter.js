import { useState, useEffect, useRef } from 'react'

function easeOut(t) { return 1 - Math.pow(1 - t, 3) }

export function useAnimatedCounter(target, duration = 2000, startWhen = true) {
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!startWhen || startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1)
      setValue(Math.round(target * easeOut(p)))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [startWhen, target, duration])

  return value
}
