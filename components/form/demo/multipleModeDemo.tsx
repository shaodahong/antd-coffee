import React from 'react'
import { DatePicker, Switch, Button } from 'antd'
import { Form } from 'antd-coffee'

export default function MultipleModeDemo() {
  const multipleModeItems = [
    { name: 'name', label: '姓名', isView: true },
    { name: 'age', label: '年龄', isView: true },
    { name: 'birthday', label: '出生年月', render: () => <DatePicker /> },
    { name: 'hasJob', label: '已就业', render: () => <Switch /> },
  ]

  return (
    <Form
      initialValues={{ name: 'Ant Design Admin', age: 8 }}
      items={multipleModeItems}
    >
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  )
}
