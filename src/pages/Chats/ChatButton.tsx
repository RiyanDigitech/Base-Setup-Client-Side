import { Button, message, Modal } from "antd"
import { ArrowLeftOutlined, CloseCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleCloseButton } from "@/services/ChatServices/ChatsService";
import { useState } from "react";
const { confirm } = Modal;

function ChatButton() {


  const [loading, setLoading] = useState(false);

  const naviagte = useNavigate()
  const queryClient = useQueryClient()
  const wa_id: any = useParams()

  const handleClose = () => {
    handleMutation.mutate(wa_id.waNumber)
    console.log(wa_id.waNumber)
  }

  const handleMutation = useMutation({
    mutationFn: handleCloseButton,
    onSuccess: () => {
      message.success("Chat Closed Successfully")
      queryClient.invalidateQueries({ queryKey: ['chats'] })
      naviagte('/chats')
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Chat Not Closed Something Wrong")
    }
  })


  const showConfirmModal = () => {
    confirm({
      title: "Are you sure you want to close the chat?",
      icon: <ExclamationCircleFilled style={{ color: "#ff4d4f" }} />,
      content: "You won't be able to recover this conversation once it's closed.",
      okText: "Yes, Close it",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk() {
        handleClose()
        setLoading(true);
        // Simulate async action
        setTimeout(() => {
          setLoading(false);
          console.log("Chat closed");
          // handleClose();  // Call your original close logic here
        }, 1500);
      },
      onCancel() {
        console.log("User cancelled");
      },
    });
  };



  return (
    <div>
      <div className="flex justify-between mb-4">
        <Button className="!bg-green-600 !text-white" icon={<ArrowLeftOutlined />} onClick={() => naviagte('/chats')}>
          Back
        </Button>
        <Button
          className="!bg-red-600 !text-white"
          icon={<CloseCircleOutlined />}
          loading={loading}
          onClick={showConfirmModal}
        >
          Close Chat
        </Button>
      </div>
    </div>
  )
}

export default ChatButton
