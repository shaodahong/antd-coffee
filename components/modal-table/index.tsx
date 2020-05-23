import React from 'react'
import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import Table, { TableProps } from '../table'

export interface ModalTablePorps<RecordType> extends ModalProps {
  tableProps: TableProps<RecordType>
}

// eslint-disable-next-line @typescript-eslint/ban-types
export default function ModalTable<RecordType extends object>({
  tableProps,
  ...props
}: ModalTablePorps<RecordType>) {
  return (
    <Modal footer={null} destroyOnClose {...props}>
      <Table<RecordType> {...tableProps} />
    </Modal>
  )
}
