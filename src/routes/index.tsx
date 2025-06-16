import DashboardLayout from "@/components/layouts/dashboard-layout";
import NotFoundPage from "@/NotFoundPage";
import ChangePassword from "@/pages/auth/change-password";
import ForGetPassword from "@/pages/auth/forget-password";
import LoginPage from "@/pages/auth/login-page";
import Chatbots from "@/pages/Chatbots/Chatbots";
import DashboardPage from "@/pages/dashboard";
import LeadList from "@/pages/lead-management/lead-management";
import FranchiseLeadList from "@/pages/lead-management/targeted-franchise-lead-list";
import FranchiseSendQuotation from "@/pages/send-quotation/franchise-send-quotation";
import SendQuotation from "@/pages/send-quotation/send-quotation";
import SentMessage from "@/pages/SentMessage/SentMessage";
import SentStatistics from "@/pages/SentStatistics/SentStatistics";
import Settings from "@/pages/Settings/Settings";
import { createBrowserRouter } from "react-router-dom";
import ServiceDetails from '@/components/modules/service/update-service';
import CreateNewService from "@/components/modules/service/create-new-service";
import FranchiseCreate from "@/components/modules/franchise/franchise-create";
import FranchiseUpdate from "@/components/modules/franchise/franchise-update";
import ComplainDetails from "@/pages/complaint-details/complain-details";
import ProtectedRoute from "./ProtectedRoutes";
import RolePermissionUI from "@/pages/RolesAndPermissions/RolesAndPermission";
import Resetnewpassword from "@/pages/auth/Reset-new-password";

import UserManagement from "@/pages/user-management/UserManagement";

import Permission from "@/pages/Permission/permission";
import Chats from "@/pages/Chats/Chats";
import ReplyChat from "@/pages/Chats/ReplyChat";
import FailedMessageTable from "@/components/DashboardComponents/FailedMessageTable";
import PublicRoute from "./PublicRoute";


const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: (
    <PublicRoute>
      <LoginPage />
    </PublicRoute>
  ),
  },
  {
    path: "/admin/changeresetpassword",
    element: (
    <PublicRoute>
      <Resetnewpassword />
    </PublicRoute>
  ),
  },
  {
    path: "/admin/forgot-password",
    element: (
    <PublicRoute>
      <ForGetPassword />
    </PublicRoute>
  ),
  },
  // {
  //   path: "/admin/change-password",
  //   element: (
  //     <ProtectedRoute>
  //       <ChangePassword />
  //     </ProtectedRoute>
  //   ),
  // },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/franchise-lead/:id", element: <FranchiseSendQuotation /> },
      { path: "/lead", element: <FranchiseLeadList /> },
      { path: "/send-quotation/:id", element: <SendQuotation /> },
      { path: "/settings", element: <Settings /> },
      { path: "/chatbots", element: <Chatbots /> },
      { path: "/create-franchise", element: <FranchiseCreate /> },
      { path: "/franchise-edit/:id", element: <FranchiseUpdate /> },
      { path: "/complaint-details/:id", element: <ComplainDetails /> },
      { path: "/add-new-service", element: <CreateNewService /> },
      { path: "/service-details/:id", element: <ServiceDetails /> },
      { path: "/chats", element: <Chats /> },
      { path: "/chat-reply/:waNumber", element: <ReplyChat /> },
      { path: "/chat-reply/:waNumber/message", element: <ReplyChat /> },
      // { path: "/chat-reply", element: <ReplyChat /> },
      { path: "/lead-list", element: <LeadList /> },
      { path: "/sentstatistics", element: <SentStatistics /> },
      { path: "/sentmessage", element: <SentMessage /> },
      { path: "/role&permission", element: <RolePermissionUI /> },

      { path: "/user-management", element: <UserManagement /> },

      { path: "/permission", element: <Permission /> },



      { path: "/failedSMS", element: <FailedMessageTable /> },



    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
