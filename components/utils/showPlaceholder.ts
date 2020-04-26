import { ReactNode } from 'react'

export default function showPlaceHolder(value: ReactNode, placeholder: string) {
  if (value === null || value === undefined || value === '') {
    return placeholder
  }
  return value
}
