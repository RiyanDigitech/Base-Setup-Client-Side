import React, { useEffect, useState } from "react";
import { Modal, Checkbox, Spin, message } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchAllPermissions } from "@/services/Role&PermissionService/Roles&PermissionService";


interface Permission {
  id: number;
  name: string;
  parent_id: number | null;
  children?: Permission[];
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
        <div className="space-y-4">
  {allPermissions.map((parent) => (
    <div key={parent.id} className="pl-1">
      <Checkbox
        checked={parent.children?.length
          ? parent.children.every((child) => selectedPermissions.includes(child.id))
          : selectedPermissions.includes(parent.id)}
        indeterminate={
          parent.children?.length
            ? parent.children.some((child) => selectedPermissions.includes(child.id)) &&
              !parent.children.every((child) => selectedPermissions.includes(child.id))
            : false
        }
        onChange={(e) => {
          if (parent.children?.length) {
            const childIds = parent.children.map((child) => child.id);
            if (e.target.checked) {
              setSelectedPermissions((prev) => [...new Set([...prev, ...childIds])]);
            } else {
              setSelectedPermissions((prev) => prev.filter((id) => !childIds.includes(id)));
            }
          } else {
            togglePermission(parent.id);
          }
        }}
      >
        {parent.name}
      </Checkbox>

      {/* Child checkboxes (if any) */}
      {Array.isArray(parent.children) && parent.children.length && (
        <div className="pl-6 space-y-1">
          {parent.children?.map((child) => (
            <Checkbox
              key={child.id}
              checked={selectedPermissions.includes(child.id)}
              onChange={() => togglePermission(child.id)}
            >
              {child.name}
            </Checkbox>
          ))}
        </div>
      )}
    </div>
  ))}
</div>

        </Spin>
    </Modal>
  );
};

export default PermissionModal;
