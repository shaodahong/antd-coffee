import React from 'react'
import { AsyncButton } from 'antd-coffee'

export default function Base() {
  return (
    <AsyncButton onClick={() => new Promise((res) => setTimeout(res, 1000))}>
      Click
    </AsyncButton>
  )
}
