import React from 'react'
import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import Table, { TableProps } from '../table'
import useWindowSize from '../table/useWindowSize'

export interface ModalTablePorps<RecordType> extends ModalProps {
  tableProps: TableProps<RecordType>
}

// eslint-disable-next-line @typescript-eslint/ban-types
export default function ModalTable<RecordType extends object>({
  tableProps,
  ...props
}: ModalTablePorps<RecordType>) {
  const { height } = useWindowSize()
  return (
    <Modal
      footer={null}
      destroyOnClose
      {...props}
      bodyStyle={{
        maxHeight: height,
        overflow: 'auto',
      }}
    >
      <Table<RecordType> scroll={{ y: undefined }} {...tableProps} />
    </Modal>
  )
}
