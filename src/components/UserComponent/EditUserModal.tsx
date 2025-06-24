// components/RoleComponents/EditRoleModal.tsx
import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

interface EditUserModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { id: number; name?: string; email?: string; phone?: string; password?: string }) => void;
  isUpdating: boolean;
   user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    password?: string; // optional
  } | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  visible,
  onClose,
  onSubmit,
  isUpdating,
  user,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: '', // Leave password empty by default
      });
    }
  }, [user, form]);

  const handleOk = () => {
  form.validateFields().then((values) => {
    const payload = {
  id: user!.id,
  name: values.name,
  email: values.email,
  phone: values.phone,
} as {
  id: number;
  name: string;
  email: string;
  phone: string;
  password?: string;
};

if (values.password?.trim()) {
  payload.password = values.password;
}
    onSubmit(payload);
  });
};


const inputBaseClass =
    "mb-1 focus:border-green-600 hover:border-green-600 focus:ring-green-600";
 

  return (
    <Modal
      title="Edit User"
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
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input className={inputBaseClass}  />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input className={inputBaseClass}  />
        </Form.Item>
        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
          <Input className={inputBaseClass}  />
        </Form.Item>
        <Form.Item
  name="password"
  label="Password"
  rules={[{ required: false }]}
>
  <Input.Password placeholder="Leave empty to keep unchanged" className={inputBaseClass} />
</Form.Item>

      </Form>
    </Modal>
  );
};

export default EditUserModal;
