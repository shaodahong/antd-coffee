import { useReducer } from 'react'

export default function useStates<T>(initialValue: T) {
  const reducer = (state: T, data: T) => {
    return { ...state, ...data }
  }
  return useReducer(reducer, initialValue)
}
