import { Spin, TableColumnsType, Modal } from "antd";
import "../../../index.css";
import { Franchiselist } from "@/lib/types/franchise";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FranchiseListTableColumns = (): {
  columns: TableColumnsType<Franchiselist>;
  modal: JSX.Element;
} => {
  const [targetId, setTargetId] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

  const navigate = useNavigate();

  const handleEditFranchise = (id: number) => {
    navigate(`/franchise-edit/${id}`);
  };

  const showDeleteConfirmation = (id: number) => {
    setTargetId(id); // Set target ID for deletion
    setIsModalVisible(true); // Show confirmation modal
  };

  const handleCancelDelete = () => {
    setTargetId(0); // Reset target ID
    setIsModalVisible(false); // Close the modal
  };

  const columns: TableColumnsType<Franchiselist> = [
    {
      title: "Name",
      dataIndex: "username",
      className: "w-fit ",
      key: "username",
      render: (username: string) => (
        <div className="lg:w-fit rounded-md">{username}</div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      className: "w-fit ",
      key: "email",
      render: (email: string) => (
        <div className="lg:w-fit rounded-md">{email}</div>
      ),
    },
    {
      title: "Mobile",
      dataIndex: "phone",
      className: "w-fit ",
      key: "phone",
      render: (phone: string) => (
        <div className="lg:w-fit rounded-md">{phone}</div>
      ),
    },
    {
      title: "Office Name",
      dataIndex: "officeName",
      className: "w-fit user-edit-profile-role-column",
      key: "officeName",
      render: (officeName: string) => (
        <div className="lg:w-fit rounded-md">{officeName.slice(0, 10)}</div>
      ),
    },
    {
      title: "Office Address",
      dataIndex: "officeAddress",
      className: "w-fit user-edit-profile-role-column",
      key: "officeAddress",
      render: (officeAddress: string) => (
        <div className="lg:w-fit rounded-md">{officeAddress.slice(0, 10)}</div>
      ),
    },
    {
      title: "District",
      dataIndex: "district",
      className: "w-fit ",
      key: "district",
      render: (district: string) => (
        <div className="lg:w-fit rounded-md">{district}</div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      className: "w-fit ",
      key: "action",
      render: (_, record) => (
        <div className="lg:w-fit rounded-md flex">
          <button
            onClick={() => handleEditFranchise(record.id)}
            className="cursor-pointer"
          >
            <img src="edit.png" alt="" />
          </button>
          <button
            onClick={() => showDeleteConfirmation(record.id)} // Show confirmation modal
            className="ml-3 cursor-pointer"
          >
            <>
              <img src="del.png" alt="" />
            </>
          </button>
        </div>
      ),
    },
  ];

  const modal = (
    <Modal
      title="Confirm Deletion"
      visible={isModalVisible}
      onCancel={handleCancelDelete}
      okText="Yes, Delete"
      cancelText="No"
      okButtonProps={{
        style: {
          backgroundColor: "#008444",
          color: "white",
          fontSize: "14px",
          padding: "6px 16px",
          borderRadius: "4px",
        },
      }}
      cancelButtonProps={{
        style: {
          color: "#FF6820",
        },
      }}
    >
      <p>Are you sure you want to delete this franchise?</p>
    </Modal>
  );

  return { columns, modal };
};

export default FranchiseListTableColumns;
