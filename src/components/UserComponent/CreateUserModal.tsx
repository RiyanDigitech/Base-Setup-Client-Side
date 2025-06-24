import React, { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useState } from "react";
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
  isLoading?: boolean;
}
export type CreateUserModalRef = {
  resetForm: () => void;
};
const CreateUserModal: ForwardRefRenderFunction<CreateUserModalRef, Props> = ({ visible, onClose, onCreate, isLoading }, ref) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error if value is entered
    if (value.trim() !== '') {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateField = (name: string, value: string) => {
    if (!value.trim()) {
      setErrors(prev => ({ ...prev, [name]: `${name[0].toUpperCase() + name.slice(1)} is required` }));
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleOk = () => {
    const newErrors: Partial<Record<keyof typeof form, string>> = {};

    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key as keyof typeof form] = `${key[0].toUpperCase() + key.slice(1)} is required`;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onCreate(form);
    
  };
  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", password: "" });
    setErrors({});
  };

  useImperativeHandle(ref, () => ({
    resetForm,
  }));

  const inputBaseClass =
    "mb-1 focus:border-green-600 hover:border-green-600 focus:ring-green-600";

  const errorTextClass = "text-red-500 text-xs mb-2";

  return (
    <Modal
      title="Create New User"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={isLoading}
      okText="Add"
      okButtonProps={{
        className: "bg-green-700 text-white hover:!bg-green-500",
      }}
      cancelButtonProps={{
        className: "bg-red-700 text-white hover:!bg-red-500",
      }}
    >
      <div>
        <Input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          status={errors.name ? "error" : ""}
          className={`${inputBaseClass} mb-2`}
        />
        {errors.name && <div className={errorTextClass}>{errors.name}</div>}

        <Input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          status={errors.email ? "error" : ""}
          className={`${inputBaseClass} mb-2`}
        />
        {errors.email && <div className={errorTextClass}>{errors.email}</div>}

        <Input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          status={errors.phone ? "error" : ""}
          className={`${inputBaseClass} mb-2`}
        />
        {errors.phone && <div className={errorTextClass}>{errors.phone}</div>}

        <Input.Password
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          status={errors.password ? "error" : ""}
          className={`${inputBaseClass} mb-2`}
        />
        {errors.password && <div className={errorTextClass}>{errors.password}</div>}
      </div>
    </Modal>
  );
};

export default forwardRef(CreateUserModal);
