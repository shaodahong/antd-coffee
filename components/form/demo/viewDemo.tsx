import React from 'react'
import { DatePicker, Switch } from 'antd'
import Form from '../index.tsx'

export default function ViewModeDemo() {
  const viewModeItems = [
    { name: 'name', label: '姓名' },
    { name: 'age', label: '年龄' },
    { name: 'birthday', label: '出生年月', render: () => <DatePicker /> },
    { name: 'hasJob', label: '已就业', render: () => <Switch /> },
  ]

  return (
    <Form
      items={viewModeItems}
      initialValues={{
        name: 'Ant Design Admin',
        age: 8,
        birthday: '2010-01-01',
        hasJob: 1,
      }}
      isView
    />
  )
}
