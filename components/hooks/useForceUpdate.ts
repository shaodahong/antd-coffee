import { useState } from 'react'

export default function useForceUpdate() {
  const [, setValue] = useState<number>(0) // integer state
  return () => setValue((value) => value + 1)
}
