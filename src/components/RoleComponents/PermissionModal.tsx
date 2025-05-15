import React, { useState, useEffect } from "react";
import { Modal, Checkbox, Divider } from "antd";

const modules = ["Dashboard", "Users", "Settings"];

const nestedPermissions = ["Add", "Edit", "Delete"];

interface Props {
  visible: boolean;
  role: string | null;
  existingPermissions: any;
  onClose: () => void;
  onSave: (role: string, permissions: any) => void;
}

const PermissionModal: React.FC<Props> = ({ visible, role, existingPermissions, onClose, onSave }) => {
  const [permissions, setPermissions] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (existingPermissions) {
      setPermissions(existingPermissions);
    } else {
      setPermissions({});
    }
  }, [existingPermissions, role]);

  const toggleNestedPermission = (module: string, perm: string) => {
  setPermissions((prev) => {
    const current = prev[module] || [];
    const updated = current.includes(perm)
      ? current.filter((p) => p !== perm)
      : [...current, perm];

    return {
      ...prev,
      [module]: updated,
    };
  });
};


  const handleOk = () => {
    if (role) {
      onSave(role, permissions);
      onClose();
    }
  };

  return (
    <Modal
      title={`Set Permissions for ${role}`}
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Save"
      okButtonProps={{
        className: "bg-green-700 text-white hover:!bg-green-500",
      }}
      cancelButtonProps={{
        className: "bg-red-700 text-white hover:!bg-red-500",
      }}    
    >
      {modules.map((module) => (
        <div key={module} className="mb-4">
          <strong>{module}</strong>
          <Divider />
         <div className="flex gap-4">
  {nestedPermissions.map((perm) => (
    <Checkbox
      key={perm}
      checked={permissions[module]?.includes(perm)}
      onChange={() => toggleNestedPermission(module, perm)}
    >
      {perm}
    </Checkbox>
  ))}
</div>
        </div>
      ))}
    </Modal>
  );
};

export default PermissionModal;
