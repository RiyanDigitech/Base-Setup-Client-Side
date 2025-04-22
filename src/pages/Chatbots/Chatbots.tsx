import React, { useState } from "react";
import {
  Input,
  Button,
  Radio,
  Card,
  List,
  Typography,
  message,
  Modal,
  Upload,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import menu from "antd/es/menu";
import Item from "antd/es/list/Item";

const { Text } = Typography;

interface SubMenu {
  id: number;
  name: string;
  key: number;
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
    
    const [contentType, setContentType] = useState<"Text" | "Image" | "Document">("Text");
    const [contentValue, setContentValue] = useState<string>("");
    
    const [menuKey, setMenuKey] = useState<number | null>(null);
    const [subMenuKey, setSubMenuKey] = useState<number | null>(null);
    const [subMenuName, setSubMenuName] = useState<string>("");
    
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
    
    const showSubMenuModal = (menuId: number) => {
      setCurrentMenuId(menuId);
      setIsSubMenuModalOpen(true);
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
    
      const updatedMenus = menus.map((menu) => {
        if (menu.id === currentMenuId) {
          return {
            ...menu,
            children: [
              ...menu.children,
              { id: Date.now(), name: subMenuName, key: subMenuKey },
            ],
          };
        }
        return menu;
      });
    
      setMenus(updatedMenus);
      setSubMenuName("");
      setSubMenuKey(null);
      setIsSubMenuModalOpen(false);
    };
    
    
    const showContentModal = (menuId: number) => {
      setCurrentMenuId(menuId);
      setIsContentModalOpen(true);
      setContentType("Text");
      setContentValue("");
    };
    
    const handleAddContent = () => {
      if (contentType === "Text" && !contentValue) {
        message.error("Please enter content.");
        return;
      }
    
      const updatedMenus = menus.map((menu) => {
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
    
      setMenus(updatedMenus);
      setContentValue("");
      setIsContentModalOpen(false);
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
    className="bg-green-700 text-white w-full md:w-auto"
    icon={<PlusOutlined />}
    onClick={handleAddMenuDraft}
  >
    Add Menu
  </Button>
</div>

      
          {/* Draft Menus */}
          {draftMenus.length > 0 && (
            <div className="mt-4">
              <h3 className="mb-5">📝 Draft Menus</h3>
              <List
                bordered
                dataSource={draftMenus}
                renderItem={(item, idx) => (

                    <div className='p-4'>
                  <List.Item>
                    {idx + 1}. {item.name} (Key: {item.key})
                  </List.Item>
                  <div className="flex gap-4 flex-col md:flex-row">
                <Button
                  className="mt-2 bg-green-700 text-white"
                  onClick={() => showContentModal(idx + 1)}
                >
                  Add Content
                </Button>
      
                {/* Content Modal */}
                <Modal
                  title="Add Content to Menu"
                  open={isContentModalOpen}
                  onOk={handleAddContent}
                  onCancel={() => setIsContentModalOpen(false)}
                  okText="Save"
                  cancelText="Cancel"
                  okButtonProps={{
                    className: "bg-green-700 text-white hover:bg-green-800 border-none",
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
      
                  <div className="mt-3">
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
                          className="bg-green-700 text-white mt-2"
                        >
                          Upload {contentType}
                        </Button>
                      </Upload>
                    )}
                  </div>
                </Modal>
      
                <Button
                  className="mt-2 bg-green-700 text-white"
                  onClick={saveDraftToMenus}
                >
                  Save Menu
                </Button>
              </div>
                  </div>
                )}
              />
              
            </div>
          )}
      
          {/* Saved Menus Section */}
          <div className="mt-5">
            <h3>Saved Menu Structure</h3>
            {menus.map((menu, index) => (
              <Card
                key={menu.id}
                title={
                  <>
                    {index + 1}. {menu.name} (Key: {menu.key})
                    <EditOutlined
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        const newName = prompt("Edit menu name:", menu.name);
                        if (newName) {
                          setMenus(
                            menus.map((m) =>
                              m.id === menu.id ? { ...m, name: newName } : m
                            )
                          );
                        }
                      }}
                    />
                    <DeleteOutlined
                      style={{ marginLeft: 10 }}
                      onClick={() => deleteMenu(menu.id)}
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
                          key="edit"
                          onClick={() => {
                            const newName = prompt("Edit submenu name:", item.name);
                            if (newName) {
                              setMenus(
                                menus.map((m) =>
                                  m.id === menu.id
                                    ? {
                                        ...m,
                                        children: m.children.map((child) =>
                                          child.id === item.id
                                            ? { ...child, name: newName }
                                            : child
                                        ),
                                      }
                                    : m
                                )
                              );
                            }
                          }}
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
                <Button
                  size="small"
                  style={{ marginTop: 8 }}
                  onClick={() => showSubMenuModal(menu.id)}
                >
                  + Add Sub Menu
                </Button>
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
              className: "bg-green-700 text-white hover:bg-green-800 border-none",
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
              className: "bg-green-700 text-white hover:bg-green-800 border-none",
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
        </div>
      );
      
};

export default Chatbots;
