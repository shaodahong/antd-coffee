import React from 'react'
import { Form } from 'antd-coffee'

export default function BaseDemo() {
  const baseItems = [
    {
      name: 'name',
      label: '姓名',
      tip: '不能为空',
    },
  ]

  return <Form items={baseItems} />
}
