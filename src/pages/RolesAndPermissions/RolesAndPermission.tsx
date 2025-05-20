import React, { useState, useMemo } from 'react';
import {
  Card,
  Button,
  Input,
  List,
  message,
  Row,
  Col,
  Alert,
  Spin,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CreateRoleModal from '@/components/RoleComponents/CreateRoleModal';
import PermissionModal from '@/components/RoleComponents/PermissionModal';
import { useRoles } from '@/services/authService/AuthService';


const RolePermissionUI: React.FC = () => {

  const {
    data: fetchedRoles = [],      
    isLoading,
    isError,
    error,
  } = useRoles();


  const [extraRoles, setExtraRoles] = useState<string[]>([]);      
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [rolePermissions, setRolePermissions] =
    useState<Record<string, any>>({});

  
  const allRoleNames = useMemo(() => {
    const remote = fetchedRoles.map(r => r.name);
    return Array.from(new Set([...remote, ...extraRoles])); // dedupe
  }, [fetchedRoles, extraRoles]);

  const displayedRoles = useMemo(
    () =>
      allRoleNames.filter(r =>
        r.toLowerCase().includes(search.toLowerCase()),
      ),
    [allRoleNames, search],
  );


  const handleAddRole = (role: string) => {
    if (allRoleNames.includes(role)) {
      message.warning('Role already exists');
      return;
    }
    setExtraRoles(prev => [...prev, role]);
    message.success('Role added successfully');
  };

  const handleSavePermissions = (role: string, permissions: any) => {
    setRolePermissions(prev => ({ ...prev, [role]: permissions }));
    message.success('Permissions saved successfully');
  };


  if (isLoading) return <Spin />;
  if (isError) return <Alert type="error" message={String(error)} />;

  return (
    <Card title="Role & Permission Management" className="mt-3">

      <Row className="mb-4 gap-2" justify="space-between" align="middle">
        <Col flex="1 1 300px">
          <Input
            placeholder="Search roles..."
            prefix={<SearchOutlined />}
            allowClear
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="
              !border-gray-300
              hover:!border-green-600
              focus:!border-green-600
              focus:!ring-0
              transition-colors
            "
          />
        </Col>

        <Col>
          <Button
            onClick={() => setShowRoleModal(true)}
            className="!bg-green-600 !text-white !font-medium !py-2 rounded-md hover:!bg-green-700 !transition !duration-300 lg:mt-0 md:mt-0 sm:mt-0 mt-1"
          >
            + Create Role
          </Button>
        </Col>
      </Row>

      {/* list ---------------------------------------------------------- */}
      <List
        bordered
        locale={{ emptyText: 'No roles found' }}
        dataSource={displayedRoles}
        renderItem={role => (
          <List.Item
            actions={[
              <Button
                key="perm"
                onClick={() => {
                  setSelectedRole(role);
                  setShowPermissionModal(true);
                }}
                className="!bg-green-600 !text-white hover:!bg-green-700"
              >
                {rolePermissions[role]
                  ? 'Edit Permissions'
                  : 'Assign Permissions'}
              </Button>,
            ]}
          >
            {role}
          </List.Item>
        )}
      />

      {/* modals -------------------------------------------------------- */}
      <CreateRoleModal
        visible={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onCreate={handleAddRole}
      />

      <PermissionModal
        visible={showPermissionModal}
        role={selectedRole}
        existingPermissions={
          selectedRole ? rolePermissions[selectedRole] : null
        }
        onClose={() => setShowPermissionModal(false)}
        onSave={handleSavePermissions}
      />
    </Card>
  );
};

export default RolePermissionUI;
