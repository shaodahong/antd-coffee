import React, { ReactElement, FC, ReactNode, useEffect, useState } from 'react'
import AntdForm, {
  FormProps as AntdFormProps,
  FormItemProps as AntdFormItemProps,
  FormInstance,
} from 'antd/lib/form'
import Input from 'antd/lib/input'
import { isFunc } from '../utils/is'
import useForceUpdate from '../hooks/useForceUpdate'

export interface FormItemProps extends AntdFormItemProps {
  /**
   * @default () => <Input />
   */
  render?: () => ReactElement
  /**
   * @default () => Fileds[name]
   */
  renderView?: () => ReactNode
  /**
   * Priority is greater than Form isView
   * @default false
   */
  isView?: boolean
  children?: null
}

export interface FormProps extends AntdFormProps {
  items: FormItemProps[]
  children?: React.ReactNode
  /**
   * @default false
   */
  isView?: boolean
}

const { Item, useForm } = AntdForm

const Form: FC<FormProps> = ({
  items,
  children,
  onFinish: antdOnFinish,
  isView = false,
  form,
  ...props
}) => {
  const [formInsatce] = useForm()
  const forceUpdate = useForceUpdate()

  if (!items || items.length === 0) {
    return null
  }

  const onFinish = (values) => {
    antdOnFinish && antdOnFinish(values)
  }

  const labelCol = {
    span: 4,
  }

  const renderItem = ({
    render,
    renderView,
    isView: isItemView = isView,
    ...itemProps
  }: FormItemProps) => {
    let Comp
    const { name } = itemProps
    const { getFieldsValue } = formInsatce
    const key = `form-item-${name?.toString()}`

    const fieldsValue = getFieldsValue()
    const fieldValue = fieldsValue[name]

    if (isItemView) {
      Comp = isFunc(renderView) ? renderView() : fieldValue
    } else {
      Comp = isFunc(render) ? render() : <Input />
    }

    return (
      <Item key={key} {...itemProps}>
        {Comp}
      </Item>
    )
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // Todo: Initial value cannot get when first mount
    forceUpdate()
  }, [])

  return (
    <AntdForm
      form={formInsatce}
      labelCol={labelCol}
      onFinish={onFinish}
      {...props}
    >
      {items.map((item) => renderItem(item))}
      {children && (
        <Item label={<span />} colon={false}>
          {children as ReactElement}
        </Item>
      )}
    </AntdForm>
  )
}

export default Form
