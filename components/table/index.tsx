import React, {
  useEffect,
  forwardRef,
  ReactElement,
  Ref,
  useImperativeHandle,
} from 'react'
import {
  Table as AntdTable,
  Space,
  Row,
  Divider,
  Form as AntdForm,
  Col,
  Tooltip,
} from 'antd'
import { TableProps as AntdTableProps } from 'antd/lib/table'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import DownOutlined from '@ant-design/icons/DownOutlined'
import RedoOutlined from '@ant-design/icons/RedoOutlined'
import get from 'lodash/get'
import { PaginationConfig } from 'antd/lib/pagination'
import { Store } from 'antd/lib/form/interface'
import {
  SorterResult,
  TableCurrentDataSource,
  Key,
  ColumnsType,
  ColumnGroupType,
  ColumnType,
} from 'antd/lib/table/interface'
import Form, { FormProps } from '../form'
import AsyncButton from '../async-button'
import { isFunc } from '../utils/is'
import showPlaceHolder from '../utils/showPlaceholder'
import useWindowSize from './useWindowSize'
import useStates from '../hooks/useStates'

const { useForm } = AntdForm

interface TableCommonProps {
  /**
   * If show when data nullish
   * @default -
   */
  placeholder?: string
}

export interface TableSearchProps extends FormProps {
  /**
   * Show search form item count
   * @default 3
   */
  initialCount?: number
}

interface TablePaginationName {
  /**
   * @default total
   */
  totalName?: string
  /**
   * @default pageSize
   */
  pageSizeName?: string
  /**
   * @default pageNum
   */
  pageNumName?: string
  /**
   * @default data
   */
  dataName?: string
  /**
   * @default 20
   */
  pageSize?: number
  /**
   * @default 1
   */
  pageNum?: number
}

export interface TableData<RecordType> {
  data: RecordType[]
  [key: string]: any
}

// interface TableColumnsProps extends TableCommonProps {}

export type TableColumnsType<RecordType> = TableCommonProps &
  (ColumnGroupType<RecordType> | ColumnType<RecordType>)

export interface TableProps<RecordType>
  extends AntdTableProps<RecordType>,
    TablePaginationName,
    TableCommonProps {
  searchProps?: TableSearchProps
  onSearch: (
    params: any
  ) => TableData<RecordType> | Promise<TableData<RecordType>>
  columns?: TableColumnsType<RecordType>[]
  /**
   * Show Table quick tools (refresh ...)
   */
  showTools?: boolean
}

export interface TableRef {
  /**
   * Refresh Table data with existing search params
   */
  refresh: () => Promise<any>
}

function Table<RecordType extends object>(
  {
    searchProps: tableSearchProps,
    onSearch: onTableSearch,
    pagination,
    totalName = 'total',
    pageSize = 20,
    pageSizeName = 'pageSize',
    pageNum = 1,
    pageNumName = 'pageNum',
    dataName = 'data',
    onChange: onTableChange,
    columns,
    placeholder: tablePlaceholder = '-',
    title,
    showTools,
    scroll,
    ...props
  }: TableProps<RecordType>,
  ref: Ref<TableRef>
) {
  const [form] = useForm()
  const { height } = useWindowSize()
  const [state, setState] = useStates<{
    loading: boolean
    isExpand: boolean
    data: TableData<RecordType>
    pageNum: number
  }>({
    loading: false,
    isExpand: false,
    data: { data: [] },
    pageNum,
  })

  // get data source
  const onSearch = async (params?: Store) => {
    try {
      setState({
        loading: true,
      })
      const searchValues = form.getFieldsValue()
      const result = await onTableSearch({
        ...(pagination === false
          ? {}
          : {
              [pageNumName]: state.pageNum,
              [pageSizeName]: pageSize,
            }),
        ...params,
        ...searchValues,
      })
      setState({
        data: result,
      })
    } finally {
      setState({
        loading: false,
      })
    }
  }

  const refresh = () => onSearch()

  const onClickSearch = () => {
    setState({
      pageNum: 1,
    })
    return onSearch({
      [pageNumName]: 1,
    })
  }

  const onTableReset = () => {
    setState({
      pageNum: 1,
    })
    form.resetFields()
    onSearch({
      [pageNumName]: 1,
    })
  }

  const onChange = (
    paginationConfig: PaginationConfig,
    filters: Record<string, Key[] | null>,
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
    extra: TableCurrentDataSource<RecordType>
  ) => {
    setState({
      pageNum: paginationConfig.current,
    })

    onSearch({
      [pageNumName]: paginationConfig.current,
    })

    if (isFunc(onTableChange)) {
      onTableChange(paginationConfig, filters, sorter, extra)
    }
  }

  const renderColumns: () => ColumnsType<RecordType> | undefined = () => {
    return columns?.map(
      ({ placeholder = tablePlaceholder, render, ...columnProps }) => ({
        ...columnProps,
        render: (text, record, index) => {
          if (isFunc(render)) {
            const result = render(text, record, index)
            return showPlaceHolder(result, placeholder)
          }

          return showPlaceHolder(text, placeholder)
        },
      })
    )
  }

  const renderSearchColumns = () => {
    if (!tableSearchProps) {
      return null
    }
    const { initialCount = 3, items, ...searchProps } = tableSearchProps

    return (
      <>
        <Form
          items={state.isExpand ? items : items.slice(0, initialCount)}
          form={form}
          layoutCol={{ span: 6 }}
          {...searchProps}
        >
          <Row justify="end">
            <Space>
              <AsyncButton
                onClick={onClickSearch}
                type="primary"
                icon={<SearchOutlined />}
              >
                搜索
              </AsyncButton>
              <AsyncButton onClick={onTableReset}>重置</AsyncButton>
              <AsyncButton
                type="link"
                onClick={() => {
                  setState({
                    isExpand: !state.isExpand,
                  })
                }}
              >
                {state.isExpand ? '收起' : '展开'}
                <DownOutlined rotate={state.isExpand ? 180 : 0} />
              </AsyncButton>
            </Space>
          </Row>
        </Form>
        <Divider style={{ margin: 0 }} />
      </>
    )
  }

  const renderTitle = (titleData: RecordType[]) => {
    if (!title && !showTools) {
      return null
    }

    return (
      <Row justify="space-between">
        <Col>{title && title(titleData)}</Col>
        {showTools && (
          <Col>
            <Tooltip title="刷新">
              <RedoOutlined
                onClick={() => refresh()}
                spin={state.loading}
                style={{
                  fontSize: 18,
                }}
              />
            </Tooltip>
          </Col>
        )}
      </Row>
    )
  }

  useEffect(() => {
    onSearch()
  }, [])

  useImperativeHandle(ref, () => ({
    refresh,
  }))

  return (
    <div>
      {renderSearchColumns()}
      <AntdTable<RecordType>
        {...props}
        tableLayout="auto"
        scroll={{
          scrollToFirstRowOnChange: true,
          x: 'max-content',
          y: height,
          ...scroll,
        }}
        columns={renderColumns()}
        onChange={onChange}
        loading={state.loading}
        dataSource={get(state.data, dataName)}
        pagination={
          pagination === false
            ? pagination
            : {
                // Hide if single page
                hideOnSinglePage: true,
                showSizeChanger: false,
                showTotal: (total) => `共 ${total} 条`,
                total: get(state.data, totalName),
                current: state.pageNum,
                pageSize,
                ...pagination,
              }
        }
        title={renderTitle}
      />
    </div>
  )
}

export default forwardRef(Table) as <RecordType extends object>(
  p: TableProps<RecordType> & { ref?: Ref<TableRef> }
) => ReactElement
