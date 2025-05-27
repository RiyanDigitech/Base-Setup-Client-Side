// AddMenu.tsx
import { Button, Input, message, Modal, Radio } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPostParentMenu } from "@/services/MenusServices/MenusService";

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

interface AddMenuProps {
  draftMenus: Menu[];
  setDraftMenus: React.Dispatch<React.SetStateAction<Menu[]>>;
}

const AddMenu = ({ draftMenus, setDraftMenus }: AddMenuProps) => {
  const [menuType, setMenuType] = useState<string>("Normal");
  const [menuName, setMenuName] = useState<string>("");
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [menuKey, setMenuKey] = useState<number | null>(null);

  const handleAddMenuDraft = () => {
    if (!menuName) {
      message.error("Menu Name is Missing");
      return;
    }
    
    console.log(menuName, "Input Value")
    postParentMutation.mutate(menuName)
    setMenuName("")
  };
  // setIsMenuModalOpen(true);

  const queryClient = useQueryClient()
  const postParentMutation = useMutation({
  
    mutationFn:addPostParentMenu,
    onSuccess:(data:any) => {
      message.success( data?.message ||"Add Main Menu Successfully")
      queryClient.invalidateQueries({queryKey:['menus']})

    },onError:(error:any) => {
      message.error(error?.response?.data?.message || "Failed to Add Main Menu")
    }

  })







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

  return (
    <>
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
            placeholder="Please Enter Your Menu"
            value={menuName}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z\s]*$/.test(value)) {
                setMenuName(value);
              }
            }}
            className="w-full md:w-[400px]"
          />
        ) : (
          <Input
            placeholder="Please Enter Your Menu"
            value={menuName}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z\s]*$/.test(value)) {
                setMenuName(value);
              }
            }}
            className="w-full md:w-[400px]"
          />
        )}

        <Button
          className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
          icon={<PlusOutlined />}
          loading={postParentMutation.isPending}
          onClick={handleAddMenuDraft}
        >
          Create Menu
        </Button>
      </div>

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
          className: "bg-green-700 text-white w-full md:w-auto hover:!bg-green-500",
        }}
      >
        <Input
          type="number"
          placeholder="Enter key from 1 to 99"
          value={menuKey ?? ""}
          onChange={(e) => setMenuKey(Number(e.target.value))}
        />
      </Modal>
    </>
  );
};

export default AddMenu;
