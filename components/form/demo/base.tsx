import React from 'react'
import { DatePicker, Switch, Button } from 'antd'
import { Form } from 'antd-coffee'

export default function BaseDemo() {
  const baseItems = [
    { name: 'name', label: '姓名', required: true },
    {
      name: 'age',
      label: '年龄',
      rules: [{ required: true, message: '请输入年龄' }],
    },
    { name: 'birthday', label: '出生年月', render: () => <DatePicker /> },
    { name: 'hasJob', label: '已就业', render: () => <Switch /> },
  ]

  return (
    <Form items={baseItems}>
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  )
}
