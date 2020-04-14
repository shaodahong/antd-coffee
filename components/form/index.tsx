import React, { ReactElement, FC, ReactNode, useEffect } from 'react'
import AntdForm, {
  FormProps as AntdFormProps,
  FormItemProps as AntdFormItemProps,
} from 'antd/lib/form'
import { StoreValue, Store } from 'antd/lib/form/interface'
// eslint-disable-next-line import/no-extraneous-dependencies
import { NamePath } from 'rc-field-form/lib/interface'
import Input from 'antd/lib/input'
import Row from 'antd/lib/row'
import Col, { ColProps } from 'antd/lib/col'
import Skeleton from 'antd/lib/skeleton'
import get from 'lodash/get'
import update from 'lodash/update'
import { isFunc } from '../utils/is'
import useForceUpdate from '../hooks/useForceUpdate'
import useStates from '../hooks/useStates'
import useFormRegister from './useFormRegister'

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
   * Format initial or onFinish value
   * Like Switch component value onFinish maybe Number(true | false)
   * @example (date) => date.format()
   */
  pipeline?: OutputPipeline | [InputPipeline, OutputPipeline]
  /**
   * Hide Form item by condition
   * @example (fieldValue) => !!fieldValue
   */
  isHidden?: (fieldValue: StoreValue, fieldsValue: Store) => boolean
  /**
   * Set form item layout
   * Priority is greater than Form layoutCol
   * @default { span: 24 }
   * @see https://ant.design/components/grid/#Col
   */
  layoutCol?: ColProps
  /** Extra names, only registered to form store  */
  extraNames?: NamePath[]
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
  /** Enhance initialValues, but only trigger once  */
  initialValues?: Store | (() => Promise<Store>)
}

const { Item, useForm } = AntdForm

const Form: FC<FormProps> = ({
  items,
  children,
  onFinish: antdOnFinish,
  isView = false,
  form,
  layoutCol = { span: 24 },
  initialValues: formInitialValues,
  ...props
}) => {
  const [formInsatce] = useForm(form)
  const forceUpdate = useForceUpdate()
  const isLoadinginitialValues = isFunc(formInitialValues)
  const [initialStates, setInitialStates] = useStates<{
    isLoadinginitialValues: boolean
    initialValues?: Store
  }>({
    isLoadinginitialValues,
    initialValues: isLoadinginitialValues ? {} : formInitialValues,
  })

  /**
   * ======== Start ==========
   * Collect extraNames
   */
  const extraNames = items
    .filter((item) => item.extraNames)
    .reduce(
      (prev: NamePath[], curr) => prev.concat(curr.extraNames as NamePath[]),
      []
    )
    .map((item) => {
      if (Array.isArray(item)) {
        return item
      }
      return [item]
    })

  useFormRegister(formInsatce, extraNames)
  // ======== End ==========

  if (!items || items.length === 0) {
    return null
  }

  const getInitialValues = async () => {
    let values: Store = {}
    try {
      values = await (formInitialValues as () => Promise<Store>)()
      items
        .filter(
          ({ pipeline }) => Array.isArray(pipeline) && pipeline.length === 2
        )
        .forEach(({ pipeline, name }) => {
          const inputer = (pipeline as [InputPipeline, OutputPipeline])[0]
          update(values, name as string, inputer)
        })
    } catch (error) {
      return Promise.reject(error)
    } finally {
      setInitialStates({
        isLoadinginitialValues: false,
        initialValues: values,
      })
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (initialStates.isLoadinginitialValues) {
      getInitialValues()
    } else {
      // Todo: Initial value cannot get when first mount
      forceUpdate()
    }
  }, [])

  // If initialValues update need rerenader?
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    forceUpdate()
  }, [initialStates])

  if (initialStates.isLoadinginitialValues) {
    return <Skeleton />
  }

  const onFinish = (values: Store) => {
    items
      .filter(
        ({ pipeline }) =>
          isFunc(pipeline) || (Array.isArray(pipeline) && pipeline.length === 2)
      )
      .forEach(({ pipeline, name }) => {
        const outputer = isFunc(pipeline)
          ? pipeline
          : (pipeline as [InputPipeline, OutputPipeline])[1]

        update(values, name as string, outputer as OutputPipeline)
      })
    if (antdOnFinish) {
      antdOnFinish(values)
    }
  }

  const renderItems = (
    {
      render,
      renderView,
      isView: isItemView = isView,
      isHidden,
      layoutCol: itemLlayoutCol = layoutCol,
      ...itemProps
    }: FormItemProps,
    index: number
  ) => {
    let Comp
    const { name } = itemProps
    const { getFieldsValue } = formInsatce
    const fieldsValue = getFieldsValue()
    const fieldValue = get(fieldsValue, name as string)

    if (isFunc(isHidden) && isHidden(fieldValue, fieldsValue)) {
      return null
    }

    const key = `form-item-${(name || index).toString()}`

    if (isItemView) {
      Comp =
        renderView && isFunc(renderView)
          ? renderView(fieldValue, fieldsValue)
          : fieldValue
    } else {
      Comp =
        render && isFunc(render) ? (
          render(fieldValue, fieldsValue)
        ) : (
          <Input allowClear />
        )
    }

    return (
      <Col {...itemLlayoutCol}>
        <Item key={key} {...itemProps}>
          {Comp}
        </Item>
      </Col>
    )
  }

  return (
    <AntdForm
      form={formInsatce}
      onFinish={onFinish}
      onValuesChange={forceUpdate}
      initialValues={initialStates.initialValues}
      {...props}
    >
      <Row gutter={24}>
        {items.map((item, index) => renderItems(item, index))}
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
