import { Alert, Button, Card, Col, Dropdown, Input, Menu, Modal, Row, Spin, Table } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import { useDebounce } from 'use-debounce';
import { useAssignRoleToUser, useCreateUser, useDeleteUser, useUpdateUser, useUsers } from '@/services/userservice/UserService';
import EditUserModal from '@/components/UserComponent/EditUserModal';
import CreateUserModal from '@/components/UserComponent/CreateUserModal';
import AssignRoleModal from '@/components/UserComponent/AssignRoleModal';

const UserManagement:React.FC = () => {
      const [showUserModal, setShowUserModal] = useState(false);
      const [editModalVisible, setEditModalVisible] = useState(false);
      const [showAssignRoleModal, setShowAssignRoleModal] = useState(false);
      const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
        const [selectedUserRoleId, setSelectedUserRoleId] = useState<number | undefined>(undefined);
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize, setPageSize] = useState(15);


        const getuserPermission = localStorage.getItem('userdetails')
         const userPermission = JSON.parse(getuserPermission)
         console.log("User Permissions Console" , userPermission.permissions)

const [userToEdit, setUserToEdit] = useState<{
  id: number;
  name: string;
  email: string;
  phone: string;
  password?: string;
} | null>(null);
    
       const [search, setSearch] = useState('');
      const [debouncedSearch] = useDebounce(search, 400);
       const {
        data,
        isFetching,
        isError,
        error,
      } = useUsers(debouncedSearch, currentPage, pageSize);
      const fetchedUsers = data?.data ?? [];
const total = data?.total ?? 0;
    
      const { mutate: deleteUserMutation } = useDeleteUser();
      const { mutate: updateUserMutation, isPending: isUpdatingUser } = useUpdateUser(() => setEditModalVisible(false));
      const { mutate: createUserMutation, isPending: isCreatingUser } = useCreateUser(() => {
            setShowUserModal(false);
            });
            const { mutate: assignRoleMutation, isPending: isAssigning } = useAssignRoleToUser();


            const handleAddUser = (user: {
            name: string;
            email: string;
            phone: string;
            password: string;
            }) => {
            createUserMutation(user);
            };
            
            const handleAssignRoles = (roleId: number) => {
    if (!selectedUserId || !roleId) return;

    assignRoleMutation(
      { userId: selectedUserId, roleId },
      {
        onSuccess: () => {
          setShowAssignRoleModal(false);
          setSelectedUserId(null);
          setSelectedUserRoleId(undefined);
        },
      }
    );
  };

      return (
  <Card title="Users Management" className="mt-3">
  
        <Row className="mb-4 gap-2" justify="space-between" align="middle">
          <Col flex="1 1 300px">
            <Input
              placeholder="Search users..."
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
          {userPermission.permissions.includes("Create_User") && (
            <Button
              onClick={() => setShowUserModal(true)}
               loading={isCreatingUser}
              className="!bg-green-600 !text-white !font-medium !py-2 rounded-md hover:!bg-green-700 !transition !duration-300 lg:mt-0 md:mt-0 sm:mt-0 mt-1"
            >
              + Create User
            </Button>

            )}
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
        message="Failed to load Users"
        description={String(error)}
        showIcon
        className="mb-4"
      />
    ) : (
      <Table
    rowKey={(record) => record.id}
  loading={isFetching}
  dataSource={fetchedUsers}
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
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Actions',
        key: 'actions',
         render: (_, record) => {
      const menu = (
        <Menu>
          {userPermission.permissions.includes("Update_User") && (
          <Menu.Item
            key="edit"
            icon={<EditOutlined />}
           onClick={() => {
  setUserToEdit({
    id: record.id,
    name: record.name,
    email: record.email,
    phone: record.phone,
  });
  setEditModalVisible(true);
}}
          >
            Edit
          </Menu.Item>
          )}
          {userPermission.permissions.includes("Delete_User") && (
          <Menu.Item
    key="delete"
    icon={<DeleteOutlined />}
    danger
    onClick={() => {
      Modal.confirm({
        title: "Confirm Deletion",
        content: `Are you sure you want to delete the user "${record.name}"?`,
        okText: "Yes",
        cancelText: "No",
        okButtonProps: {
          className: "bg-green-600 text-white hover:!bg-green-700",
        },
        onOk: () =>
          new Promise((resolve, reject) => {
            deleteUserMutation(record.id, {
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
  )}
  
          <Menu.Item
            key="assign"
            icon={<SettingOutlined />} 
              onClick={() => {
                          setSelectedUserId(record.id);
                          setSelectedUserRoleId(record.roles?.[0]?.id);
                          setShowAssignRoleModal(true);
                        }}
          >
            Assign Role
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
        <CreateUserModal
          visible={showUserModal}
          onClose={() => setShowUserModal(false)}
          onCreate={handleAddUser}
          
        />
  
        <EditUserModal
    visible={editModalVisible}
    onClose={() => setEditModalVisible(false)}
    onSubmit={(data) => updateUserMutation(data)}
    isUpdating={isUpdatingUser}
    user={userToEdit}
  />
  <AssignRoleModal
  visible={showAssignRoleModal}
  onClose={() => setShowAssignRoleModal(false)}
  onAssign={handleAssignRoles}
  defaultSelected={selectedUserRoleId}
  loading={isAssigning}
/>

      </Card>
    );
  };
  

export default UserManagement