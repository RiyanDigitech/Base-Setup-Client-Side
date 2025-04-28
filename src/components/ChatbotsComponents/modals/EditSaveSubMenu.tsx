import { Button, Input, Modal } from 'antd'
import React from 'react'

interface EditSaveSubMenuProps {
    subMenuModal: boolean;
    handleSubmenuCancel: () => void;
    menu: {
      name: string;
      key: number;
      [key: string]: any; // for any extra properties like `id`, etc.
    };
  }

const EditSaveSubMenu:React.FC<EditSaveSubMenuProps>  = (
    {
        subMenuModal,
        handleSubmenuCancel,
        menu
    }:any
) => {
  return (
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
    
                        </Modal>
  )
}

export default EditSaveSubMenu