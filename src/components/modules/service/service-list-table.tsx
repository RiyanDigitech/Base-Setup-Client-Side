import { Spin, TableColumnsType, Modal } from "antd";
import "../../../index.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ServiceListType } from "@/lib/types/service";

const ServiceListTableColumns = (
  refetch: () => void,
  setChanges: React.Dispatch<React.SetStateAction<boolean>>
): {
  columns: TableColumnsType<ServiceListType>;
  modal: JSX.Element;
} => {
  const [targetId, setTargetId] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // State for Modal visibility
  const navigate = useNavigate();
  const truncateHtml = (html: string, length: number) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const text = doc.body.textContent || "";
    return text.slice(0, length) + (text.length > length ? "..." : "");
  };
  const showDeleteConfirmation = (id: number) => {
    setTargetId(id);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {};
  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  const handleUpdateService = (id: number) => {
    navigate(`/service-details/${id}`);
  };

  const columns: TableColumnsType<ServiceListType> = [
    {
      title: "Service",
      dataIndex: "service",
      className: "w-fit ",
      key: "service",
      render: (_, record: ServiceListType) => (
        <div className="flex items-center space-x-4">
          <img
            src={record?.image || "/service.png"}
            alt={record?.title}
            className="min-w-10 min-h-10 object-cover w-3/4 max-w-15 max-h-15"
          />
          <span>{record?.title}</span>
        </div>
      ),
    },

    {
      title: "Description",
      dataIndex: "description",
      className: "w-fit ",
      key: "description",
      // ellipsis: window.innerWidth >= 1024,
      render: (description: string) => (
        <div
          className="lg:w-fit rounded-md max-w-54"
          dangerouslySetInnerHTML={{ __html: truncateHtml(description, 15) }}
        />
      ),
    },
    {
      title: "Fee Amount",
      dataIndex: "feeAmount",
      className: "w-fit ",
      key: "feeAmount",
      render: (feeAmount: string) => (
        <div className="lg:w-fit  rounded-md ">{feeAmount}</div>
      ),
    },
    {
      title: "Service Charge",
      dataIndex: "serviceCharge",
      className: "w-fit",
      key: "serviceCharge",
      render: (serviceCharge: string) => (
        <div className="lg:w-fit  rounded-md ">{serviceCharge}</div>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      className: "w-fit",
      key: "totalAmount",
      render: (totalAmount: string) => (
        <div className="lg:w-fit  rounded-md ">{totalAmount}</div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      className: "w-fit ",
      key: "action",
      render: (_, record) => (
        <div className="lg:w-fit  rounded-md flex">
          <div
            className="cursor-pointer"
            onClick={() => handleUpdateService(record.id)}
          >
            <img src="edit.png" alt="" />
          </div>
          <button
            onClick={() => showDeleteConfirmation(record.id)} // Trigger confirmation modal
            className="ml-3 cursor-pointer"
          >
            {/* {isPending && targetId === record.id ? (
              <Spin className="custom-table-spinner  " />
            ) : ( */}
            <img src="del.png" alt="" />
            {/* )} */}
          </button>
        </div>
      ),
    },
  ];

  const modal = (
    <Modal
      title="Confirm Deletion"
      visible={isModalVisible}
      onOk={handleConfirmDelete}
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
      <p>Are you sure you want to delete this service?</p>
    </Modal>
  );

  return { columns, modal };
};

export default ServiceListTableColumns;
