import { TableColumnsType } from "antd";
import "../../../index.css";
// import { useNavigate } from "react-router-dom";
import { Lead, User } from "@/lib/types/lead";
const CustomerListTableColumns = (): TableColumnsType<Lead> => {
  //   const navigate = useNavigate();
  //   const handleEditFranchise = (id: number) => {
  //     navigate(`/lead/quotation/${id}`);
  //   };
  return [
    {
      title: "Id",
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
          {user ? user.username.slice(0, 20) + "..." : "No Name"}
          {/* Display the username */}
        </div>
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
    // {
    //   title: "Applicant Name",
    //   dataIndex: "applicantName",
    //   className: "w-fit ",
    //   key: "applicantName",
    //   // ellipsis: true,
    //   render: (applicantName: string | null) => (
    //     <div className="lg:w-fit rounded-md">
    //       {applicantName ? applicantName : "-"}{" "}
    //       {/* If applicantName exists, show it, otherwise show "-" */}
    //     </div>
    //   ),
    // },
    {
      title: "State",
      dataIndex: "state",
      className: "w-fit user-edit-profile-role-column",
      key: "state",
      render: (state: string) => (
        <div className="lg:w-fit  rounded-md ">{state}</div>
      ),
    },
    {
      title: "District",
      dataIndex: "district",
      className: "w-fit user-edit-profile-role-column",
      key: "district",
      render: (district: string) => (
        <div className="lg:w-fit  rounded-md ">{district}</div>
      ),
    },
    {
      title: "Taluk",
      dataIndex: "taluk",
      className: "w-fit ",
      key: "taluk",
      render: (taluk: string) => (
        <div className="lg:w-fit  rounded-md ">{taluk}</div>
      ),
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   className: "w-fit ",
    //   key: "action",
    //   render: () => (
    //     <div className="lg:w-fit  rounded-md flex">
    //       <div
    //         className="cursor-pointer"
    //         // onClick={() => handleUpdateService(record.id)}
    //       >
    //         <img src="edit.png" alt="" />
    //       </div>
    //       <button
    //         // onClick={() => showDeleteConfirmation(record.id)} // Trigger confirmation modal
    //         className="ml-3 cursor-pointer"
    //         // disabled={isPending}
    //       >
    //         {/* {isPending && targetId === record.id ? ( */}
    //         {/* <Spin className="custom-table-spinner  " />
    //         ) : ( */}
    //         <img src="del.png" alt="" />
    //         {/* )} */}
    //       </button>
    //     </div>
    //   ),
    // },
  ];
};

export default CustomerListTableColumns;
