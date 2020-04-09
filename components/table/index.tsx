import React, { useState, useEffect } from 'react'
import AntdTable, { TableProps as AntdTableProps } from 'antd/lib/table'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Space from 'antd/lib/space'
import Divider from 'antd/lib/divider'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import get from 'lodash/get'
import { useForm } from 'antd/lib/form/util'
import Form, { FormProps } from '../form'
import AsyncButton from '../async-button'

// export interface TableSearchProps extends FormProps {}

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
}

export interface TableData<RecordType> {
  data: RecordType[]
  [key: string]: any
}

export interface TableProps<RecordType>
  extends AntdTableProps<RecordType>,
    TablePaginationName {
  searchProps?: FormProps
  onSearch: (
    params: any
  ) => TableData<RecordType> | Promise<TableData<RecordType>>
}

export default function Table<RecordType extends object>({
  searchProps,
  onSearch: onTableSearch,
  pagination,
  totalName = 'total',
  pageSizeName = 'pageSize',
  pageNumName = 'pageNum',
  ...props
}: TableProps<RecordType>) {
  const [form] = useForm()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<TableData<RecordType>>()

  // get data source
  const onSearch = async () => {
    try {
      setLoading(true)
      const params = await form.getFieldsValue()
      const result = await onTableSearch(params)
      setData(result)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      setLoading(false)
    }
  }

  const onClickSearch = () => {
    return onSearch()
  }

  const onTableReset = () => {
    form.resetFields()
    return onSearch()
  }

  useEffect(() => {
    onSearch()
  }, [])

  return (
    <div>
      {searchProps && (
        <>
          <Form form={form} layoutCol={{ span: 6 }} {...searchProps}>
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
              </Space>
            </Row>
          </Form>
          <Divider />
        </>
      )}
      <AntdTable<RecordType>
        {...props}
        loading={loading}
        dataSource={data?.data}
        pagination={{
          // Hide if single page
          hideOnSinglePage: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
          total: get(data, totalName),
          current: get(data, pageNumName),
          pageSize: get(data, pageSizeName, 10),
          ...pagination,
        }}
      />
    </div>
  )
}
