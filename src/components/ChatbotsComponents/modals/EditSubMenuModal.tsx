// components/ChatbotsComponents/modals/EditSubMenuModal.tsx
import React from "react";
import { Modal, Input } from "antd";

interface Props {
  visible: boolean;
  editItem: {
    menuId: number | null;
    id: number | null;
    name: string;
    type: string;
  };
  setEditItem: (item: any) => void;
  onOk: () => void;
  onCancel: () => void;
}

const EditSubMenuModal: React.FC<Props> = ({
  visible,
  editItem,
  setEditItem,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      title="Edit Submenu"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{ className: "bg-green-700 text-white hover:!bg-green-500" }}
    >
      <div className="space-y-4">
        <Input
          value={editItem.name}
          onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          placeholder="Enter Name"
        />
        {editItem.type === "submenu" && (
          <Input
            value={editItem.id ?? ""}
            onChange={(e) => setEditItem({ ...editItem, id: Number(e.target.value) })}
            placeholder="Enter ID"
          />
        )}
      </div>
    </Modal>
  );
};

export default EditSubMenuModal;
