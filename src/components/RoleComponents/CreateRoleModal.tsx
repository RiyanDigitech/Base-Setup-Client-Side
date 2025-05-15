import React, { useState } from "react";
import { Modal, Input } from "antd";

interface Props {
  visible: boolean;
  onClose: () => void;
  onCreate: (role: string) => void;
}

const CreateRoleModal: React.FC<Props> = ({ visible, onClose, onCreate }) => {
  const [roleName, setRoleName] = useState("");

  const handleOk = () => {
    if (roleName.trim() === "") return;
    onCreate(roleName.trim());
    setRoleName("");
    onClose();
  };

  return (
    <Modal title="Create New Role" visible={visible} onOk={handleOk} onCancel={onClose} okText="Add" okButtonProps={{
        className: "bg-green-700 text-white hover:!bg-green-500",
      }}
      cancelButtonProps={{
        className: "bg-red-700 text-white hover:!bg-red-500",
      }}>
      <Input
        placeholder="Enter role name"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
      />
    </Modal>
  );
};

export default CreateRoleModal;
