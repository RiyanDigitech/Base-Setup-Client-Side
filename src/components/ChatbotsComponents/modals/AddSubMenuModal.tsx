import { Modal, Input } from 'antd';
import React from 'react';

interface AddSubMenuModalProps {
  visible: boolean;
  onOk: (name: string, key: string) => void;
  onCancel: () => void;
  name: string;
  setName: (value: string) => void;
  menuKey: string;
  setMenuKey: (value: string) => void;
}

const AddSubMenuModal: React.FC<AddSubMenuModalProps> = ({
  visible,
  onOk,
  onCancel,
  name,
  setName,
  menuKey,
  setMenuKey,
}) => {
  return (
    <Modal
      title="Add Sub Menu"
      visible={visible}
      onOk={() => onOk(name, menuKey)}
      onCancel={onCancel}
      okText="Add"
    >
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Sub Menu Text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Sub Menu Key"
          value={menuKey}
          onChange={(e) => setMenuKey(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default AddSubMenuModal;
