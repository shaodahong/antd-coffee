import React, { FC, MouseEventHandler, useState, useEffect } from 'react'
import { Modal, Form as AntdForm } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import { Store } from 'antd/lib/form/interface'
import Form, { FormProps } from '../form'
import { isFunc } from '../utils/is'

const { useForm } = AntdForm

export interface ModalFormProps extends ModalProps {
  formProps: FormProps
  /**
   * Keep form value when Modal reopen
   * @default false
   */
  isKeepAlive?: boolean
  onOk?: (values: Store) => Promise<unknown> | false | void
  onCancel?: () => void
}

const ModalForm: FC<ModalFormProps> = ({
  formProps,
  onOk,
  okButtonProps,
  visible,
  isKeepAlive = false,
  ...props
}) => {
  const [form] = useForm()
  const [loading, setLoading] = useState(false)

  const onModalOk: MouseEventHandler = () => {
    form.submit()
  }

  const onModalFormFinish = async (values: Store) => {
    try {
      setLoading(true)
      let isNeedCloseWhenOnFinish = true
      const { onCancel } = props
      if (isFunc(formProps.onFinish)) {
        await formProps.onFinish(values)
      }
      if (isFunc(onOk)) {
        const result = await onOk(values)
        result === false && (isNeedCloseWhenOnFinish = result)
      }

      if (isNeedCloseWhenOnFinish && isFunc(onCancel)) {
        onCancel()
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!visible && !isKeepAlive) {
      form.resetFields()
    }
  }, [visible, isKeepAlive])

  return (
    <Modal
      onOk={onModalOk}
      okButtonProps={{
        ...okButtonProps,
        loading,
      }}
      visible={visible}
      {...props}
    >
      <Form {...formProps} form={form} onFinish={onModalFormFinish} />
    </Modal>
  )
}

export default ModalForm
