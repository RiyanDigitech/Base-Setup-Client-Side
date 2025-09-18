import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Input } from "antd";

export type CreateRoleModalRef = {
  resetForm: () => void;
};

interface Props {
  visible: boolean;
  onClose: () => void;
  onCreate: (role: string) => void;
  isLoading?: boolean;
}

const CreateRoleModal = forwardRef<CreateRoleModalRef, Props>(
  ({ visible, onClose, onCreate, isLoading }, ref) => {
    const [roleName, setRoleName] = useState("");
    const [error, setError] = useState<string | null>(null);

    // Expose reset function to parent
    useImperativeHandle(ref, () => ({
      resetForm: () => {
        setRoleName("");
        setError(null);
      },
    }));

    const handleOk = () => {
      if (roleName.trim() === "") {
        setError("Role name is required");
        return;
      }

      onCreate(roleName.trim());
    };

    const handleBlur = () => {
      if (roleName.trim() === "") {
        setError("Role name is required");
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setRoleName(value);
      if (value.trim() !== "") setError(null);
    };

    const inputBaseClass =
      "mb-1 focus:border-green-600 hover:border-green-600 focus:ring-green-600";
    const errorTextClass = "text-red-500 text-xs mb-2";

    return (
      <Modal
        title="Create New Role"
        visible={visible}
        onOk={handleOk}
        onCancel={onClose}
        confirmLoading={isLoading}
        okText="Add"
        okButtonProps={{
          className: "bg-green-700 text-white hover:!bg-green-500",
        }}
        cancelButtonProps={{
          className: "bg-red-700 text-white hover:!bg-red-500",
        }}
      >
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
  }
);

export default CreateRoleModal;
