// components/ChatbotsComponents/AddSubmenuModal.tsx
import { Modal, Form, Input, Select, message } from 'antd';
import { useState } from 'react';
import axios from '../../../lib/config/axios-instance';
import { useQueryClient } from '@tanstack/react-query';

interface AddSubmenuModalProps {
  open: boolean;
  onClose: () => void;
  parentId: number | null; // Required to set parent_id
  onSuccess?: () => void; // Optional callback after successful creation
}

const AddSubmenuModal: React.FC<AddSubmenuModalProps> = ({ open, onClose, parentId, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
   const queryClient = useQueryClient(); 

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const payload = {
        title: values.title,
        action_type: values.action_type,
        action_payload: values.action_payload,
        parent_id: parentId,
      };

      await axios.post('/menus', payload);

      message.success('Submenu created successfully!');
      form.resetFields();
      onClose();
       queryClient.invalidateQueries({ queryKey: ['menus'] });
      onSuccess?.();
    } catch (error: any) {
      console.error(error);
      message.error(error?.response?.data?.message || 'Failed to create submenu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add Submenu"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      confirmLoading={loading}
      okText="Add"
      okButtonProps={{
        className: "bg-green-700 text-white hover:!bg-green-500",
      }}
      cancelButtonProps={{
        className: "bg-red-700 text-white hover:!bg-red-500",
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Submenu Title" rules={[{ required: true }]}>
          <Input className="hover:border-green-600 focus:border-green-700 focus:ring-1 focus:ring-green-300" />
        </Form.Item>
        <Form.Item name="action_type" label="Action Type" rules={[{ required: true }]}>
          <Select
          popupClassName="custom-select-dropdown"
            options={[
              { value: 'text', label: 'Text' },
              { value: 'video', label: 'Video URL' },
            ]}
          />
        </Form.Item>
        <Form.Item name="action_payload" label="Payload" rules={[{ required: true }]}>
          <Input.TextArea className="hover:border-green-600 focus:border-green-700 focus:ring-1 focus:ring-green-300" placeholder="Enter text or video URL" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddSubmenuModal;
