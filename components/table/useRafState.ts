import {
  useEffect,
  useRef,
  useState,
  useCallback,
  SetStateAction,
  Dispatch,
} from 'react'

export default function useRafState<T>(
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] {
  const frame = useRef(0)
  const [state, setState] = useState(initialState)

  const setRafState = useCallback((value: T | ((prevState: T) => T)) => {
    cancelAnimationFrame(frame.current)

    frame.current = requestAnimationFrame(() => {
      setState(value)
    })
  }, [])

  useEffect(() => {
    return () => cancelAnimationFrame(frame.current)
  })

  return [state, setRafState]
}
