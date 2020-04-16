import React from 'react'
import { Table } from 'antd-coffee'
import { DatePicker } from 'antd'
// eslint-disable-next-line import/no-extraneous-dependencies
import { mock } from 'mockjs'
import { TableColumnsType } from '..'

interface User {
  key: number
  name: string
  age: number
  birthday: string
  hobby: string
  grade: string
}

export default function BaseDemo() {
  const columns: TableColumnsType<User>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      sorter: true,
    },
    {
      title: '生日',
      dataIndex: 'birthday',
    },
    {
      title: '爱好',
      dataIndex: 'hobby',
    },
    {
      title: '年级',
      dataIndex: 'grade',
    },
  ]

  const data = mock({
    'data|10-100': [
      {
        name: '@first',
        age: '@integer(10, 30)',
        birthday: '@date',
        'hobby|+1': ['篮球', '乒乓球'],
        'grade|+1': ['初一', '初二', '初三'],
      },
    ],
    total() {
      // eslint-disable-next-line react/no-this-in-sfc
      return this.data.length
    },
  })

  const items = [
    { name: 'name', label: '姓名' },
    { name: 'age', label: '年龄' },
    { name: 'birthday', label: '生日', render: () => <DatePicker /> },
    { name: 'hobby', label: '爱好' },
    { name: 'grade', label: '年级' },
  ]

  return (
    <Table<User>
      columns={columns}
      onSearch={() =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve(data)
          }, 1000)
        )
      }
      searchProps={{
        items,
      }}
    />
  )
}
