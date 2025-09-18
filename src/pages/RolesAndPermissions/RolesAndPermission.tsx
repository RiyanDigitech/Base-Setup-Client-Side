import React, { useRef, useState } from 'react';
import {
  Card,
  Button,
  Input,
  message,
  Row,
  Col,
  Alert,
  Spin,
  Table,
  Menu,
  Dropdown,
  Modal,
} from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import CreateRoleModal, { CreateRoleModalRef } from '@/components/RoleComponents/CreateRoleModal';
import PermissionModal from '@/components/RoleComponents/PermissionModal';
import { assignPermissionsToRole, useCreateRole, useDeleteRole, useRoles, useUpdateRole } from '@/services/Role&PermissionService/Roles&PermissionService';
import { useDebounce } from 'use-debounce';
import "../../Css/Spin.css"
import EditRoleModal from '@/components/RoleComponents/EditRoleModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const RolePermissionUI: React.FC = () => {
     
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
const [roleToEdit, setRoleToEdit] = useState<{ id: number; name: string } | null>(null);
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(15);


  const [rolePermissions, setRolePermissions] =
    useState<Record<string, any>>({});
   const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 400);
   const {
  data,
  isFetching,
  isError,
  error,
} = useRoles(debouncedSearch, currentPage, pageSize);
const fetchedRoles = data?.data ?? [];
const total = data?.total ?? 0;
  const modalRef = useRef<CreateRoleModalRef>(null);
  const { mutate: deleteRoleMutation } = useDeleteRole();
  const { mutate: updateRoleMutation, isPending: isUpdatingRole } = useUpdateRole(() => setEditModalVisible(false));
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
  mutationFn: assignPermissionsToRole,
  onMutate: () => setLoading(true),
  onSuccess: () => {
    message.success("Permissions assigned successfully");
    setLoading(false);
    setShowPermissionModal(false); 
    queryClient.invalidateQueries({ queryKey: ['roles'] });
  },
  onError: () => {
    message.error("Failed to assign permissions");
    setLoading(false);
  },
});


  const { mutate: createRoleMutation, isPending: isCreatingRole } = useCreateRole(() => {
    setShowRoleModal(false);
    modalRef.current?.resetForm();
  });

  const handleAddRole = (role: string) => {
    createRoleMutation(role);
  };


const handleSavePermissions = (roleId: number, permissionIds: number[]) => {
  const roleObj = fetchedRoles.find((role) => role.id === roleId);
  if (!roleObj) {
    message.error("Role not found");
    return;
  }

  mutate({
    roleId,
    permissions: permissionIds,
  });

  setRolePermissions((prev) => ({ ...prev, [roleObj.name]: permissionIds }));
};
  const inputBaseClass =
    "mb-1 focus:border-green-600 hover:border-green-600 focus:ring-green-600";

  const errorTextClass = "text-red-500 text-xs mb-2";


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
             loading={isCreatingRole}
            className="!bg-green-600 !text-white !font-medium !py-2 rounded-md hover:!bg-green-700 !transition !duration-300 lg:mt-0 md:mt-0 sm:mt-0 mt-1"
          >
            + Create Role
          </Button>
        </Col>
      </Row>

      {/* list ---------------------------------------------------------- */}
      <Spin
  style={{ color: '#15803D' }}
  className="custom-green-spin"
  spinning={isFetching}
>
  {isError ? (
    <Alert
      type="error"
      message="Failed to load roles"
      description={String(error)}
      showIcon
      className="mb-4"
    />
  ) : (
    <Table
  rowKey={(record) => record.id}
  loading={isFetching}
  dataSource={fetchedRoles}
  className="overflow-auto"
  scroll={{ x: 'max-content' }}
  pagination={{
    current: currentPage,
    pageSize,
    total,
    onChange: (page, size) => {
      setCurrentPage(page);
      setPageSize(size);
    },
  }}
  columns={[
    {
    title: 'S.No.',
    key: 'index',
    sorter: () => 0,
    render: (_text, _record, index) => (currentPage - 1) * pageSize + index + 1,
  },
    {
      title: 'Role',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a:any, b:any) => a.created_at.localeCompare(b.created_at),
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      sorter: (a:any, b:any) => a.updated_at.localeCompare(b.updated_at),
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
       render: (_, record) => {
    const menu = (
      <Menu>
        <Menu.Item
          key="edit"
          icon={<EditOutlined />}
         onClick={() => {
    setRoleToEdit({ id: record.id, name: record.name });
    setEditModalVisible(true);
  }}
        >
          Edit
        </Menu.Item>
        <Menu.Item
  key="delete"
  icon={<DeleteOutlined />}
  danger
  onClick={() => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: `Are you sure you want to delete the role "${record.name}"?`,
      okText: "Yes",
      cancelText: "No",
      okButtonProps: {
        className: "bg-green-600 text-white hover:!bg-green-700",
      },
      onOk: () =>
        new Promise((resolve, reject) => {
          deleteRoleMutation(record.id, {
            onSuccess: () => {
              resolve(null);
            },
            onError: (error) => {
              reject(error);
            },
          });
        }),
    });
  }}
>
  Delete
</Menu.Item>

        <Menu.Item
          key="assign"
          icon={<SettingOutlined />}
          onClick={() => {
            setSelectedRole(record.name);
            setShowPermissionModal(true);
          }}
        >
          Assign Permissions
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <Button className='!text-black' icon={<MoreOutlined />}  />
      </Dropdown>
    );
  },
    },
  ]}
/>
  )}
</Spin>

      {/* modals -------------------------------------------------------- */}
      <CreateRoleModal
        ref={modalRef}
        visible={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onCreate={handleAddRole}
         isLoading={isCreatingRole}
      />

      <PermissionModal
  visible={showPermissionModal}
  roleId={
    selectedRole
      ? fetchedRoles.find((r) => r.name === selectedRole)?.id ?? null
      : null
  }
  existingPermissions={
    selectedRole
      ? fetchedRoles
          .find((r) => r.name === selectedRole)
          ?.permissions.map((p) => p.id) ?? []
      : []
  }
  onClose={() => setShowPermissionModal(false)}
  onSave={handleSavePermissions}
  loading={loading}
/>

      <EditRoleModal
  visible={editModalVisible}
  onClose={() => setEditModalVisible(false)}
  onSubmit={(data) => updateRoleMutation(data)}
  isUpdating={isUpdatingRole}
  role={roleToEdit}
/>
    </Card>
  );
};

export default RolePermissionUI;
