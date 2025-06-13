// components/UserComponents/AssignRoleModal.tsx
import React, { useEffect, useState } from 'react';
import { Modal, Radio, Spin } from 'antd';
import '../../Css/Ratio.css'
import { useRoles } from '@/services/Role&PermissionService/Roles&PermissionService';

interface AssignRoleModalProps {
  visible: boolean;
  onClose: () => void;
  onAssign: (roleId: number) => void;
  defaultSelected?: number; // Single pre-selected role ID
  loading?: boolean;
}

const AssignRoleModal: React.FC<AssignRoleModalProps> = ({
  visible,
  onClose,
  onAssign,
  defaultSelected,
  loading = false,
}) => {
  const { data, isLoading: rolesLoading } = useRoles();
  const roles = data?.data ?? [];
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  useEffect(() => {
    if (visible) {
      setSelectedRole(defaultSelected ?? null);
    }
  }, [defaultSelected, visible]);

  const handleOk = () => {
    if (selectedRole !== null) {
      onAssign(selectedRole);
    }
  };

  return (
    <Modal
      title="Assign Role"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Assign"
      cancelText="Cancel"
      okButtonProps={{
        className: 'bg-green-700 text-white hover:!bg-green-600',
        loading,
        disabled: selectedRole === null || loading,
      }}
      cancelButtonProps={{
        className: 'bg-red-700 text-white hover:!bg-red-600',
      }}
    >
      {rolesLoading ? (
        <div className="flex justify-center py-6">
          <Spin />
        </div>
      ) : (
        <Radio.Group
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="flex flex-col gap-2"
        >
          {roles.map((role) => (
            <Radio  key={role.id} value={role.id}>
              {role.name}
            </Radio>
          ))}
        </Radio.Group>
      )}
    </Modal>
  );
};

export default AssignRoleModal;
