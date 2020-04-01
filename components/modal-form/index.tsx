import React, { FC, MouseEventHandler } from 'react'
import Modal, { ModalProps } from 'antd/lib/modal'
import { useForm } from 'antd/lib/form/util'
import Form, { FormProps } from '../form'
import { isFunc } from '../utils/is'
import { Func } from '../utils/type'

export interface ModalFormProps extends ModalProps {
  formProps: FormProps
}

const ModalForm: FC<ModalFormProps> = ({ formProps, onOk, ...props }) => {
  const [form] = useForm()

  const onModalOk: MouseEventHandler = async (e) => {
    try {
      await form.submit()
      if (isFunc(onOk)) {
        await (onOk as Func)(e)
      }
      console.log(1)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <Modal onOk={onModalOk} {...props}>
      <Form
        form={form}
        {...formProps}
        onFinish={() => new Promise((resolve) => setTimeout(resolve, 2000))}
      />
    </Modal>
  )
}

export default ModalForm
