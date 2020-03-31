import React from 'react'
import { DatePicker, Switch, Button } from 'antd'
import Form from '../index.tsx'

export default function PipelineDemo() {
  const baseItems = [
    {
      name: 'birthday',
      label: '出生年月',
      rules: [{ required: true }],
      render: () => <DatePicker />,
      pipeline: (date: any) => date.format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  return (
    <Form
      items={baseItems}
      onFinish={(values: any) => console.log('PipelineDemo', values)}
    >
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  )
}
