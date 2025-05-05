import React from "react";
import { Modal, Radio, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface Props {
  open: boolean;
  contentType: "Text" | "Image" | "Document";
  contentValue: string;
  setContentType: (type: "Text" | "Image" | "Document") => void;
  setContentValue: (value: string) => void;
  onOk: () => void;
  onCancel: () => void;
  editContentInfo: {
    menuId: number | null;
    contentId: number | null;
  } | null;
  setEditContentInfo: React.Dispatch<React.SetStateAction<{
    menuId: number | null;
    contentId: number | null;
  } | null>>;
}

const AddContentModal: React.FC<Props> = ({
  open,
  contentType,
  contentValue,
  setContentType,
  setContentValue,
  onOk,
  onCancel,
  editContentInfo,
  setEditContentInfo
}) => {
  return (
    <Modal
    title={editContentInfo ? "Edit Content" : "Add Content"}
      open={open}
      onOk={onOk}
      onCancel={() => {
        setEditContentInfo(null);
        onCancel();
      }}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        className: "bg-green-700 text-white hover:!bg-green-500",
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

      <div className="mt-4">
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
              className="bg-green-700 text-white hover:!bg-green-500"
            >
              Upload {contentType}
            </Button>
          </Upload>
        )}
      </div>
    </Modal>
  );
};

export default AddContentModal;
