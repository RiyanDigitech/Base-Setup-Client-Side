import { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
// import { FaUser } from "react-icons/fa";
import { BarChartOutlined, BellOutlined, CalendarOutlined, FileTextOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, QuestionCircleOutlined, SearchOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
// import { MdShoppingBag } from "react-icons/md";
import { MdInventory2 } from "react-icons/md";
import { MdTask } from "react-icons/md";
import { MdReceipt } from "react-icons/md";
import { Input, Layout, Menu, theme, Dropdown } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../../index.css";
// import tokenService from "@/services/token.service";
// import { RiCustomerService2Fill } from "react-icons/ri";
import AuthService from "@/services/auth.service";
import { Footer } from "antd/es/layout/layout";
const { Header, Sider, Content } = Layout;
// import { jwtDecode } from "jwt-decode";
// import dayjs from "dayjs";

// const person = tokenService.getUser();
const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("");

  const [see, setSee] = useState(true);
  // const [lastPersonData, setLastPersonData] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const profileMenu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="3" icon={<QuestionCircleOutlined />}>
        Help
      </Menu.Item>
      <Menu.Item key="4" className="!text-red-500" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    // const token = tokenService?.getLocalAccessToken();
    // if (token) {
    //   try {
    //     const decodedToken = jwtDecode(token);
    //     const currentTime = dayjs()?.unix();
    //     console.log(decodedToken?.exp, "current time", currentTime);
    //     if (decodedToken?.exp && decodedToken?.exp < currentTime) {
    //       tokenService?.clearStorage();
    //       navigate("/admin/login");
    //     }
    //   } catch (error) {
    //     navigate("/admin/login");
    //   }
    // } else {
    //   navigate("/admin/login");
    // }
    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments.length > 0) {
      const cleanedSegment = pathSegments
        .filter((segment) => !/^\d+$/.test(segment)) // Ignore segments that are only numbers
        .join(" "); // Join remaining segments with a space

      // Replace dashes with spaces and capitalize words
      const readableTitle = cleanedSegment
        .replace(/-/g, " ") // Replace dashes with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize words
      setCurrentPage(readableTitle);
    }
    const handleResize = () => {
      if (window.outerWidth < 768) {
        setSee(false);
      } else {
        setSee(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);
  const getSiderWidth = () => {
    if (!see && collapsed) return 0;
    if (see && collapsed) return 70;
    if (see && !collapsed) return 240;
    if (!see && !collapsed) return 70;
    return 220;
  };

  const getMarginLeft = () => {
    if (!see && collapsed) return "ml-0";
    if (see && collapsed) return "ml-[73px] mr-[0px]";
    if (see && !collapsed && currentPage !== "Account Details")
      return "ml-[235px] mr-[0px]";
    if (see && !collapsed && currentPage === "Account Details")
      return "ml-[5px] mr-[0px]";
    if (!see && !collapsed) return "ml-[69px]";
    return "ml-[220px]";
  };

  const handleButtonClick = () => {
    navigate("/account-details");
  };
  console.log(see, collapsed);


  const { useFetchTargetedAdmin } = AuthService();

  const { data } = useFetchTargetedAdmin();

  console.log("admin data", data?.data);
  return (
    <>
      {" "}
      <Layout className="">
        <Sider
          className={`transition-all duration-300 h-full hide-scrollbar `}
          trigger={null}
          width={getSiderWidth()}
          style={{
            overflowY: "auto",

            position: "fixed",
            left: 0,
            background: colorPrimary,
            zIndex: 1000,
          }}
          collapsible
        >
          {getSiderWidth() > 70 && (
            <div className="w-full flex justify-center items-center opacity-100 h-19 ">
              <img
                className="h-10 w-40"
                src={"/Company_LOGO.png"}
                alt="logo"
                // width={180}
                height={10}
              />
            </div>
          )}{" "}
          {getSiderWidth() > 70 && (
            <div className="w-full flex  items-center opacity-100 h-17 ml-8 text-[#64748B] font-DMSans">
              APPS & PAGES
            </div>
          )}
          {getSiderWidth() === 70 && (
            <div className="w-full flex justify-center items-center bg-[#d4d4d4]">
              <img
                className="py-5 h-22 w-19 object-contain"
                src={"/Logo.png"}
                alt="logo"
              />
            </div>
          )}
          {/* {tokenService?.getUserRoleFromCookie() === "Admin" ? ( */}
          <>
            {" "}
            <Menu
              className=" mb-[80px] ant-dashboard-layout"
              style={{ background: colorPrimary }}
              mode={!see || (see && collapsed) ? "vertical" : "inline"}
              defaultSelectedKeys={[pathname]}
              onClick={({ key }) => navigate(key)}
              items={[
                {
                  key: "/",
                  icon: (
                    <MdDashboard
                      className={` ${collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                    />
                  ),
                  label: <div className="text-[#0F172A]">Dashboard</div>,
                },
                {
                  key: "/sentstatistics",
                  icon: (
                    <BarChartOutlined 
                    
                      className={`${collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                    />
                  ),
                  label: (
                    <div className=" text-[#0F172A]">Sent Statistics</div>
                  ),
                },
                {
                  key: "/sentmessage",
                  icon: (
                    <FileTextOutlined
                      className={`${collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                    />
                  ),
                  label: (
                    <div className=" text-[#0F172A]">Sent Message</div>
                  ),
                },
                {
                  key: "/complaint",
                  icon: (
                    <MdInventory2
                      className={`${collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                    />
                  ),
                  label: (
                    <div className="text-[#0F172A]">Complaint Management</div>
                  ),
                },
                {
                  key: "/service-list",
                  icon: (
                    <MdTask
                      className={`${collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                    />
                  ),
                  label: (
                    <div className="text-[#0F172A]">Service Management</div>
                  ),
                },
                {
                  key: "/lead-list",
                  icon: (
                    <MdReceipt
                      className={`${collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                    />
                  ),
                  label: <div className="text-[#0F172A]">Lead Management</div>,
                },

                {
                  key: "/account-details",
                  icon: (
                    <MdDashboard
                      className={` ${collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                    />
                  ),
                  label: <div className="">Settings</div>,
                },
              ]}
            />
          </>
        </Sider>
        {getSiderWidth() > 70 && currentPage === "Account Details" && (
          <>
            <div className="z-99999 ml-[239px] ">
              <div className="text-[#0F172A] font-bold py-5 ml-4  text-2xl">
                Setting
              </div>{" "}
              <div className="border-b-[1px] w-10/12 mx-auto ">
                <Input
                  // size="large"
                  placeholder="Search in setting"
                  prefix={<img src="/preffixsearch.png" />}
                  className="border-none bg-[#f8fafc] pl-2"
                />
              </div>
              <div
                onClick={handleButtonClick} // Add navigation here
                className={`flex items-center mt-8 mx-auto   w-10/12 p-3 cursor-pointer ${currentPage === "Account Details" ? "bg-[#e2e8f0]" : ""
                  }`}
              >
                <span className="ml-0">
                  <img src="man.png" alt="" />
                </span>
                <div
                  className={`ml-2 text-[#1E293B] font-DMSans
                }`}
                >
                  Accounts Details
                </div>
              </div>{" "}
              <div
                className={`flex items-center mt-2 mx-auto   w-10/12 p-3 cursor-pointer `}
              >
                <span className="ml-0">
                  <img src="security.png" alt="" />
                </span>
                <div
                  className={`ml-2 text-[#1E293B] font-DMSans
                }`}
                >
                  Security
                </div>
              </div>{" "}
              <div
                className={`flex items-center mx-auto   w-10/12 p-3 cursor-pointer `}
              >
                <span className="ml-0">
                  <img src="notifications.png" alt="" />
                </span>
                <div
                  className={`ml-2 text-[#1E293B] font-DMSans
                }`}
                >
                  Notification
                </div>
              </div>{" "}
              <div
                className={`flex items-center mx-auto   w-10/12 p-3 cursor-pointer `}
              >
                <span className="ml-0">
                  <img src="billing.png" alt="" />
                </span>
                <div
                  className={`ml-2 text-[#1E293B] font-DMSans
                }`}
                >
                  Plan & Billing
                </div>
              </div>
            </div>
          </>
        )}{" "}
        <Layout className="p-6 !rounded-xl">
        <Header
  className={`bg-white shadow-md flex items-center ${getMarginLeft()} transition-all duration-300 p-4`}
  style={{
    paddingLeft: 24,
    paddingRight: 24,
    height: "auto", // height auto so content can wrap
  }}
>
  <div className="flex flex-wrap md:flex-nowrap justify-between items-center w-full gap-4">
    {/* Left Side Icons */}
    <div className="flex items-center gap-5 text-xl w-full md:w-auto justify-start">
      <button onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </button>
      <FileTextOutlined />
      <CalendarOutlined />
    </div>

    {/* Right Side Profile Section */}
    <div className="flex flex-col md:flex-row md:items-center justify-between w-full md:w-auto gap-4 md:gap-6 text-center md:text-left">
      <div className="flex items-center gap-4 text-xl justify-center">
        <h2 className="text-[17px] font-bold leading-tight text-gray-500">195 SMS</h2>
        <SearchOutlined />
        <BellOutlined />
      </div>

      <div className="flex items-center justify-center md:justify-start gap-4 relative cursor-pointer">
        <div className="space-y-0 mt-1">
          <h2 className="text-[14px] font-bold leading-tight text-gray-500">
            Rabees Waheed
          </h2>
          <h2 className="text-[12px] font-bold leading-tight text-gray-500">
            Account ID # 1263
          </h2>
        </div>

        <Dropdown overlay={profileMenu} placement="bottomRight" arrow>
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="/profilelgo.png"
            alt="profile"
          />
        </Dropdown>

        {/* Green dot for online status */}
        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></span>
      </div>
    </div>
  </div>
</Header>


          <Content
            className={`${getMarginLeft()} transition-all duration-300 `}
            style={{
              // paddingLeft: 18,
              minHeight: "100vh",
              backgroundColor: "#f8fafc",
              // paddingTop: 12,
            }}
          >
            <Outlet />
          </Content>{" "}
        </Layout>
      </Layout>{" "}
      <Footer
        className={` transition-all duration-300  ${getMarginLeft()} z-9999 bg-gray-100`}
      // style={{
      //   position: "fixed",
      //   left: 0,
      //   bottom: 0,
      //   width: "100%",
      //   zIndex: 1000,
      // }}
      >
        
         <div className="flex justify-between">
         <div className="flex justify-center">
         <h2 className="">COPYRIGHT © 2025WA.</h2>
            <h2 className='text-blue-500 cursor-pointer underline'>DIGITECHINFRA.COM</h2>
           <h2 className="">All rights Reserved</h2>
         </div>
         <div className="flex justify-center">
           <h2 className="">Hand-crafted & Made with ♥</h2>
         </div>
         </div>
         
      </Footer>
    </>
  );
};

export default DashboardLayout;
