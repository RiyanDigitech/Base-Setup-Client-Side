import React, { useState } from "react";
import { Input, Button, Radio, Card, List, message, Modal, Upload } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";

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

  const handleAddMenuDraft = () => {
    if (!menuName) {
      message.error("Please enter a menu description.");
      return;
    }
    setIsMenuModalOpen(true);
  };

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

  const showDraftEditModal = (menu:any) => {
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


const deleteDraftMenu = (id:any) => {
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
      <div className="border p-4 flex flex-col gap-4 md:flex-row md:items-center">
        <Radio.Group
          onChange={(e) => setMenuType(e.target.value)}
          className="w-full md:w-auto"
          value={menuType}
        >
          <Radio
            value="Normal"
            style={{
              color: menuType === "Normal" ? "green" : "inherit",
              fontWeight: menuType === "Normal" ? "bolder" : "normal",
              textDecoration: menuType === "Normal" ? "underline" : "none",
            }}
          >
            Normal
          </Radio>
          <Radio
            value="Textarea"
            style={{
              color: menuType === "Textarea" ? "green" : "inherit",
              fontWeight: menuType === "Textarea" ? "bolder" : "normal",
              textDecoration: menuType === "Textarea" ? "underline" : "none",
            }}
          >
            Textarea
          </Radio>
        </Radio.Group>

        {menuType === "Textarea" ? (
          <Input.TextArea
            rows={4}
            placeholder="Please Enter Your Menu Description"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            className="w-full md:w-[400px]"
          />
        ) : (
          <Input
            placeholder="Please Enter Your Menu Description"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            className="w-full md:w-[400px]"
          />
        )}

        <Button
          className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"

          icon={<PlusOutlined />}
          onClick={handleAddMenuDraft}
        >
          Add Menu
        </Button>
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
<Modal
  title="Edit Submenu"
  open={isEditModalOpen}
  onOk={() => {
    const updatedMenus = draftMenus.map(menu => {
      if (menu.id === editItem.menuId) {
        return {
          ...menu,
          children: menu.children.map(child =>
            child.id === editItem.id
              ? { ...child, name: editItem.name, id: editModeType === "submenu" ? editItem.id : child.id }
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
        value={editItem.id}
        onChange={(e) => setEditItem({ ...editItem, id: e.target.value })}
        placeholder="Enter ID"
      />
    )}
  </div>
</Modal>

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
          <Modal
            title="Add Content to Menu"
            open={isContentModalOpen}
            onOk={handleAddContent}
            onCancel={() => setIsContentModalOpen(false)}
            okText="Save"
            cancelText="Cancel"
            okButtonProps={{
              className: "bg-green-700 text-white hover:!bg-green-500"
            }}
          >
            <Radio.Group
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
            >
              <Radio value="Text">Text</Radio>
              <Radio value="Image">Image</Radio>
              <Radio value="Document">Document</Radio>
            </Radio.Group>

            <div className="mt-4">
              {contentType === "Text" && (
                <Input.TextArea
                  rows={4}
                  placeholder="Enter text"
                  value={contentValue}
                  onChange={(e) => setContentValue(e.target.value)}
                />
              )}

              {(contentType === "Image" || contentType === "Document") && (
                <Upload
                  beforeUpload={(file) => {
                    const url = URL.createObjectURL(file);
                    setContentValue(url);
                    return false;
                  }}
                  showUploadList={false}
                >
                  <Button
                    icon={<UploadOutlined />}
                    className="bg-green-700 text-white hover:!bg-green-500"
                  >
                    Upload {contentType}
                  </Button>
                </Upload>
              )}
            </div>
          </Modal>
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
                <Modal
                  title="Edit Menu"
                  open={isOpenSubMenuEditModal}
                  onCancel={handleCancel}
                  footer={null}

                >
                  {/* Modal ke andar ka content */}
                  {/* <p>Edit content for menu id: {menu?.id}</p> */}
                  <Input
                    type="string"
                    defaultValue={menu.name}
                  />

                  <Input
                    type="number"
                    className="mt-4"
                    defaultValue={menu.key}
                  />

                  <div className="mt-4 flex justify-end">
                    <Button
                      className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"

                    >
                      Edit
                    </Button>    </div>

                </Modal>
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


                    <Modal
                      title="Edit SubMenu"
                      open={subMenuModal}
                      onCancel={handleSubmenuCancel}
                      footer={null}

                    >
                      {/* Modal ke andar ka content */}
                      {/* <p>Edit content for menu id: {menu?.id}</p> */}
                      <Input
                        type="string"
                        defaultValue={menu.name}
                      />

                      <Input
                        type="number"
                        className="mt-4"
                        defaultValue={menu.key}
                      />

                      <div className="mt-4 flex justify-end">
                        <Button
                          className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"

                        >
                          Edit
                        </Button>    </div>

                    </Modal>,
//delete
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
      <Modal
        title="Enter Menu Key (1-99)"
        open={isMenuModalOpen}
        onOk={handleConfirmAddMenu}
        onCancel={() => {
          setIsMenuModalOpen(false);
          setMenuKey(null);
        }}
        okText="Save Draft"
        okButtonProps={{
          className: "bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
        }}
      >
        <Input
          type="number"
          placeholder="Enter key from 1 to 99"
          value={menuKey ?? ""}
          onChange={(e) => setMenuKey(Number(e.target.value))}
        />
      </Modal>

      {/* SubMenu Modal */}
      <Modal
        title="Add Sub Menu"
        open={isSubMenuModalOpen}
        onOk={handleAddSubMenu}
        onCancel={() => {
          setIsSubMenuModalOpen(false);
          setSubMenuName("");
          setSubMenuKey(null);
        }}
        okText="Add"
        cancelText="Cancel"
        okButtonProps={{
          className: "bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
        }}
      >
        <Input
          placeholder="Enter sub menu name"
          value={subMenuName}
          onChange={(e) => setSubMenuName(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          type="number"
          placeholder="Enter key from 1 to 99"
          value={subMenuKey ?? ""}
          onChange={(e) => setSubMenuKey(Number(e.target.value))}
        />
      </Modal>
      <Modal
  title="Edit Draft Menu"
  open={isDraftEditModalOpen}
  onOk={handleUpdateDraftMenu}
  onCancel={() => setIsDraftEditModalOpen(false)}
  okText="Save"
  cancelText="Cancel"
  okButtonProps={{ className: "bg-green-700 text-white hover:!bg-green-500" }}
>
  <div className="space-y-4">
    <Input
      value={editDraftMenu.name}
      onChange={(e) => setEditDraftMenu({ ...editDraftMenu, name: e.target.value })}
      placeholder="Enter Menu Name"
    />
    <Input
      value={editDraftMenu.key}
      onChange={(e) => setEditDraftMenu({ ...editDraftMenu, key: e.target.value })}
      placeholder="Enter Menu Key"
    />
  </div>
</Modal>

    </div>
  );

};

export default Chatbots;
