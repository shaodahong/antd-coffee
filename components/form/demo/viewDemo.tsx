import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment'
import { Switch } from 'antd'
import Form from '../index'

export default function ViewModeDemo() {
  const viewModeItems = [
    { name: 'name', label: '姓名' },
    { name: 'age', label: '年龄' },
    {
      name: 'birthday',
      label: '出生年月',
      renderView: (date: moment.Moment) => date?.format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      name: 'hasJob',
      label: '已就业',
      renderView: (value: number) => (value ? '是' : '否'),
    },
  ]

  return (
    <Form
      items={viewModeItems}
      initialValues={{
        name: 'Ant Design Admin',
        age: 8,
        birthday: moment(),
        hasJob: 1,
      }}
      isView
    />
  )
}
