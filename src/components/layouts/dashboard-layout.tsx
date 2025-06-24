import { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { BarChartOutlined, BellOutlined, MessageOutlined, CalendarOutlined, FileTextOutlined, HomeOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, OrderedListOutlined, RedditOutlined, SearchOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import echo from '@/utils/echo';
import moment from 'moment';
import { Input, Layout, Menu, theme, Dropdown, Badge, Button, Avatar } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthService from "@/services/auth.service";
import { Footer } from "antd/es/layout/layout";
import { logoutFunc } from "@/services/authService/AuthService";
const { Header, Sider, Content } = Layout;
import "../../index.css";
import { ChatItem } from "@/lib/types/ChatItem";



const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  const handleLogout = async () => {
    const success = await logoutFunc();
    if (success) {
      navigate("/");
    } else {
      // message.error("Something went Wrong")
    }
  };




  const [see, setSee] = useState(true);
  const [notifications, setNotifications] = useState<{ id: string; text: string }[]>([]);
  const [visible, setVisible] = useState(false);
  const [clickedIds, setClickedIds] = useState<string[]>([]);


  // const [lastPersonData, setLastPersonData] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const profileMenu = (
    <Menu>
      {/* <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/settings">Profile</Link>
      </Menu.Item> */}

      <Menu.Item key="2" icon={<SettingOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>

      {/* <Menu.Item key="3" icon={<QuestionCircleOutlined />}>
        Help
      </Menu.Item> */}

      <Menu.Item
        key="4"
        onClick={handleLogout}
        className="!text-red-500"
        icon={<LogoutOutlined />}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  // const notifications = [
  //   { id: 1, text: "New booking received" },
  //   { id: 2, text: "Room 101 is ready" },
  //   { id: 3, text: "New review submitted" },
  // ];

  // Pusher listener ke andar se setDataSource hattayein
  // useEffect(() => {
  //   const channel = echo.channel('new-message');
  //   channel.listen('.chat-new', (e: ChatItem) => {
  //     console.log('New message received:', e);

  //     // Only show notifications where message is "Message A"
  //     // if (e.message ==='A customer needs assistance') {
  //       setNotifications(prev => [
  //         ...prev,
  //         { id: e.wa_id, text: `${e.wa_id}` }
  //       ]);
  //     // }
  //   });

  //   return () => {
  //     echo.leave('new-message');
  //   };
  // }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!echo) {
        console.error("Echo is not initialized");
        return;
      }

      const channel = echo.channel('new-message');
      // console.log('dfbdf',echo)
      channel.listen('.chat-new', (e: ChatItem) => {
        // console.log('New message received:', e);
        setNotifications(prev => {
          const exists = prev.some(n => n.id === e.wa_id);
          if (exists) return prev;
          return [...prev, { id: e.wa_id, text: `${e.wa_id}` }];
        });
      });
    }, 1500); // Slight delay for safety

    return () => {
      clearTimeout(timeout);
      if (echo) echo.leave('new-message');
    };
  });






  const userDetails = localStorage.getItem('userdetails');
  const user = userDetails && userDetails !== "undefined" ? JSON.parse(userDetails) : {};

  const handleReply = (number: string) => {
    console.log(number);

    const notiId = notifications.find(
      (noti) => noti.text.split(":")[0] === number
    )?.id;

    if (notiId) {
      setClickedIds((prev) => [...prev, notiId]);
    }

    setVisible(false);
    navigate(`/chat-reply/${number}`);
  };




  const expiryStr = localStorage.getItem("token_expiry");
  const expiry = expiryStr ? Number(expiryStr) : 0;

  if (Date.now() > expiry) {
    localStorage.clear();
    window.location.href = "/";
  }
  // Notification Dropdown Menu
  const notificationMenu = (
    <div
      className="w-96 max-h-96 overflow-y-auto p-4 bg-white rounded shadow-lg"
      onMouseLeave={() => setVisible(false)} // yahan mouse nikalte hi band hoga
    >
      <h3 className="text-lg font-semibold mb-2 px-2">Notifications</h3>
      <hr />
      {notifications.map((noti, index) => (
        <div
          onClick={() => handleReply(noti.text.split(":")[0])}
          key={noti.id}
          className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-md"
        >
          <Avatar src="/profilelgo.png" size={40} />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm text-gray-800">
                {noti.text.split(":")[1]?.substring(0, 40) || "A customer needs assistance"}...
              </p>
            </div>

            {/* ✅ Static Badge Logic Based on Clicked ID */}
            {clickedIds.includes(noti.id) ? (
              <p className="text-xs text-gray-600">Message Seen ✅</p>
            ) : (
              <p className="text-xs text-gray-600">
                You Have a New Message
                <Badge count={1} style={{ backgroundColor: "#f5222d", marginLeft: 8 }} />
              </p>
            )}

            <p className="text-xs text-gray-600">
              Hi {user.name ? user.name : "user"} Number: {noti.text.split(":")[0]}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {moment().subtract(index, "days").format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </div>
        </div>
      ))}


      <div className="text-center mt-3">
        <Button
          type="primary"
          className="bg-green-600 hover:!bg-green-700 active:!scale-110"
          onClick={() => {
            setVisible(false);
            navigate("/chats");
          }}
        >
          See All Messages
        </Button>
      </div>
    </div>
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


  // const { useFetchTargetedAdmin } = AuthService();

  // const { data } = useFetchTargetedAdmin();



  // console.log("admin data", data?.data);
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
                  key: "/dashboard",
                  icon: (
                    <HomeOutlined
                      className={` ${collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                    />
                  ),
                  label: <div className="text-[#0F172A]">Dashboard</div>,
                },
                {
                  key: "/menu",
                  icon: (
                        <RedditOutlined
                          className={` ${collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                            }`}
                        />
                      ),
                  label: <div className="text-[#0F172A]">Menu</div>,
                },
                // {
                //   key: "sent-statistics",
                //   icon: (
                //     <MdDashboard
                //       className={`${collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                //         }`}
                //     />
                //   ),
                //   label: <div className="text-[#0F172A]">Accounts</div>,

                //   children: [
                //     {
                //       key: "/chatbots",
                //       icon: (
                //         <RedditOutlined
                //           className={` ${collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                //             }`}
                //         />
                //       ),
                //       label: <div className="text-[#0F172A]">Chatbots</div>,
                //     },

                //   ],
                // },

                {
                  key: "/statistics",
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
                  key: "/chats",
                  icon: (
                    <MessageOutlined

                      className={`${collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                    />
                  ),
                  label: (
                    <div className="flex gap-2">
                      <div className=" text-[#0F172A]">Chats</div>
                      <Badge className="mt-[11px]" count={clickedIds.length === notifications.length ? 0 : notifications.length} size="small" offset={[-2, 2]}></Badge>
                    </div>
                  ),
                },
                // {
                //   key: "/sentmessage",
                //   icon: (
                //     <FileTextOutlined
                //       className={`${collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                //         }`}
                //     />
                //   ),
                //   label: (
                //     <div className=" text-[#0F172A]">Sent Message</div>
                //   ),
                // },

                {
                  key: "/user",
                  icon: (
                    <UserOutlined
                      className={` ${collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                    />
                  ),
                  label: <div className="">User</div>,
                },
                {
                  key: "/settings",
                  icon: (
                    <SettingOutlined
                      className={` ${collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                    />
                  ),
                  label: <div className="">Settings</div>,
                },
                {
                  key: "/permission",
                  icon: (
                    <OrderedListOutlined
                      className={` ${collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                    />
                  ),
                  label: <div className="">Permission</div>,
                },
                {
                  key: "/roles",
                  icon: (
                    <OrderedListOutlined
                      className={` ${collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                    />
                  ),
                  label: <div className="">Role & Permission</div>,
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
            className={`bg-white shadow-md transition-all duration-300 ${getMarginLeft()} p-4`}
            style={{
              paddingLeft: 24,
              paddingRight: 24,
              height: "auto",
            }}
          >
            <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between overflow-x-auto gap-4">
              {/* Left Side */}
              <div className="flex items-center gap-4 text-xl flex-shrink-0">
                <button onClick={() => setCollapsed(!collapsed)}>
                  {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </button>
                {/* <FileTextOutlined className="hidden lg:block md:block sm:block" />
                <CalendarOutlined className="hidden lg:block md:block sm:block" /> */}
              </div>

              {/* Right Side */}
              <div className="flex items-center justify-end flex-nowrap gap-4 sm:gap-6 w-full overflow-x-auto">


                {/* SMS */}
                {/* <h2 className="text-[17px] hidden lg:block md:block sm:block font-bold text-gray-500 whitespace-nowrap">
                  195 SMS
                </h2> */}

                {/* Search */}
                {/* <div className="flex items-center">
                  <SearchOutlined
                    className="ms-2"
                    style={{ fontSize: "20px", cursor: "pointer" }}
                    onClick={toggleSearch}
                  />
                  {showSearch && (
                    <Input
                      className="!border mt-2 sm:mt-0"
                      placeholder="Search..."
                      style={{ width: 200, marginLeft: 10 }}
                      allowClear
                    />
                  )}
                </div> */}

                {/* Notification */}

                <Dropdown
                  overlay={notificationMenu}
                  trigger={["click"]}
                  placement="bottomRight"
                  open={visible}
                  onOpenChange={(open) => setVisible(open)}
                >
                  <Badge
                    count={clickedIds.length === notifications.length ? 0 : notifications.length}
                    size="small"
                    offset={[-2, 2]}
                  >
                    <BellOutlined className="ms-2 text-xl cursor-pointer hover:text-green-700 transition" />
                  </Badge>
                </Dropdown>



                {/* Profile */}
                <div className="flex items-center gap-3 relative cursor-pointer">
                  <div className="text-right hidden sm:block leading-tight">
                    <h2 className="text-[14px] font-bold text-gray-500">{user.name ? user.name : "user"}</h2>
                    <h2 className="text-[12px] font-bold text-gray-500">Account ID # 000{user.id ? user.id : "000"}</h2>
                  </div>

                  <Dropdown overlay={profileMenu} placement="bottomRight" arrow>
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src="/profilelgo.png"
                      alt="profile"
                    />
                  </Dropdown>

                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
              </div>
            </div>
          </Header>
          <Content
            className={`${getMarginLeft()} transition-all duration-300`}
            style={{
              // paddingLeft: 18,
              // minHeight: "100vh",
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

        <div className="lg:flex  lg:justify-between ">
          <div className="lg:flex md:flex sm:flex text-center justify-center">
            <h2 className="me-1">COPYRIGHT © 2025</h2>
            <a href="https://wa.digitechinfra.com/" className='text-blue-500 cursor-pointer underline'>WA.DIGITECHINFRA.COM</a>
            <h2 className="ms-1">All rights Reserved</h2>
          </div>
          {/* <div className="flex justify-center">
            <h2 className="">Hand-crafted & Made with ♥</h2>
          </div> */}
        </div>

      </Footer>   </>
  );
};

export default DashboardLayout;
