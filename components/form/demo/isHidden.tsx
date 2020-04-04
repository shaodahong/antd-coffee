import React from 'react'
import { DatePicker, Switch, Button, Select } from 'antd'
import { Form } from 'ant-design-admin'

export default function IsHiddenDemo() {
  const baseItems = [
    {
      name: 'name',
      label: '姓名',
      render: () => (
        <Select>
          <Select.Option value="bob">Bob</Select.Option>
          <Select.Option value="darry">Darry</Select.Option>
        </Select>
      ),
    },
    {
      name: 'age',
      label: '年龄',
      extra: '姓名为 bob 时隐藏',
      isHidden: (value: any, values: any) => {
        return values.name === 'bob'
      },
    },
  ]

  return (
    <Form
      items={baseItems}
      onFinish={(values: any) => console.log('IsHiddenDemo', values)}
    >
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  )
}
