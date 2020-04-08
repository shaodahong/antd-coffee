import React from 'react'
import Modal, { ModalProps } from 'antd/lib/modal'
import { Table, TableProps } from 'ant-design-admin'

export interface ModalTablePorps<RecordType> extends ModalProps {
  tableProps: TableProps<RecordType>
}

export default function ModalTable<RecordType extends object>({
  tableProps,
  ...props
}: ModalTablePorps<RecordType>) {
  return (
    <Modal footer={null} {...props}>
      <Table<RecordType> {...tableProps} />
    </Modal>
  )
}
