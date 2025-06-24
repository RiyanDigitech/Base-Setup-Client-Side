import React, { useState } from "react";
import { Modal, Input } from "antd";

interface Props {
  visible: boolean;
  onClose: () => void;
  onCreate: (role: string) => void;
  isLoading?: boolean;
}

const CreateRoleModal: React.FC<Props> = ({ visible, onClose, onCreate, isLoading }) => {
  const [roleName, setRoleName] = useState("");
  const [error, setError] = useState<string | null>(null);


  const handleOk = () => {
    if (roleName.trim() === "") {
    setError("Role name is required");
    return;
  }

  onCreate(roleName.trim());
  setRoleName("");
  setError(null);
  };
    const handleBlur = () => {
    if (roleName.trim() === "") {
      setError("Role name is required");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRoleName(value);

    if (value.trim() !== "") {
      setError(null); // Clear error if input is valid
    }
  };
  const inputBaseClass =
    "mb-1 focus:border-green-600 hover:border-green-600 focus:ring-green-600";

  const errorTextClass = "text-red-500 text-xs mb-2";
  return (
    <Modal title="Create New Role" visible={visible} onOk={handleOk} onCancel={onClose}
    confirmLoading={isLoading}
    okText="Add" okButtonProps={{
        className: "bg-green-700 text-white hover:!bg-green-500",
      }}
      cancelButtonProps={{
        className: "bg-red-700 text-white hover:!bg-red-500",
      }}>
      <Input
        placeholder="Enter role name"
        value={roleName}
         status={error ? "error" : ""}
         onBlur={handleBlur}
         onChange={handleChange}
        className={inputBaseClass} 
      />
      {error && <div className={errorTextClass}>{error}</div>}
    </Modal>
  );
};

export default CreateRoleModal;
