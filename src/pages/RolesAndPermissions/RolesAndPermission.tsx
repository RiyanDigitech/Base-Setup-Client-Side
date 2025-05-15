import React, { useState } from "react";
import { Card, Button, Modal, Input, List, message } from "antd";
import CreateRoleModal from "@/components/RoleComponents/CreateRoleModal";
import PermissionModal from "@/components/RoleComponents/PermissionModal";


const RolePermissionUI: React.FC = () => {
  const [roles, setRoles] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [rolePermissions, setRolePermissions] = useState<Record<string, any>>({});

  const handleAddRole = (role: string) => {
    if (roles.includes(role)) {
      message.warning("Role already exists");
      return;
    }
    setRoles([...roles, role]);
    message.success("Role added successfully");
  };

  const handleSavePermissions = (role: string, permissions: any) => {
    setRolePermissions((prev) => ({
      ...prev,
      [role]: permissions,
    }));
    message.success("Permissions saved successfully");
  };

  return (
    <Card title="Role & Permission Management" className="mt-3">
      <Button className="!bg-green-600 mb-4 !text-white !font-medium !py-2 rounded-md hover:!bg-green-700 !transition !duration-300" onClick={() => setShowRoleModal(true)} >
        + Create Role
      </Button>

      <List
        bordered
        dataSource={roles}
        renderItem={(role) => (
          <List.Item
            actions={[
              <Button
                onClick={() => {
                  setSelectedRole(role);
                  setShowPermissionModal(true);
                }}
                className="!bg-green-600 !text-white hover:!bg-green-700 "
              >
                {rolePermissions[role] ? "Edit Permissions" : "Assign Permissions"}
              </Button>,
            ]}
          >
            {role}
          </List.Item>
        )}
      />

      <CreateRoleModal
        visible={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onCreate={handleAddRole}
      />

      <PermissionModal
        visible={showPermissionModal}
        role={selectedRole}
        existingPermissions={selectedRole ? rolePermissions[selectedRole] : null}
        onClose={() => setShowPermissionModal(false)}
        onSave={handleSavePermissions}
      />
    </Card>
  );
};

export default RolePermissionUI;
