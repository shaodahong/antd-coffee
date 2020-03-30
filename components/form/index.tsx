import React, { ReactElement, FC, ReactNode, useEffect } from 'react'
import AntdForm, {
  FormProps as AntdFormProps,
  FormItemProps as AntdFormItemProps,
} from 'antd/lib/form'
import Input from 'antd/lib/input'
// eslint-disable-next-line import/no-extraneous-dependencies
import { StoreValue, Store } from 'rc-field-form/lib/interface'
import get from 'lodash/get'
import set from 'lodash/set'
import { isFunc } from '../utils/is'
import useForceUpdate from '../hooks/useForceUpdate'

export type OutputPipeline = (fieldValue: StoreValue) => StoreValue
export type InputPipeline = (fieldValue: StoreValue) => StoreValue

export interface FormItemProps extends AntdFormItemProps {
  /**
   * @default () => <Input />
   */
  render?: (fieldValue: StoreValue, fieldsValue: Store) => ReactElement
  /**
   * @default () => Fileds[name]
   */
  renderView?: (fieldValue: StoreValue, fieldsValue: Store) => ReactNode
  /**
   * Priority is greater than Form isView
   * @default false
   */
  isView?: boolean
  /**
   * Todo: InputPipeline
   * Format initial or onFinish value
   * Like Switch component value onFinish maybe Number(true | false)
   */
  pipeline?: OutputPipeline | [InputPipeline, OutputPipeline]
  /**
   * Hide Form item by condition
   */
  isHidden?: (fieldValue: StoreValue, fieldsValue: Store) => boolean
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
  const [formInsatce] = useForm(form)
  const forceUpdate = useForceUpdate()

  if (!items || items.length === 0) {
    return null
  }

  const onFinish = (values: any) => {
    Object.values(items).forEach(({ name, pipeline }) => {
      const outputer = isFunc(pipeline)
        ? pipeline
        : Array.isArray(pipeline) && pipeline[1]

      if (isFunc(outputer)) {
        const value = get(values, name as string)
        set(values, name as string, (outputer as OutputPipeline)(value))
      }
    })
    if (antdOnFinish) {
      antdOnFinish(values)
    }
  }

  const labelCol = {
    span: 4,
  }

  const renderItem = ({
    render,
    renderView,
    isView: isItemView = isView,
    pipeline,
    isHidden,
    ...itemProps
  }: FormItemProps) => {
    let Comp
    const { name } = itemProps
    const { getFieldsValue } = formInsatce
    const fieldsValue = getFieldsValue()
    const fieldValue = get(fieldsValue, name as string)

    if (isFunc(isHidden) && (isHidden as Function)(fieldValue, fieldsValue)) {
      return null
    }

    const key = `form-item-${name?.toString()}`

    if (isItemView) {
      Comp =
        renderView && isFunc(renderView)
          ? renderView(fieldValue, fieldsValue)
          : fieldValue
    } else {
      Comp =
        render && isFunc(render) ? render(fieldValue, fieldsValue) : <Input />
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
      onValuesChange={forceUpdate}
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
