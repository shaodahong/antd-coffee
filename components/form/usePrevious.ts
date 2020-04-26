import { useRef, useEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function usePrevious(value: any): any {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
