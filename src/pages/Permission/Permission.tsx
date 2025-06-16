import { useMemo, useState } from "react";
import {
  Table, Button, Modal, Input, Form, Dropdown, Menu, Spin, message
} from "antd";
import '../../Css/Spin.css';
import {
  PlusOutlined, EditOutlined, DeleteOutlined, MoreOutlined,
  AlignLeftOutlined
} from "@ant-design/icons";
import {
  useMutation, useQuery, useQueryClient
} from "@tanstack/react-query";
import { debounce } from 'lodash';
import {
  AddActionPermission,
  addPermission, deletePermission, searchPermission, updatePermission
} from "@/services/PermissionServices/PermissionService";



function Permission() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalAddAction, setIsModalAddAction] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [editRecord, setEditRecord] = useState<any>(null);
  const [editName, setEditName] = useState("");
  const [actionName , setActionName] = useState("")

  const queryClient = useQueryClient();

  // Columns
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: any) => new Date(text).toLocaleString(),
    },
    {
      title: "Updated",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text: any) => new Date(text).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => {
        const menu = (
          <Menu>
           {!record.parent_id && (
            <Menu.Item
              key="addAction"
              icon={<AlignLeftOutlined />}
              onClick={() => {
                setIsModalAddAction(true)
                localStorage.setItem("PermissionParentId" , record.id)
              }}
            >
              Add Action
            </Menu.Item>
             )}
             
             <Menu.Item
              key="edit"
              icon={<EditOutlined />}
              onClick={() => {
                setEditRecord(record);
                setEditName(record.name);
                form.setFieldsValue({ name: record.name });
                setIsModalEditOpen(true);
              }}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              key="delete"
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDelete(record)}
            >
              Delete
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button className="!text-black" icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  // Debounce search input
  const debounceSearchInput = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 500),
    []
  );

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
    debounceSearchInput(e.target.value);
  };

  // GET
  const { data, isFetching } = useQuery({
    queryKey: ["permission", debouncedSearch],
    queryFn: () => searchPermission(debouncedSearch),
  });

  const getPermission = Array.isArray(data?.data) ? data?.data : [];
  const dataSources = getPermission.map((item: any) => ({
    ...item,
    key: item.id,
  }));

  // ADD
 const postPermission = useMutation({
  mutationFn: addPermission,
  onSuccess: () => {
    message.success("Permission added successfully");
    queryClient.invalidateQueries({ queryKey: ['permission'] });
    form.resetFields();
    // setPname("");
    setIsModalOpen(false);
  },
  onError: (error: any) => {
    const errormsg = error?.message || "Permission already exists or failed to add";
    message.error(errormsg);
  }
});

const postChildPermission = useMutation({
  mutationFn: AddActionPermission,
  onSuccess: () => {
    message.success("Action added successfully");
    queryClient.invalidateQueries({ queryKey: ['permission'] });
    form.resetFields();
    setActionName("")
    setIsModalAddAction(false);
  },
  onError: (error: any) => {
    const errormsg = error?.message || "Permission already exists or failed to add";
    message.error(errormsg);
  }
});


  const handleAddSubmit = (values: any) => {
    postPermission.mutate(values.name);
    console.log(values)
  };

 const handleAddActions = () => {
  const iidd = localStorage.getItem('PermissionParentId');
  const parent_id: number = Number(iidd);

  const name = String(actionName); // Force convert to string

  postChildPermission.mutate({ parent_id, name });
};


  // UPDATE
  const updatePermissionMutation = useMutation({
    mutationFn: updatePermission,
    onSuccess: () => {
      message.success("Permission updated successfully");
      queryClient.invalidateQueries({ queryKey: ["permission"] });
      form.resetFields();
      setIsModalEditOpen(false);
    },
    onError: (error: any) => {
      const errMsg =
        error?.response?.data?.message || "Failed to update permission";
      message.error(errMsg);
    },
  });

  const handleEditSubmit = () => {
    if (!editRecord) return;
    updatePermissionMutation.mutate({ id: editRecord.id, name: form.getFieldValue("name") });
  };

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deletePermission,
    onSuccess: () => {
      message.success("Permission deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["permission"] });
    },
    onError: (error: any) => {
      const errMsg =
        error?.response?.data?.message || "Failed to delete permission";
      message.error(errMsg);
    },
  });

  const handleDelete = (record: any) => {
    deleteMutation.mutate(Number(record.id));
  };

  return (
    <div className="p-6 bg-white min-h-screen mt-7">
      <h1 className="text-lg font-bold text-black mb-6">
        Permission Management
      </h1>

      <div className="flex items-center mb-4 flex-wrap gap-2">
        <Input
          placeholder="Search Permission"
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1 border !border-gray-300 hover:!border-gray-300 focus:!border-gray-300"
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          loading={postPermission.isPending}
          className="bg-green-700 hover:!bg-green-800"
          onClick={() => setIsModalOpen(true)}
        >
          Add Permission
        </Button>
      </div>

      <Spin spinning={isFetching} className="custom-green-spin" tip="Loading Data">
        <Table
          columns={columns}
          dataSource={dataSources}
          rowKey="id"
          scroll={{ x: "max-content" }}
        />
      </Spin>

      {/* Add Modal */}
      <Modal
        title="Add Permission"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddSubmit} layout="vertical">
          <Form.Item
            label="Permission Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input className="!border-gray-300 hover:!border-gray-300 focus:!border-gray-300 mt-3" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-green-700 mt-2 w-full hover:!bg-green-800"
            loading={postPermission.isPending}
          >
            Add Permission
          </Button>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Update Permission"
        open={isModalEditOpen}
        onCancel={() => setIsModalEditOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleEditSubmit} layout="vertical">
          <Form.Item
            label="Permission Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input
              value={editName}
              onChange={(e) => {
                setEditName(e.target.value);
                form.setFieldsValue({ name: e.target.value });
              }}
              className="!border-gray-300 hover:!border-gray-300 focus:!border-gray-300 mt-3"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-green-700 mt-2 w-full hover:!bg-green-800"
            loading={updatePermissionMutation.isPending}
          >
            Update Permission
          </Button>
        </Form>
      </Modal>


      {/* Addd Action Modal Here */}
      <Modal
        title="Add Action"
        open={isModalAddAction}
        onCancel={() => setIsModalAddAction(false)}
        footer={null}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Action Name"
            name="name"
            // rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input
              disabled
              value={Number(localStorage.getItem('PermissionParentId'))}
              className="!border-gray-300 hover:!border-gray-300 focus:!border-gray-300 mt-3"
            />
            <Input
              value={actionName}
              onChange={(e) => setActionName(e.target.value)}
              placeholder="Enter Action Name"
              className="!border-gray-300 hover:!border-gray-300 focus:!border-gray-300 mt-3"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-green-700 mt-2 w-full hover:!bg-green-800"
            onClick={handleAddActions}
            loading={postChildPermission.isPending}
          >
            Add Action
          </Button>
        </Form>
      </Modal>


    </div>
  );
}

export default Permission;
