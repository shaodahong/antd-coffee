import React, { ReactElement, FC, ReactNode, useEffect } from 'react'
import AntdForm, {
  FormProps as AntdFormProps,
  FormItemProps as AntdFormItemProps,
} from 'antd/lib/form'
import Input from 'antd/lib/input'
import Row from 'antd/lib/row'
import Col, { ColProps } from 'antd/lib/col'
// eslint-disable-next-line import/no-extraneous-dependencies
import { StoreValue, Store } from 'rc-field-form/lib/interface'
import get from 'lodash/get'
import set from 'lodash/set'
import { isFunc } from '../utils/is'
import useForceUpdate from '../hooks/useForceUpdate'
import { Func } from '../utils/type'

export type OutputPipeline = (fieldValue: StoreValue) => StoreValue
export type InputPipeline = (fieldValue: StoreValue) => StoreValue

export interface FormItemProps extends Omit<AntdFormItemProps, 'children'> {
  /**
   * @example () => <Input />
   */
  render?: (fieldValue: StoreValue, fieldsValue: Store) => ReactElement
  /**
   * @example (fieldValue) => fieldValue + 1
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
   * @example (date) => date.format()
   */
  pipeline?: OutputPipeline | [InputPipeline, OutputPipeline]
  /**
   * Hide Form item by condition
   * @example (fieldValue) => fieldValue === 1
   */
  isHidden?: (fieldValue: StoreValue, fieldsValue: Store) => boolean
  /**
   * Set form item layout
   * Priority is greater than Form layoutCol
   * @default { span: 24 }
   * @see https://ant.design/components/grid/#Col
   */
  layoutCol?: ColProps
  onFinish?: (fieldsValue: Store) => Promise<any> | void
}

export interface FormProps extends AntdFormProps {
  items: FormItemProps[]
  children?: React.ReactNode
  /**
   * @default false
   */
  isView?: boolean
  /**
   * Set form item layout
   * @default { span: 24 }
   * @see https://ant.design/components/grid/#Col
   */
  layoutCol?: ColProps
}

const { Item, useForm } = AntdForm

const Form: FC<FormProps> = ({
  items,
  children,
  onFinish: antdOnFinish,
  isView = false,
  form,
  layoutCol = { span: 24 },
  ...props
}) => {
  const [formInsatce] = useForm(form)
  const forceUpdate = useForceUpdate()

  if (!items || items.length === 0) {
    return null
  }

  const onFinish = (values: Store) => {
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

  const renderItems = ({
    render,
    renderView,
    isView: isItemView = isView,
    pipeline,
    isHidden,
    layoutCol: itemLlayoutCol = layoutCol,
    ...itemProps
  }: FormItemProps) => {
    let Comp
    const { name } = itemProps
    const { getFieldsValue } = formInsatce
    const fieldsValue = getFieldsValue()
    const fieldValue = get(fieldsValue, name as string)

    if (isFunc(isHidden) && (isHidden as Func)(fieldValue, fieldsValue)) {
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
      <Col {...itemLlayoutCol}>
        <Item key={key} {...itemProps}>
          {Comp}
        </Item>
      </Col>
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
      onFinish={onFinish}
      onValuesChange={forceUpdate}
      {...props}
    >
      <Row gutter={24}>
        {items.map((item) => renderItems(item))}
        {children && (
          <Col
            style={{
              flex: '1',
            }}
          >
            <Item label={<span />} colon={false}>
              {children as ReactElement}
            </Item>
          </Col>
        )}
      </Row>
    </AntdForm>
  )
}

export default Form
