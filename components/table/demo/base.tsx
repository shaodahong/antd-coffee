import React from 'react'
import { ColumnsType } from 'antd/lib/table'
import { Table } from 'antd-coffee'
import { DatePicker } from 'antd'

interface User {
  key: number
  name: string
  age: number
  birthday: string
  hobby: string
  grade: string
}

export default function BaseDemo() {
  const columns: ColumnsType<User> = [
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

  const data: User[] = [
    {
      key: 0,
      name: 'Jack',
      age: 12,
      birthday: '2010-10',
      hobby: '篮球',
      grade: '初一',
    },
    {
      key: 1,
      name: 'Bob',
      age: 18,
      birthday: '2011-10',
      hobby: '跳舞',
      grade: '初二',
    },
  ]

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
            resolve({ data })
          }, 1000)
        )
      }
      searchProps={{
        items,
      }}
    />
  )
}
