import { useState, useEffect, useRef } from 'react'

function getTimeLeft(target) {
  const diff = new Date(target) - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / 864e5),
    hours:   Math.floor((diff % 864e5) / 36e5),
    minutes: Math.floor((diff % 36e5)  / 6e4),
    seconds: Math.floor((diff % 6e4)   / 1e3),
  }
}

export function useCountdown(targetDate) {
  const [time, setTime] = useState(() => getTimeLeft(targetDate))
  const prevRef = useRef(time)

  useEffect(() => {
    const id = setInterval(() => {
      const next = getTimeLeft(targetDate)
      prevRef.current = time
      setTime(next)
    }, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return time
}
