import React from 'react'
import { ColumnsType } from 'antd/lib/table'
import Table from '..'

interface User {
  key: number
  name: string
}

export default function BaseDemo() {
  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
  ]

  const data: User[] = [
    {
      key: 0,
      name: 'Jack',
    },
    {
      key: 1,
      name: 'Bob',
    },
  ]

  return <Table<User> columns={columns} dataSource={data} />
}
