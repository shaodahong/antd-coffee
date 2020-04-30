import React from 'react'
import { DatePicker, Switch, Button } from 'antd'
import { Form } from 'antd-coffee'
import { Store } from 'antd/lib/form/interface'

const { useForm } = Form

export default function CardMode() {
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
      // eslint-disable-next-line no-console
      onFinish={(values: Store) => console.log('CardMode', values)}
      mode="card"
      cardProps={{
        title: 'Card 模式',
        extra: (
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        ),
      }}
    />
  )
}
