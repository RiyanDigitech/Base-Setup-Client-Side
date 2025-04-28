import { Button, Input, Modal } from "antd";

import React from 'react'

interface EditMenuModalProps {
    isOpenSubMenuEditModal: boolean;
    handleCancel: () => void;
    menu: {
      name: string;
      key: number;
      [key: string]: any; // optional if menu may have other props
    };
  }
  

const EditMenuModal:React.FC<EditMenuModalProps> = (
    {
        isOpenSubMenuEditModal,
        handleCancel,
        menu,
    }:any
) => {
  return (
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
  )
}

export default EditMenuModal

