import { Button, Input, message, Modal, Radio } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPostParentMenu, CreateMenuPayload } from "@/services/MenusServices/MenusService";

interface AddMenuProps {
  onSuccess?: () => void;
}
const AddMenu: React.FC<AddMenuProps> = ({ onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"text" | "video">("text");
  const [title, setTitle] = useState("");
  const [payload, setPayload] = useState("");

  const queryClient = useQueryClient();

  const postParentMutation = useMutation({
    mutationFn: addPostParentMenu,
    onSuccess: (data: any) => {
      message.success(data?.message || "Menu created successfully");
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      setIsModalOpen(false);
      setTitle("");
      setPayload("");
      setActionType("text");
      if (onSuccess) {
    onSuccess(); // 🔁 call parent callback
  }
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Failed to create menu"
      );
    },
  });

  const handleCreateMenu = () => {
    if (!title || !payload) {
      return message.error("Please provide both title and payload");
    }

   const data: CreateMenuPayload = {
  title,
  action_type: actionType,
  action_payload: payload,
};

    postParentMutation.mutate(data);
  };

  return (
    <>
      <Button
        className="bg-green-700 text-white hover:!bg-green-600"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
        loading={postParentMutation.isPending}
      >
        Create Menu
      </Button>

      <Modal
        title="Create Menu"
        open={isModalOpen}
        onOk={handleCreateMenu}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={postParentMutation.isPending}
        okText="Create"
        okButtonProps={{
          className: "bg-green-700 text-white hover:!bg-green-600",
        }}
      >
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Radio.Group
            value={actionType}
            onChange={(e) => setActionType(e.target.value)}
          >
            <Radio value="text">Text</Radio>
            <Radio value="video">Video URL</Radio>
          </Radio.Group>

          {actionType === "text" ? (
            <Input.TextArea
              rows={4}
              placeholder="Enter text content"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
            />
          ) : (
            <Input
              placeholder="Enter video URL"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default AddMenu;
