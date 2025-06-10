import { Modal, Form, Input, Select, message } from "antd"
import { useEffect, useState } from "react"
import axios from "../../../lib/config/axios-instance"
import { useQueryClient } from "@tanstack/react-query"

const { Option } = Select

interface EditMenuModalProps {
  open: boolean
  onClose: () => void
  menu: any
  onSuccess: () => void
}

export default function EditMenuModal({
  open,
  onClose,
  menu,
  onSuccess,
}: EditMenuModalProps) {
  const [form] = Form.useForm()
  const [actionType, setActionType] = useState<string | null>(null)
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient(); 


  useEffect(() => {
    if (menu) {
      form.setFieldsValue({
        title: menu.title,
        action_type: menu.action_type,
        action_payload: menu.action_payload,
      })
      setActionType(menu.action_type)
    }
  }, [menu, form])

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields()
      await axios.put(`/menus/${menu.id}`, {
        ...values,
        parent_id: menu.parent_id || null,
      })
      message.success("Menu updated successfully.")
      onSuccess()
      onClose()
      queryClient.invalidateQueries({ queryKey: ['menus'] });
    } catch (error: any) {
      message.error(
        error.response?.data?.message || "Failed to update the menu."
      )
    }
  }

  return (
    <Modal
      open={open}
      title={menu?.parent_id ? "Edit Submenu" : "Edit Menu"}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Update"
      cancelText="Cancel"
      destroyOnClose
      okButtonProps={{
        className: "bg-green-700 text-white hover:!bg-green-500",
        loading,
      }}
      cancelButtonProps={{
        className: "bg-red-700 text-white hover:!bg-red-500",
      }}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="title"
          label="Menu Title"
          rules={[{ required: true, message: "Please enter menu title" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          name="action_type"
          label="Action Type"
          rules={[{ required: true, message: "Please select action type" }]}
        >
          <Select
            placeholder="Select action type"
            onChange={(val) => {
              setActionType(val)
              form.setFieldValue("action_payload", "")
            }}
          >
            <Option value="text">Text</Option>
            <Option value="video">Video (URL)</Option>
          </Select>
        </Form.Item>

        {actionType === "text" && (
          <Form.Item
            name="action_payload"
            label="Text Content"
            rules={[{ required: true, message: "Please enter content" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter text content" />
          </Form.Item>
        )}

        {actionType === "video" && (
          <Form.Item
            name="action_payload"
            label="Video URL"
            rules={[{ required: true, message: "Please enter video URL" }]}
          >
            <Input placeholder="https://example.com/video.mp4" />
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
}
