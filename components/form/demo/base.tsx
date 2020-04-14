import React from 'react'
import { DatePicker, Switch, Button, Input } from 'antd'
import { Form } from 'antd-coffee'
import { useForm } from 'antd/lib/form/util'
import { Store } from 'antd/lib/form/interface'

export default function BaseDemo() {
  const [form] = useForm()
  const baseItems = [
    {
      name: 'name',
      label: '姓名',
    },
    {
      name: 'age',
      label: '年龄',
    },
    { name: 'birthday', label: '出生年月', render: () => <DatePicker /> },
    { name: 'hasJob', label: '已就业', render: () => <Switch /> },
  ]

  return (
    <Form
      items={baseItems}
      form={form}
      onFinish={(values: Store) => console.log('BaseDemo', values)}
    >
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  )
}
