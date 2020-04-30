import React, { ReactElement, FC, ReactNode, useEffect } from 'react'
import { Form as AntdForm, Input, Row, Col, Skeleton, Popover } from 'antd'
import {
  FormProps as AntdFormProps,
  FormItemProps as AntdFormItemProps,
  FormInstance,
} from 'antd/lib/form'
import { StoreValue, Store } from 'antd/lib/form/interface'
import { ColProps } from 'antd/lib/col'
import get from 'lodash/get'
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import update from 'lodash/update'
import isEqual from 'lodash/isEqual'
import { isFunc } from '../utils/is'
import useForceUpdate from '../hooks/useForceUpdate'
import useStates from '../hooks/useStates'
import showPlaceHolder from '../utils/showPlaceholder'
import usePrevious from './usePrevious'

export type OutputPipeline = (fieldValue: StoreValue) => StoreValue
export type InputPipeline = (fieldValue: StoreValue) => StoreValue

interface FormCommonProps {
  /**
   * If show when data nullish in View mode
   * @default -
   */
  placeholder?: string
  /**
   * Priority is greater than Form isView
   * @default false
   */
  isView?: boolean
  /**
   * Set form item layout
   * Priority is greater than Form layoutCol
   * @default { span: 24 }
   * @see https://ant.design/components/grid/#Col
   */
  layoutCol?: ColProps
}

export interface FormItemProps
  extends Omit<AntdFormItemProps, 'children'>,
    FormCommonProps {
  /**
   * @example () => <Input />
   */
  render?: (
    fieldValue: StoreValue,
    fieldsValue: Store,
    form: FormInstance
  ) => ReactElement
  /**
   * @example (fieldValue) => fieldValue + 1
   */
  renderView?: (
    fieldValue: StoreValue,
    fieldsValue: Store,
    form: FormInstance
  ) => ReactNode
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
  tip?:
    | ReactNode
    | ((
        fieldValue: StoreValue,
        fieldsValue: Store,
        form: FormInstance
      ) => ReactNode)
  extra?: ReactNode | ((fieldsValue: Store) => ReactNode)
}

export interface FormProps extends AntdFormProps, FormCommonProps {
  items: FormItemProps[]
  children?: React.ReactNode
  /** Enhance initialValues, but only trigger once  */
  initialValues?: Store | (() => Promise<Store>)
}

const { Item, useForm, List, Provider } = AntdForm

const InternalForm: FC<FormProps> = ({
  items,
  children,
  onFinish: onFinishInternal,
  isView = false,
  form,
  layoutCol = { span: 24 },
  initialValues: initialValuesInternal,
  placeholder: placeholderInternal = '-',
  onValuesChange: onValuesChangeInternal,
  ...props
}) => {
  const [formInsatce] = useForm(form)
  const forceUpdate = useForceUpdate()
  const isLoadinginitialValues = isFunc(initialValuesInternal)
  const [initialStates, setInitialStates] = useStates<{
    isLoadinginitialValues: boolean
    initialValues?: Store
  }>({
    isLoadinginitialValues,
    initialValues: isLoadinginitialValues ? {} : initialValuesInternal,
  })
  const prevFormInitialValues = usePrevious(initialValuesInternal)

  const getInitialValues = async () => {
    let values: Store = {}
    try {
      values = await (initialValuesInternal as () => Promise<Store>)()
      items
        .filter(
          ({ pipeline }) => Array.isArray(pipeline) && pipeline.length === 2
        )
        .forEach(({ pipeline, name }) => {
          const inputer = (pipeline as [InputPipeline, OutputPipeline])[0]
          update(values, name as string, inputer)
        })
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

  useEffect(() => {
    if (
      !isLoadinginitialValues &&
      !isEqual(prevFormInitialValues, initialValuesInternal)
    ) {
      formInsatce.setFieldsValue(initialValuesInternal as Store)
      forceUpdate()
    }
  }, [initialValuesInternal])

  if (!items || items.length === 0) {
    return null
  }

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
    if (onFinishInternal) {
      onFinishInternal(values)
    }
  }

  const renderItems = (
    {
      render,
      renderView,
      isView: isItemView = isView,
      isHidden,
      layoutCol: itemLlayoutCol = layoutCol,
      label,
      tip,
      placeholder = placeholderInternal,
      extra,
      ...itemProps
    }: FormItemProps,
    index: number
  ) => {
    let Comp: ReactNode
    const { name } = itemProps
    const { getFieldsValue } = formInsatce
    const fieldsValue = {
      ...initialValuesInternal,
      ...initialStates.initialValues,
      ...getFieldsValue(),
    }
    const fieldValue: StoreValue = get(fieldsValue, name as string)

    if (isFunc(isHidden) && isHidden(fieldValue, fieldsValue)) {
      return null
    }

    const key = `form-item-${(name || index).toString()}`

    const LabelWrap = tip ? (
      <>
        {label}
        <Popover
          content={
            isFunc(tip) ? () => tip(fieldValue, fieldsValue, formInsatce) : tip
          }
        >
          <QuestionCircleOutlined
            style={{
              marginLeft: 4,
            }}
          />
        </Popover>
      </>
    ) : (
      label
    )

    if (isItemView) {
      Comp = showPlaceHolder(
        renderView && isFunc(renderView)
          ? renderView(fieldValue, fieldsValue, formInsatce)
          : fieldValue,
        placeholder
      )
    } else {
      Comp =
        render && isFunc(render) ? (
          render(fieldValue, fieldsValue, formInsatce)
        ) : (
          <Input allowClear />
        )
    }

    return (
      <Col {...itemLlayoutCol}>
        <Item
          key={key}
          label={LabelWrap}
          extra={isFunc(extra) ? extra(fieldsValue) : extra}
          {...itemProps}
        >
          {Comp}
        </Item>
      </Col>
    )
  }

  const onValuesChange = (changeValues: Store, values: Store) => {
    forceUpdate()
    isFunc(onValuesChangeInternal) &&
      onValuesChangeInternal(changeValues, values)
  }

  return (
    <AntdForm
      form={formInsatce}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
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

type InternalForm = typeof InternalForm

type Form = InternalForm &
  Pick<typeof AntdForm, 'Item' | 'List' | 'useForm' | 'Provider'>

const Form: Form = InternalForm as Form

Form.Item = Item
Form.List = List
Form.useForm = useForm
Form.Provider = Provider

export default Form
