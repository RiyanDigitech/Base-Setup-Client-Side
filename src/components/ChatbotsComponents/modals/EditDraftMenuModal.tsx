// components/ChatbotsComponents/modals/EditDraftMenuModal.tsx
import React from "react";
import { Modal, Input } from "antd";

interface Props {
  visible: boolean;
  editDraftMenu: { id: number | null; name: string; key: number | string };
  setEditDraftMenu: (menu: any) => void;
  onOk: () => void;
  onCancel: () => void;
}
//ko
const EditDraftMenuModal: React.FC<Props> = ({
  visible,
  editDraftMenu,
  setEditDraftMenu,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      title="Edit Draft Menu"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Update"
      cancelText="Cancel"
    >
      <Input
        placeholder="Menu Name"
        className="mb-4"
        value={editDraftMenu.name}
        onChange={(e) => setEditDraftMenu({ ...editDraftMenu, name: e.target.value })}
      />
      <Input
        placeholder="Menu Key"
        type="number"
        value={editDraftMenu.key}
        onChange={(e) => setEditDraftMenu({ ...editDraftMenu, key: e.target.value })}
      />
    </Modal>
  );
};

export default EditDraftMenuModal;
