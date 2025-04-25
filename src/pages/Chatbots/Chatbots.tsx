import React, { useState } from "react";
import { Input, Button, Radio, Card, List, message, Modal, Upload } from "antd";
import { EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import AddMenu from "@/components/ChatbotsComponents/AddMenu";
import { Menu } from "@/lib/types/menu";
import AddContentModal from "@/components/ChatbotsComponents/modals/AddContentModal";
import EditSubMenuModal from "@/components/ChatbotsComponents/modals/EditSubMenuModal";
import EditDraftMenuModal from "@/components/ChatbotsComponents/modals/EditDraftMenuModal";
import MenuKeyModal from "@/components/ChatbotsComponents/modals/MenuKeyModal";
import AddSubMenuModal from "@/components/ChatbotsComponents/modals/AddSubMenuModal";
import EditMenuModal from "@/components/ChatbotsComponents/modals/EditMenuModal";
import EditSaveSubMenu from "@/components/ChatbotsComponents/modals/EditSaveSubMenu";

const Chatbots: React.FC = () => {
  const [menuType, setMenuType] = useState<string>("Normal");
  const [menuName, setMenuName] = useState<string>("");
  const [menus, setMenus] = useState<Menu[]>([]);
  const [draftMenus, setDraftMenus] = useState<Menu[]>([]);

  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isSubMenuModalOpen, setIsSubMenuModalOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);

  const [isOpenSubMenuEditModal, setIsOpenSubMenuEditModal] = useState(false);
  const [subMenuModal, setSubMenuModal] = useState(false);

  const [contentType, setContentType] = useState<"Text" | "Image" | "Document">("Text");
  const [contentValue, setContentValue] = useState<string>("");

  const [menuKey, setMenuKey] = useState<number | null>(null);
  const [subMenuKey, setSubMenuKey] = useState<number | null>(null);
  const [subMenuName, setSubMenuName] = useState<string>("");

  const [isDraftEditModalOpen, setIsDraftEditModalOpen] = useState(false);
  const [editDraftMenu, setEditDraftMenu] = useState({ id: null, name: "", key: "" });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editModeType, setEditModeType] = useState(""); // "submenu" or "content"
  const [editItem, setEditItem] = useState({ menuId: null, id: null, name: "", type: "" });

  const [currentMenuId, setCurrentMenuId] = useState<number | null>(null);

 
  const handleConfirmAddMenu = () => {
    if (!menuKey || menuKey < 1 || menuKey > 99) {
      message.error("Menu key must be between 1 and 99.");
      return;
    }

    const newMenu: Menu = {
      id: Date.now(),
      name: menuName,
      type: menuType,
      key: menuKey,
      children: [],
    };

    setDraftMenus([...draftMenus, newMenu]);
    setMenuName("");
    setMenuKey(null);
    setIsMenuModalOpen(false);
  };

  const showDraftEditModal = (menu) => {
  setEditDraftMenu(menu);
  setIsDraftEditModalOpen(true);
};

const handleUpdateDraftMenu = () => {
  const updated = draftMenus.map(menu =>
    menu.id === editDraftMenu.id ? { ...menu, name: editDraftMenu.name, key: editDraftMenu.key } : menu
  );
  setDraftMenus(updated);
  setIsDraftEditModalOpen(false);
};

