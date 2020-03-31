import React, { useState } from 'react'
import { DatePicker, Switch, Button, Radio, Space } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import { FormLayout } from 'antd/lib/form/Form'
import Form from '../index.tsx'

export default function LayoutColDemo() {
  const [mode, setMode] = useState(1)
  const [layout, setLayout] = useState<FormLayout>('horizontal')

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

  const onChange = (e: RadioChangeEvent) => {
    setMode(e.target.value)
  }

  const onChangeLayout = (e: RadioChangeEvent) => {
    setLayout(e.target.value)
  }

  return (
    <div>
      <Space
        direction="vertical"
        style={{
          marginBottom: 24,
        }}
      >
        <Radio.Group onChange={onChange} value={mode}>
          <Radio value={1}>单行</Radio>
          <Radio value={2}>两行</Radio>
          <Radio value={4}>四行</Radio>
        </Radio.Group>
        <Radio.Group onChange={onChangeLayout} value={layout}>
          <Radio value="horizontal">水平</Radio>
          <Radio value="vertical">垂直</Radio>
        </Radio.Group>
      </Space>

      <Form
        items={baseItems}
        layoutCol={{
          span: 24 / mode,
        }}
        layout={layout}
      >
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form>
    </div>
  )
}
