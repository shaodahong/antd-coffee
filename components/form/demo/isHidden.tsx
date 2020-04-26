import React from 'react'
import { Button, Select } from 'antd'
import { Form } from 'antd-coffee'
import { StoreValue, Store } from 'antd/lib/form/interface'

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
      isHidden: (value: StoreValue, values: Store) => {
        return values.name === 'bob'
      },
    },
  ]

  return (
    <Form
      items={baseItems}
      // eslint-disable-next-line no-console
      onFinish={(values: Store) => console.log('IsHiddenDemo', values)}
    >
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  )
}