const deleteDraftMenu = (id) => {
  const filtered = draftMenus.filter(menu => menu.id !== id);
  setDraftMenus(filtered);
};
  const saveDraftToMenus = () => {
    setMenus([...menus, ...draftMenus]);
    setDraftMenus([]);
    message.success("Menu saved successfully.");
  };

  const deleteMenu = (id: number) => {
    setMenus(menus.filter((menu) => menu.id !== id));
  };

  const deleteSubMenu = (menuId: number, subId: number) => {
    setMenus(
      menus.map((menu) =>
        menu.id === menuId
          ? {
            ...menu,
            children: menu.children.filter((child) => child.id !== subId),
          }
          : menu
      )
    );
  };
  const deleteSubbb = (menuId: number, subId: number) => {
    const updatedMenus = draftMenus.map(menu => {
      if (menu.id === menuId) {
        return {
          ...menu,
          children: menu.children.filter(child => child.id !== subId),
        };
      }
      return menu;
    });

    setDraftMenus(updatedMenus);
  };

  const showContentModal = (menuId: number) => {
    setCurrentMenuId(menuId);
    setIsContentModalOpen(true);
    setContentType("Text");
    setContentValue("");
  };

  const showSubMenuModal = (menuId: number) => {
    setCurrentMenuId(menuId);
    setIsSubMenuModalOpen(true);
  };

  const handleAddContent = () => {
    if (contentType === "Text" && !contentValue) {
      message.error("Please enter content.");
      return;
    }

    const updatedDraftMenus = draftMenus.map((menu) => {
      if (menu.id === currentMenuId) {
        return {
          ...menu,
          children: [
            ...menu.children,
            {
              id: Date.now(),
              name: contentValue || `${contentType} file`,
              key: Math.floor(Math.random() * 100),
              type: contentType,
            },
          ],
        };
      }
      return menu;
    });

    setDraftMenus(updatedDraftMenus);
    setContentValue("");
    setIsContentModalOpen(false);
    message.success("Content added to draft menu.");
  };

  const handleAddSubMenu = () => {
    if (!subMenuName) {
      message.error("Please enter a submenu name.");
      return;
    }

    if (!subMenuKey || subMenuKey < 1 || subMenuKey > 99) {
      message.error("Submenu key must be between 1 and 99.");
      return;
    }

    const updatedDraftMenus = draftMenus.map((menu) => {
      if (menu.id === currentMenuId) {
        return {
          ...menu,
          children: [
            ...menu.children,
            {
              id: Date.now(),
              name: subMenuName,
              key: subMenuKey,
              type: "Text", // Default or fixed type since only name/key are input
            },
          ],
        };
      }
      return menu;
    });

    setDraftMenus(updatedDraftMenus);
    setSubMenuName("");
    setSubMenuKey(null);
    setIsSubMenuModalOpen(false);
  };
  const showEditModal = () => {
    setIsOpenSubMenuEditModal(true);
  };

  const handleCancel = () => {
    setIsOpenSubMenuEditModal(false);
  };


  const showSubmenuEditModal = () => {
    setSubMenuModal(true);
  };

  const handleSubmenuCancel = () => {
    setSubMenuModal(false);
  };

  const editSbbb = (menuId: number, subId: number) => {
  const menu = draftMenus.find(m => m.id === menuId);
  const child = menu?.children.find(c => c.id === subId);

  if (child) {
    setEditItem({
      menuId,
      id: child.id,
      name: child.name,
      type: child.type, // "Text", "Image", "Document"
    });
    setEditModeType("submenu");
    setIsEditModalOpen(true);
  }
};

  return (


    <div className="bg-white rounded-2xl mt-7 shadow p-8">


      <h2 className="text-lg">Menu Management</h2>
      <hr className="mt-3 mb-5" />

      {/* Menu Type & Input Section */}
      <div>
      <AddMenu draftMenus={draftMenus} setDraftMenus={setDraftMenus} />
      {/* <DraftMenuList draftMenus={draftMenus} /> */}
    </div>



      {/* Draft Menus */}
      {draftMenus.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-5">📝 Draft Menus</h3>
          <List
            bordered
            dataSource={draftMenus}
            renderItem={(menu, idx) => (
              <div key={menu.id} className="p-4 border rounded-md mb-6 shadow-sm">
                {/* Top Level Menu Info */}
                <div className="flex justify-between items-center">
                  <List.Item className="!border-none !p-0">
                    <span className="font-medium">
                      {idx + 1}. {menu.name} (Key: {menu.key})
                    </span>
                  </List.Item>

                  <div className="flex gap-2">
                    <Button onClick={() => showDraftEditModal(menu)} className="!bg-green-700 !text-white hover:scale-105 transition">Edit</Button>
                    <Button onClick={() => deleteDraftMenu(menu.id)} className="!bg-red-500 !text-white hover:scale-105 transition">Delete</Button>
                  </div>
                </div>

                {/* Submenu (Children) */}
                {menu.children && menu.children.length > 0 && (
                  <List
                    size="small"
                    bordered
                    className="my-4"
                    dataSource={menu.children}
                    renderItem={(child, cidx) => (
                      <List.Item
                        actions={[
                          <div className="flex gap-2 justify-end">
                            <EditOutlined
  className="text-green-700 cursor-pointer hover:scale-110 transition"
  onClick={() => editSbbb(menu.id, child.id)}
/>
      <EditSubMenuModal
        visible={isEditModalOpen}
        editItem={editItem}
        setEditItem={setEditItem}
        onOk={() => {
          const updatedMenus = draftMenus.map(menu => {
            if (menu.id === editItem.menuId) {
              return {
                ...menu,
                children: menu.children.map(child =>
                  child.id === editItem.id ? { ...child, name: editItem.name } : child
                ),
              };
            }
            return menu;
          });
          setDraftMenus(updatedMenus);
          setIsEditModalOpen(false);
        }}
        onCancel={() => setIsEditModalOpen(false)}
      />
                            <DeleteOutlined
                              className="text-red-500 cursor-pointer hover:scale-110 transition"
                              onClick={() => deleteSubbb(menu.id, child.id)}
                            />
                          </div>
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

                {/* Action Buttons */}
                <div className="flex gap-4 mt-5 flex-col md:flex-row">
                  <Button
                    className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
                    onClick={() => showContentModal(menu.id)}
                  >
                    Add Content
                  </Button>
                  <Button
                    className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
                    onClick={() => showSubMenuModal(menu.id)}
                  >
                    Add Sub Menu
                  </Button>
                  <Button
                    className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
                    onClick={saveDraftToMenus}
                  >
                    Save Menu
                  </Button>
                </div>
              </div>
            )}
          />

          {/* Modal for Content Add */}
          <AddContentModal
            open={isContentModalOpen}
            contentType={contentType}
            contentValue={contentValue}
            setContentType={setContentType}
            setContentValue={setContentValue}
            onOk={handleAddContent}
            onCancel={() => setIsContentModalOpen(false)}
/>

        </div>
      )}
      {/* Saved Menus Section */}
      <div className="mt-5">
        <h3 className="p-4 text-2xl font-bold underline">Saved Menu Structure</h3>
        {menus.map((menu, index) => (
          <Card
            key={menu.id}
            title={
              <>
                <div className="flex justify-between">
                  {index + 1}. {menu.name} (Key: {menu.key})

                  <div className="flex gap-3">
                    <Button onClick={showEditModal} className="!bg-green-700 !text-white active:scale-110">Edit</Button>
                    <Button onClick={() => deleteMenu(menu.id)} className="!bg-red-500 !text-white active:scale-110">Delete</Button>

                  </div>
                </div>
                <EditMenuModal 
                isOpenSubMenuEditModal = {isOpenSubMenuEditModal}
                handleCancel = {handleCancel}
                menu = {menu}
                />
                
              </>
            }
            style={{ marginBottom: 16 }}
          >
            <List
              bordered
              dataSource={menu.children}
              renderItem={(item, idx) => (
                <List.Item
                  actions={[
                    <EditOutlined
                      onClick={showSubmenuEditModal}

                    />,
                   <EditSaveSubMenu
                    subMenuModal = {subMenuModal}
                    handleSubmenuCancel = {handleSubmenuCancel}
                    menu = {menu}
                   />,

                    <DeleteOutlined
                      key="delete"
                      onClick={() => deleteSubMenu(menu.id, item.id)}
                    />,
                  ]}
                >
                  {idx + 1}. {item.name} (Key: {item.key})
                </List.Item>
              )}
            />

          </Card>
        ))}

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
      </div>

      {/* Menu Key Modal */}
      <MenuKeyModal
      isMenuModalOpen = {isMenuModalOpen}
      handleConfirmAddMenu ={handleConfirmAddMenu}
      setIsMenuModalOpen = {setIsMenuModalOpen}
      setMenuKey = {setMenuKey}
      menuKey = {menuKey}
       />

      {/* SubMenu Modal */}
      
      <AddSubMenuModal
      isSubMenuModalOpen = {isSubMenuModalOpen}
      handleAddSubMenu = {handleAddSubMenu}
      setIsSubMenuModalOpen ={setIsSubMenuModalOpen}
      setSubMenuName = {setSubMenuName}
      setSubMenuKey = {setSubMenuKey}
      subMenuName = {subMenuName}
      subMenuKey = {subMenuKey}
      />
 <EditDraftMenuModal
        visible={isDraftEditModalOpen}
        editDraftMenu={editDraftMenu}
        setEditDraftMenu={setEditDraftMenu}
        onOk={handleUpdateDraftMenu}
        onCancel={() => setIsDraftEditModalOpen(false)}
      />

    </div>
  );

};

export default Chatbots;