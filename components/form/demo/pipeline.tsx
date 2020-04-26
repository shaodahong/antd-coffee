import React from 'react'
import { DatePicker, Button } from 'antd'
import { Form } from 'antd-coffee'
import { Moment } from 'moment'
import { Store } from 'antd/lib/form/interface'

export default function PipelineDemo() {
  const baseItems = [
    {
      name: 'birthday',
      label: '出生年月',
      rules: [{ required: true }],
      render: () => <DatePicker />,
      pipeline: (date: Moment) => date.format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  return (
    <Form
      items={baseItems}
      // eslint-disable-next-line no-console
      onFinish={(values: Store) => console.log('PipelineDemo', values)}
    >
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  )
}
