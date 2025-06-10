import { Card, List, Spin, Button, Popconfirm } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useDeleteMenu, useMenuQuery } from "@/services/MenusServices/MenusService"
import { useState } from "react"
import EditMenuModal from "./modals/EditMenuModal"


export default function MenuViewer() {
  const [editModalOpen, setEditModalOpen] = useState(false)
const [selectedMenu, setSelectedMenu] = useState<any>(null)
const { mutate: deleteMenu, isPending, variables } = useDeleteMenu()
 const handleCloseEditModal = () => {
    setSelectedMenu(null)
    setEditModalOpen(false)
  }
  const renderMenuTree = (menus: any[], parentId: number | null = null) => {
  
  const handleOpenEditModal = (menu: any) => {
    setSelectedMenu(menu)
    setEditModalOpen(true)
  }
  
 
    return menus.map((menu, idx) => (
      <Card
        key={menu.id}
        title={`${idx + 1}. ${menu.title} (ID: ${menu.id})`}
        style={{ marginBottom: 16, marginLeft: parentId ? 24 : 0 }}
        extra={
          <div className="flex gap-2">
            <Button  className="!bg-green-700 !text-white" onClick={() => handleOpenEditModal(menu)} >Edit</Button>
<Popconfirm
  title="Are you sure you want to delete this menu?"
  onConfirm={() => deleteMenu(menu.id)}
  okText="Yes"
  cancelText="No"
  okButtonProps={{
         className: "bg-red-700 text-white hover:!bg-red-500",
      }}
      cancelButtonProps={{
               className: "bg-green-700 text-white hover:!bg-green-500",
      }}
>
  <Button
    className="!bg-red-500 !text-white"
    loading={isPending && variables === menu.id}
  >
    Delete
  </Button>
</Popconfirm>
          </div>
        }
      >
          
        {menu.action_payload && (
          <div className="mb-2">
            <p><b>Type:</b> {menu.action_type}</p>
            {menu.action_type === "text" ? (
              <p className="whitespace-pre-wrap">{menu.action_payload}</p>
            ) : menu.action_type === "image" ? (
              <img
                src={menu.action_payload}
                alt="Image Payload"
                className="max-w-[200px] max-h-[120px] object-cover rounded border"
              />
            ) : (
              <a
                href={menu.action_payload}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {menu.action_type === "video" ? "Watch Video" : "Open URL"}
              </a>
            )}
          </div>
        )}
  
        {menu.children && menu.children.length > 0 && (
          <div className="mt-2">{renderMenuTree(menu.children, menu.id)}</div>
        )}
      </Card>
    ))
  }
  const { data, isLoading, isError, error,refetch } = useMenuQuery()
  
 
  return (
    <div className="mt-5">
      <h3 className="p-4 text-2xl font-bold underline">Saved Menu Structure</h3>

      {isLoading ? (
        <Spin tip="Loading..." 
        className="custom-green-spin"  />
      ) : isError ? (
        <div className="text-red-500">
          <p><b>Error:</b> {(error as any)?.response?.data?.message || error.message || "Something went wrong"}</p>
        </div>
      ) : data?.data?.length > 0 ? (
        renderMenuTree(data.data)
      ) : (
        <p className="text-gray-500 italic">No saved menus yet.</p>
      )}

        <div
          style={{
            background: "#fff7e6",
            padding: 16,
            marginTop: 16,
            border: "1px solid #ffe58f",
          }}
        >
          The <b>"WhatsApp Interactive Chat Menu"</b> can be started replying
          specific keywords like: <b>Hello, Hi, M, #, Menu</b>. Without these
          keywords, the menu cannot be started.
        </div>
        <EditMenuModal
  open={editModalOpen}
  onClose={handleCloseEditModal}
  menu={selectedMenu}
  onSuccess={() => refetch()} // <-- make sure to call this if you're using TanStack to reload data
/>

    </div>
  )
}
