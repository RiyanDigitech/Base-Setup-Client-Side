import { TableColumnsType } from "antd";
import "../../../index.css";
import { useNavigate } from "react-router-dom";
import { Lead, User } from "@/lib/types/lead";
const FranchiseLeadListTableColumns = (): TableColumnsType<Lead> => {
  const navigate = useNavigate();
  // const handleEditFranchise = (id: number) => {
  //   navigate(`/lead/${id}`);
  // };
  return [
    {
      title: "Work Id",
      dataIndex: "id",
      className: "w-fit ",
      key: "id",
      render: (id: string) => <div className="lg:w-fit  rounded-md ">{id}</div>,
    },
    {
      title: "Name",
      dataIndex: "user", // Change this to "user" to access the `user` object
      className: "w-fit ",
      key: "user", // Use "user" as the key
      render: (user: User) => (
        <div className="lg:w-fit rounded-md">
          {user ? user.username : "No Name"} {/* Display the username */}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      className: "w-fit user-edit-profile-role-column",
      key: "createdAt",
      render: (createdAt: string) => (
        <div className="lg:w-fit  rounded-md ">{createdAt.slice(0, 10)}</div>
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
      title: "Mobile",
      dataIndex: "applicantMobile",
      className: "w-fit ",
      key: "applicantMobile",
      render: (applicantMobile: string) => (
        <div className="lg:w-fit  rounded-md ">{applicantMobile}</div>
      ),
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      className: "w-fit ",
      key: "applicantName",
      // ellipsis: true,
      render: (applicantName: string | null) => (
        <div className="lg:w-fit rounded-md">
          {applicantName ? applicantName : "-"}{" "}
          {/* If applicantName exists, show it, otherwise show "-" */}
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      className: "w-fit user-edit-profile-role-column",
      key: "title",
      render: (title: string) => (
        <div className="lg:w-fit  rounded-md ">{title}</div>
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
      className: "w-fit ",
      key: "action",
      render: (_, record) => (
        <div className="lg:w-fit  rounded-md flex">
          <button
            onClick={() => {
              // Conditional navigation
              if (record?.leadStatus === null) {
                navigate(`/franchise-lead/${record.id}`); // Navigate to lead/:id
              } else if (record?.leadStatus === "Payment Done") {
                navigate(`/payment-recieved/${record.id}`); // Navigate to payment-done/:id

                // navigate(`/payment-details/${record.id}`); // Navigate to payment-done/:id
              } else {
                console.log("No navigation for this status");
              }
            }}
            className={`cursor-pointer text-white text-xs p-2 rounded-lg ${
              record?.leadStatus === "Quotation Sent"
                ? "bg-[#FF6820]"
                : record?.leadStatus === "Payment Done"
                ? "bg-[#47921b]"
                : record?.leadStatus === null
                ? "bg-[#f18891]"
                : record?.leadStatus === "Payment Failed"
                ? "bg-[#f12a3b]"
                : "bg-[#008444]"
            }`}
          >
            {record?.leadStatus === null
              ? "Send Quotation "
              : record?.leadStatus.slice(0, 15)}
          </button>
        </div>
      ),
    },
  ];
};

export default FranchiseLeadListTableColumns;
