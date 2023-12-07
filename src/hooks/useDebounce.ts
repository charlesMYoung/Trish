import { useEffect, useRef } from 'react'

function useDebounce<T>(fn: (t: T) => void, delay: number) {
  const timeId = useRef<NodeJS.Timeout>()

  const start = (paras: T) => {
    if (timeId.current) {
      clearTimeout(timeId.current)
    }
    timeId.current = setTimeout(() => {
      fn(paras)
    }, delay)
  }

  const cancel = () => {
    if (timeId.current) {
      clearTimeout(timeId.current)
    }
  }

  useEffect(() => {
    return () => {
      if (timeId.current) {
        clearTimeout(timeId.current)
      }
    }
  }, [])

  return {
    start,
    cancel,
  }
}
export { useDebounce }
