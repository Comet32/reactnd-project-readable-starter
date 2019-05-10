import { Modal } from 'antd'

const confirm = Modal.confirm

export default function deleteConfirm(id, handleOk, pID) {
  confirm({
    title: '确定删除？',
    okText: '确定',
    cancelText: '取消',
    onOk() {
      handleOk(id, pID)
    }
  })
}
