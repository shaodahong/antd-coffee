import React, { FC, MouseEventHandler } from 'react'
import AntdTable, { TableProps as AntdTableProps } from 'antd/lib/table'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import { useForm } from 'antd/lib/form/util'
import Form, { FormProps } from '../form'
import { isFunc } from '../utils/is'
import { Func } from '../utils/type'
import AsyncButton from '../async-button'

export interface TableSearchProps extends FormProps {}

export interface TableProps<RecordType> extends AntdTableProps<RecordType> {
  searchProps?: TableSearchProps
}

export default function Table<RecordType extends object>({
  searchProps,
  ...props
}: TableProps<RecordType>) {
  const [form] = useForm()

  const onTableSearch = () => {}

  const onTableReset = () => {}

  return (
    <div>
      {searchProps && (
        <Form form={form} {...searchProps}>
          <Row>
            <Col>
              <AsyncButton onClick={onTableSearch}>搜索</AsyncButton>
            </Col>
            <Col>
              <AsyncButton onClick={onTableReset}>重置</AsyncButton>
            </Col>
          </Row>
        </Form>
      )}
      <AntdTable<RecordType> {...props} />
    </div>
  )
}
