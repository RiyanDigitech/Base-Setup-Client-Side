import { Input, Modal } from 'antd';
import React from 'react'

interface AddSubMenuModalProps {
    isSubMenuModalOpen: boolean;
    handleAddSubMenu: () => void;
    setIsSubMenuModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSubMenuName: React.Dispatch<React.SetStateAction<string>>;
    setSubMenuKey: React.Dispatch<React.SetStateAction<number | null>>;
    subMenuName: string;
    subMenuKey: number | null;
  }
  

const AddSubMenuModal:React.FC<AddSubMenuModalProps> = (
    {
        isSubMenuModalOpen,
        handleAddSubMenu,
        setIsSubMenuModalOpen,
        setSubMenuName,
        setSubMenuKey,
        subMenuName,
        subMenuKey
    }:any
) => {
  return (
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
  )
}

export default AddSubMenuModal