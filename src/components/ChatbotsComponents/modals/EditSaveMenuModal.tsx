import React from "react";
import { Modal, Input } from "antd";

interface Props {
  visible: boolean;
  editSavedMenu: { id: number | null; name: string; key: number | string };
  setEditSavedMenu: (menu: any) => void;
  onOk: () => void;
  onCancel: () => void;
}

const EditSavedMenuModal: React.FC<Props> = ({
  visible,
  editSavedMenu,
  setEditSavedMenu,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      title="Edit Saved Menu"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Update"
      cancelText="Cancel"
      okButtonProps={{
        className: "bg-green-700 text-white hover:!bg-green-500",
      }}
    >
      <Input
        placeholder="Menu Name"
        className="mb-4"
        value={editSavedMenu.name}
        onChange={(e) =>
          setEditSavedMenu({ ...editSavedMenu, name: e.target.value })
        }
      />
      <Input
        placeholder="Menu Key"
        type="number"
        value={editSavedMenu.key}
        onChange={(e) =>
          setEditSavedMenu({ ...editSavedMenu, key: e.target.value })
        }
      />
    </Modal>
  );
};

export default EditSavedMenuModal;
