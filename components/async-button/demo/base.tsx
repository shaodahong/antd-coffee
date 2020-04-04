import React from 'react'
import { AsyncButton } from 'ant-design-admin'

export default function Base() {
  return (
    <AsyncButton onClick={() => new Promise((res) => setTimeout(res, 1000))}>
      Click
    </AsyncButton>
  )
}
