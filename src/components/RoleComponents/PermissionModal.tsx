import React, { useEffect, useState } from "react";
import { Modal, Checkbox, Spin, message } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchAllPermissions } from "@/services/Role&PermissionService/Roles&PermissionService";


interface Permission {
  id: number;
  name: string;
}

interface Props {
  visible: boolean;
  roleId: number | null;
  existingPermissions: number[];
  onClose: () => void;
  onSave: (roleId: number, permissions: number[]) => void;
  loading: boolean;
}

const PermissionModal: React.FC<Props> = ({
  visible,
  roleId,
  existingPermissions,
  onClose,
  onSave,
  loading,
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const { data: allPermissions = [], isFetching, isError } = useQuery<Permission[]>({
    queryKey: ["permissions"],
    queryFn: fetchAllPermissions,
    enabled: visible,
  });

  useEffect(() => {
  if (visible && existingPermissions) {
    setSelectedPermissions(existingPermissions);
  }
}, [visible, existingPermissions]);

  const togglePermission = (id: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleOk = () => {
    if (roleId !== null) {
      onSave(roleId, selectedPermissions);
    }
  };

  if (isError) {
    message.error("Failed to fetch permissions.");
  }

  return (
    <Modal
      title={`Set Permissions`}
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Save"
      confirmLoading={loading}
      okButtonProps={{
        className: "bg-green-700 text-white hover:!bg-green-500",
      }}
      cancelButtonProps={{
        className: "bg-red-700 text-white hover:!bg-red-500",
      }}
    >
     <Spin
     spinning={isFetching}
     className="custom-green-spin"
     >
        <div className="flex flex-wrap gap-4">
          {allPermissions.map((perm) => (
            <Checkbox
              key={perm.id}
              checked={selectedPermissions.includes(perm.id)}
              onChange={() => togglePermission(perm.id)}
            >
              {perm.name}
            </Checkbox>
          ))}
        </div>
        </Spin>
    </Modal>
  );
};

export default PermissionModal;
