import React, { useState } from "react";
import { Modal, Input } from "antd";

interface Props {
  visible: boolean;
  onClose: () => void;
  onCreate: (user: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => void;
}

const CreateUserModal: React.FC<Props> = ({ visible, onClose, onCreate }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    if (!form.name || !form.email || !form.phone || !form.password) return;
    onCreate(form);
    setForm({ name: '', email: '', phone: '', password: '' });
    onClose();
  };

  return (
    <Modal
      title="Create New User"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Add"
      okButtonProps={{
        className: "bg-green-700 text-white hover:!bg-green-500",
      }}
      cancelButtonProps={{
        className: "bg-red-700 text-white hover:!bg-red-500",
      }}
    >
      <Input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="mb-2"
      />
      <Input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="mb-2"
      />
      <Input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="mb-2"
      />
      <Input.Password
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="mb-2"
      />
    </Modal>
  );
};

export default CreateUserModal;
