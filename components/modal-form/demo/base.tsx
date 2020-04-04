import React, { useState } from 'react'
import { Button, DatePicker, Switch } from 'antd'
import { ModalForm } from 'ant-design-admin'

export default function ModalFormDemo() {
  const [isShow, setShow] = useState(false)

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

  const onSetShow = () => {
    setShow((value) => !value)
  }
  return (
    <>
      <Button onClick={onSetShow}>Show Modal</Button>
      <ModalForm
        title="Modal Form Demo"
        formProps={{
          items: baseItems,
          onFinish: () =>
            new Promise((resolve) => setTimeout(() => resolve, 2000)),
        }}
        visible={isShow}
        onCancel={onSetShow}
      />
    </>
  )
}
