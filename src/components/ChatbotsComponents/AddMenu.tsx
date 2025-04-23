import { Button, Input, message, Radio } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { useState } from "react";

const AddMenu = () => {
    const [, setIsMenuModalOpen] = useState(false);
    const [menuType, setMenuType] = useState<string>("Normal");
    const [menuName, setMenuName] = useState<string>("");

    const handleAddMenuDraft = () => {
        if (!menuName) {
            message.error("Please enter a menu description.");
            return;
        }
        setIsMenuModalOpen(true);
    };
    return (
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
    )
}

export default AddMenu
