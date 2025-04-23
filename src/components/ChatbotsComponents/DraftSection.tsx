import { Button, Input, List, message, Modal, Radio, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useState } from "react";


interface Menu {
    id: number;
    name: string;
    type: string;
    key: number;
    children: SubMenu[];
}
interface SubMenu {
    id: number;
    name: string;
    key: number;
    type: string;
  }

function DraftSection() {


    const [draftMenus, setDraftMenus] = useState<Menu[]>([]);
    const [, setIsSubMenuModalOpen] = useState(false);
    const [isContentModalOpen, setIsContentModalOpen] = useState(false);
    const [contentType, setContentType] = useState<"Text" | "Image" | "Document">("Text");
    const [contentValue, setContentValue] = useState<string>("");
    const [currentMenuId, setCurrentMenuId] = useState<number | null>(null);
    const [menus, setMenus] = useState<Menu[]>([]);



    

    const saveDraftToMenus = () => {
        setMenus([...menus, ...draftMenus]);
        setDraftMenus([]);
        message.success("Menu saved successfully.");
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


    return (
        <div>
            {draftMenus.length > 0 && (
                <div className="mt-4">
                    <h3 className="mb-5">📝 Draft Menus</h3>
                    <List
                        bordered
                        dataSource={draftMenus}
                        renderItem={(item, idx) => (
                            <div className="p-4">
                                <List.Item>
                                    {idx + 1}. {item.name} (Key: {item.key})
                                </List.Item>

                                {/* 👇 Show Content inside this Draft Menu */}
                                {item.children && item.children.length > 0 && (
                                    <List
                                        size="small"
                                        bordered
                                        className="my-3"
                                        dataSource={item.children}
                                        renderItem={(child, cidx) => (
                                            <List.Item>
                                                {cidx + 1}.{" "}
                                                {child.type === "Text" ? (
                                                    <span>{child.name}</span>
                                                ) : child.type === "Image" ? (
                                                    <img
                                                        src={child.name}
                                                        alt="draft-img"
                                                        style={{ maxWidth: 100, maxHeight: 60 }}
                                                    />
                                                ) : (
                                                    <a href={child.name} target="_blank" rel="noopener noreferrer">
                                                        View Document
                                                    </a>
                                                )}
                                            </List.Item>
                                        )}
                                    />
                                )}

                                <div className="flex gap-4 mt-5 flex-col md:flex-row">
                                    <Button
                                        className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
                                        onClick={() => showContentModal(item.id)}
                                    >
                                        Add Content
                                    </Button>
                                    <Button
                                        className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
                                        onClick={() => showSubMenuModal(item.id)}
                                    >
                                        + Add Sub Menu
                                    </Button>

                                    {/* Add Content to Menu */}
                                    <Modal
                                        title="Add Content to Menu"
                                        open={isContentModalOpen}
                                        onOk={handleAddContent}
                                        onCancel={() => setIsContentModalOpen(false)}
                                        okText="Save"
                                        cancelText="Cancel"
                                        okButtonProps={{
                                            className: "bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
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
                                                        className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
                                                    >
                                                        Upload {contentType}
                                                    </Button>
                                                </Upload>
                                            )}
                                        </div>
                                    </Modal>

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
                </div>
            )}
        </div>
    )
}

export default DraftSection
