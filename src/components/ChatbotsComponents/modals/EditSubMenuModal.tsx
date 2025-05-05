import React from 'react';
import { Modal, Input } from 'antd';
import { Menu } from '@/lib/types/menu';

interface EditSubMenuModalProps {
  visible: boolean;
  subMenuToEdit: Menu | null;
  setSubMenuToEdit: React.Dispatch<React.SetStateAction<Menu | null>>;
  onOk: () => void;
  onCancel: () => void;
}

const EditSubMenuModal: React.FC<EditSubMenuModalProps> = ({
  visible,
  subMenuToEdit,
  setSubMenuToEdit,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      open={visible}
      title="Edit Sub Menu"
      onOk={onOk}
      onCancel={onCancel}
      okText="Save"
      okButtonProps={{
        className: "bg-green-700 text-white hover:!bg-green-500",
      }}
    >
      <div className="flex flex-col gap-4 mt-4">
        <Input
          placeholder="Sub Menu Name"
          value={subMenuToEdit?.name}
          onChange={(e) =>
            setSubMenuToEdit((prev) =>
              prev ? { ...prev, name: e.target.value } : null
            )
          }
        />
        <Input
          placeholder="Sub Menu Key"
          type="number"
          value={subMenuToEdit?.key}
          onChange={(e) =>
            setSubMenuToEdit((prev) =>
              prev ? { ...prev, key: Number(e.target.value) } : null
            )
          }
        />
      </div>
    </Modal>
  );
};

export default EditSubMenuModal;
