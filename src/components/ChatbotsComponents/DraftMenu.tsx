// components/ChatbotsComponents/DraftMenu.tsx

import React from "react";
import { Button, List, Input, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface SubMenu {
  id: number;
  name: string;
  key: number;
  type: string;
}

interface Menu {
  id: number;
  name: string;
  type: string;
  key: number;
  children: SubMenu[];
}

interface EditItem {
  menuId: number | null;
  id: number | null;
  name: string;
  type: string;
}

interface DraftMenuProps {
  draftMenus: Menu[];
  setDraftMenus: React.Dispatch<React.SetStateAction<Menu[]>>;
  showDraftEditModal: (menu: Menu) => void;
  deleteDraftMenu: (id: number) => void;
  editItem: EditItem;
  setEditItem: React.Dispatch<React.SetStateAction<EditItem>>;
  isEditModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editModeType: string;
  setEditModeType: React.Dispatch<React.SetStateAction<string>>;
}

const DraftMenu: React.FC<DraftMenuProps> = ({
  draftMenus,
  setDraftMenus,
  showDraftEditModal,
  deleteDraftMenu,
  editItem,
  setEditItem,
  isEditModalOpen,
  setIsEditModalOpen,
  editModeType,
  setEditModeType,
}) => {
  const editSubMenu = (menuId: number, subId: number) => {
    const menu = draftMenus.find((m) => m.id === menuId);
    const child = menu?.children.find((c) => c.id === subId);

    if (child) {
      setEditItem({
        menuId,
        id: child.id,
        name: child.name,
        type: child.type,
      });
      setEditModeType("submenu");
      setIsEditModalOpen(true);
    }
  };

  const deleteSubMenu = (menuId: number, subId: number) => {
    const updatedMenus = draftMenus.map((menu) =>
      menu.id === menuId
        ? {
            ...menu,
            children: menu.children.filter((child) => child.id !== subId),
          }
        : menu
    );
    setDraftMenus(updatedMenus);
  };

  return (
    <>
      <h3 className="text-xl font-semibold mb-5">📝 Draft Menus</h3>
      <List
        bordered
        dataSource={draftMenus}
        renderItem={(menu, idx) => (
          <div key={menu.id} className="p-4 border rounded-md mb-6 shadow-sm">
            <div className="flex justify-between items-center">
              <List.Item className="!border-none !p-0">
                <span className="font-medium">
                  {idx + 1}. {menu.name} (Key: {menu.key})
                </span>
              </List.Item>
              <div className="flex gap-2">
                <Button
                  onClick={() => showDraftEditModal(menu)}
                  className="!bg-green-700 !text-white hover:scale-105 transition"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteDraftMenu(menu.id)}
                  className="!bg-red-500 !text-white hover:scale-105 transition"
                >
                  Delete
                </Button>
              </div>
            </div>

            {menu.children && menu.children.length > 0 && (
              <List
                size="small"
                bordered
                className="my-4"
                dataSource={menu.children}
                renderItem={(child, cidx) => (
                  <List.Item
                    actions={[
                      <div className="flex gap-2 justify-end" key={child.id}>
                        <EditOutlined
                          className="text-green-700 cursor-pointer hover:scale-110 transition"
                          onClick={() => editSubMenu(menu.id, child.id)}
                        />
                        <DeleteOutlined
                          className="text-red-500 cursor-pointer hover:scale-110 transition"
                          onClick={() => deleteSubMenu(menu.id, child.id)}
                        />
                      </div>,
                    ]}
                  >
                    {cidx + 1}.{" "}
                    {child.type === "Text" ? (
                      <span>{child.name}</span>
                    ) : child.type === "Image" ? (
                      <img
                        src={child.name}
                        alt="draft-img"
                        className="max-w-[100px] max-h-[60px] rounded"
                      />
                    ) : (
                      <a
                        href={child.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Document
                      </a>
                    )}
                  </List.Item>
                )}
              />
            )}
          </div>
        )}
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Submenu"
        open={isEditModalOpen}
        onOk={() => {
          const updatedMenus = draftMenus.map((menu) => {
            if (menu.id === editItem.menuId) {
              return {
                ...menu,
                children: menu.children.map((child) =>
                  child.id === editItem.id
                    ? {
                        ...child,
                        name: editItem.name,
                        id: editModeType === "submenu" ? editItem.id : child.id,
                      }
                    : child
                ),
              };
            }
            return menu;
          });

          setDraftMenus(updatedMenus);
          setIsEditModalOpen(false);
        }}
        onCancel={() => setIsEditModalOpen(false)}
        okText="Save"
        cancelText="Cancel"
        okButtonProps={{ className: "bg-green-700 text-white hover:!bg-green-500" }}
      >
        <div className="space-y-4">
          <Input
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
            placeholder="Enter Name"
          />
          {editModeType === "submenu" && (
            <Input
              value={editItem.id?.toString()}
              onChange={(e) =>
                setEditItem({ ...editItem, id: parseInt(e.target.value) || 0 })
              }
              placeholder="Enter ID"
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default DraftMenu;
