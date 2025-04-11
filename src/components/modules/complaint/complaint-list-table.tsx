import { TableColumnsType } from "antd";
import "../../../index.css";
import { useNavigate } from "react-router-dom";
import { Complaint } from "@/lib/types/complaint";
const ComplaintListTableColumns = (): TableColumnsType<Complaint> => {
  const navigate = useNavigate();
  const handleEditComplaint = (id: number) => {
    navigate(`/complaint-details/${id}`);
  };
  return [
    {
      title: "Id",
      dataIndex: "complaintId",
      className: "w-fit ",
      key: "complaintId",
      render: (complaintId: number) => (
        <div className="lg:w-fit  rounded-md ">{complaintId}</div>
      ),
    },
    {
      title: "Name",
      dataIndex: "applicantName",
      className: "w-fit user-edit-profile-role-column",
      key: "applicantName",
      render: (applicantName: string) => (
        <div className="lg:w-fit  rounded-md ">{applicantName}</div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      className: "w-fit ",
      key: "email",
      render: (email: string) => (
        <div className="lg:w-fit  rounded-md ">{email}</div>
      ),
    },
    {
      title: "Title",
      dataIndex: "complaint",
      className: "w-fit ",
      key: "complaint",
      render: (complaint: string) => (
        <div
          className="lg:w-32 truncate overflow-hidden text-ellipsis whitespace-nowrap rounded-md"
          title={complaint} // Full text on hover
        >
          {complaint}
        </div>
        // <div className="lg:w-fit  rounded-md ">{complaint}</div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      className: " lg:w-fit user-edit-profile-role-column",
      key: "date",
      render: (date: string) => (
        <div className=" lg:w-fit  rounded-md ">{date.slice(0, 10)}</div>
      ),
    },

    {
      title: "Status",
      dataIndex: "complaintStatus",
      className: "w-fit user-edit-profile-role-column ",
      key: "complaintStatus",
      render: (_, record) => (
        <button
          className={`lg:w-fit   p-2 rounded-lg cursor-default ${
            record.complaintStatus === "Resolved"
              ? "text-[#008444] bg-[#cffce6] "
              : "text-[#D9781F] bg-[#fbf1e9]"
          }`}
        >
          {record.complaintStatus === "Resolved" ? "Resolved" : "In Progress"}
        </button>
      ),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      className: "w-fit ",
      key: "mobile",
      render: (mobile: string) => (
        <div className="lg:w-fit  rounded-md ">{mobile}</div>
      ),
    },
    {
      title: "Action",
      dataIndex: "complaintStatus",
      className: "w-fit ",
      key: "*",
      render: (_, record) => (
        <button
          className={`lg:w-fit cursor-pointer rounded-md border-[1px] border-[#CBD5E1] text-[#0F172A] p-2 ${
            record?.complaintStatus === "Resolved" ? "hidden" : "block"
          }`}
          onClick={() => handleEditComplaint(record?.complaintId)}
        >
          {record?.complaintStatus === "Resolved" ? "" : "Manage"}
        </button>
      ),
    },
  ];
};

export default ComplaintListTableColumns;
