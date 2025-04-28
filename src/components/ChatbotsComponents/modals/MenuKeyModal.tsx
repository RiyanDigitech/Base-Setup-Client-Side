import { Input, Modal } from 'antd';
import React from 'react'
interface MenuKeyModalProps {
    isMenuModalOpen: boolean;
    handleConfirmAddMenu: () => void;
    setIsMenuModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setMenuKey: React.Dispatch<React.SetStateAction<number | null>>;
    menuKey: number | null;
  }
  
const MenuKeyModal:React.FC<MenuKeyModalProps> = (
    {
        isMenuModalOpen,
        handleConfirmAddMenu,
        setIsMenuModalOpen,
        setMenuKey,
        menuKey

    }:any
) => {
  return (
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
  )
}

export default MenuKeyModal