import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment'
import { Form } from 'antd-coffee'
import { Button } from 'antd'

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
      initialValues={() =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              name: 'Ant Design Admin',
              age: 8,
              birthday: moment(),
              hasJob: 1,
            })
          }, 3000)
        )
      }
      isView
    />
  )
}
