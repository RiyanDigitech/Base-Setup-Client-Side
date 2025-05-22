// components/RoleComponents/EditRoleModal.tsx
import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

interface EditRoleModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { id: number; name: string }) => void;
  isUpdating: boolean;
  role: { id: number; name: string } | null;
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({
  visible,
  onClose,
  onSubmit,
  isUpdating,
  role,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (role) {
      form.setFieldsValue({ name: role.name });
    }
  }, [role, form]);

  const handleOk = () => {
    form.validateFields().then(values => {
      onSubmit({ id: role!.id, name: values.name });
    });
  };

  return (
    <Modal
      title="Edit Role"
      open={visible}
      onCancel={onClose}
      onOk={handleOk}
      okText="Update"
      cancelText="Cancel"
      confirmLoading={isUpdating}
      okButtonProps={{
        className: "bg-green-700 text-white hover:!bg-green-500",
      }}
      cancelButtonProps={{
        className: "bg-red-700 text-white hover:!bg-red-500",
      }}    
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Role Name"
          rules={[{ required: true, message: 'Please enter role name' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditRoleModal;
