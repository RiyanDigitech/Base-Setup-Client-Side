import React, { useEffect, useState } from 'react';
import { Button, Card, message, Popconfirm, Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDeleteMenu, useLatestMenus } from '@/services/MenusServices/MenusService';
import AddMenu from '@/components/ChatbotsComponents/AddMenu';
import MenuViewer from '@/components/ChatbotsComponents/SaveMenu';
import AddSubMenuModal from '@/components/ChatbotsComponents/modals/AddSubMenuModal';
import EditMenuModal from '@/components/ChatbotsComponents/modals/EditMenuModal'; // 👈 make sure you import this

const Chatbots: React.FC = () => {
  const { data: menus, isLoading, isError, refetch } = useLatestMenus();

  const [showSubmenuModal, setShowSubmenuModal] = useState(false);
  const [menuSaved, setMenuSaved] = useState(true);
  const [currentMenu, setCurrentMenu] = useState<any>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<any>(null);
  const [editSubmenuModalOpen, setEditSubmenuModalOpen] = useState(false);
const [selectedSubmenu, setSelectedSubmenu] = useState<any>(null);

const { mutate: deleteMenu, isPending, variables } = useDeleteMenu({
  onSuccess: (_:any, deletedId:any) => {
    if (deletedId === menus?.data?.id) {
      setMenuSaved(true);
      setCurrentMenu(null);
    }
    refetch();
  },
})

  const handleOpenEditModal = (menu: any) => {
    setSelectedMenu(menu);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedMenu(null);
    setEditModalOpen(false);
  };

  useEffect(() => {
    if (menus?.data && !menuSaved) {
      setCurrentMenu(menus.data);
    }
  }, [menus, menuSaved]);

  const handleSaveMenu = () => {
    setMenuSaved(true);
    setCurrentMenu(null);
    message.success('Menu saved successfully!');
    refetch();
  };

  return (
    <div className="bg-white rounded-2xl mt-7 shadow p-8">
      <h2 className="text-lg">Menu Management</h2>
      <hr className="mt-3 mb-5" />

      <AddMenu
        onSuccess={() => {
          setMenuSaved(false);
          refetch();
        }}
      />

      {/* Draft Menus */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-5">📝 Draft Menus</h3>

        {isLoading ? (
          <Spin className="custom-green-spin" />
        ) : isError ? (
          <p className="text-red-600">Failed to load draft menus.</p>
        ) : currentMenu && !menuSaved ? (
          <Card className="mb-4 rounded-lg shadow" bodyStyle={{ padding: 16 }}>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-base">
                {menus.data.id}. {menus.data.title} (ID: {menus.data.id})
              </h4>
              <div className="space-x-2">
                <Button className="!bg-green-700 !text-white" onClick={() => handleOpenEditModal(menus.data)}>
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure you want to delete this menu?"
                  onConfirm={() => deleteMenu(menus.data.id)}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{
                         className: "bg-red-700 text-white hover:!bg-red-500",
                      }}
                      cancelButtonProps={{
                               className: "bg-green-700 text-white hover:!bg-green-500",
                      }}
                >
                <Button className="!bg-red-500 !text-white" loading={isPending && variables === menus.data.id}  >Delete</Button>
                </Popconfirm>
              </div>
            </div>

            <div className="mb-4">
              <p><strong>Type:</strong> {menus.data.action_type}</p>
              <p>{menus.data.action_payload}</p>
            </div>

            {/* Submenus */}
            {menus.data.children?.length > 0 && (
              <div className="ml-4 border-l pl-4 space-y-2">
                <h5 className="font-semibold">Submenus:</h5>
                {menus.data.children.map((sub: any) => (
                  <Card size="small" key={sub.id} className="bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{sub.title}</p>
                        <p><strong>Type:</strong> {sub.action_type}</p>
                        <p><strong>Payload:</strong> {sub.action_payload}</p>
                      </div>
                      <div className="space-x-2">
                        <Button icon={<EditOutlined />} 
                        className='hover:!text-green-600'
                         onClick={() => {
                            setSelectedSubmenu(sub);
                            setEditSubmenuModalOpen(true);
                          }}
                        />
                        <Popconfirm
                          title="Are you sure you want to delete this menu?"
                          onConfirm={() => deleteMenu(sub.id)}
                          okText="Yes"
                          cancelText="No"
                          okButtonProps={{
                                 className: "bg-red-700 text-white hover:!bg-red-500",
                              }}
                              cancelButtonProps={{
                                       className: "bg-green-700 text-white hover:!bg-green-500",
                              }}
                        >
                        <Button danger icon={<DeleteOutlined />} loading={isPending && variables === sub.id}  />
                        </Popconfirm>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <div className="space-x-2 mb-4 mt-4">
              <Button
                className="!bg-green-700 !text-white"
                onClick={() => setShowSubmenuModal(true)}
              >
                Add Submenu
              </Button>
              <Button
                className="!bg-green-700 !text-white"
                onClick={handleSaveMenu}
              >
                Save Menu
              </Button>
            </div>
          </Card>
        ) : (
          <p className="text-gray-500">No draft menu created yet.</p>
        )}
      </div>

      {/* Saved Menus Section */}
      <MenuViewer />

      {/* Submenu Modal */}
      <AddSubMenuModal
        open={showSubmenuModal}
        onClose={() => setShowSubmenuModal(false)}
        parentId={menus?.data?.id}
        onSuccess={() => {
          refetch();
        }}
      />

      {/* Edit Menu Modal */}
      {selectedMenu && (
        <EditMenuModal
          open={editModalOpen}
          onClose={handleCloseEditModal}
          menu={selectedMenu}
           onSuccess={() => {
    refetch() // Make sure you're using useDraftMenuQuery
  }}
        />
      )}

      {selectedSubmenu && (
  <EditMenuModal
    open={editSubmenuModalOpen}
    onClose={() => {
      setEditSubmenuModalOpen(false);
      setSelectedSubmenu(null);
    }}
    menu={selectedSubmenu}
    onSuccess={() => {
      refetch();
    }}
  />
)}
    </div>
  );
};

export default Chatbots;
