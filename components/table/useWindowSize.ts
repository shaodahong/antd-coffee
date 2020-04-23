import { useEffect } from 'react'
import useRafState from './useRafState'

/**
 * Todo: calc
 */
export default function useWindowSize(): { width: number; height: number } {
  const [state, setState] = useRafState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight - 213,
  })

  useEffect((): (() => void) | void => {
    const handler = () => {
      setState({
        width: window.innerWidth,
        height: window.innerHeight - 213,
      })
    }

    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])

  return state
}
