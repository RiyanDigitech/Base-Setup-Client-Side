import DashboardLayout from "@/components/layouts/dashboard-layout";

import LoginPage from "@/pages/auth/login-page";
import ChangePassword from "@/pages/auth/change-password";
import ForGetPassword from "@/pages/auth/forget-password";
import ResetNewPassword from "@/pages/auth/reset-new-password";
import NotFoundPage from "@/NotFoundPage";

import DashboardPage from "@/pages/dashboard";
import FranchiseSendQuotation from "@/pages/send-quotation/franchise-send-quotation";
import FranchiseLeadList from "@/pages/lead-management/targeted-franchise-lead-list";
import SendQuotation from "@/pages/send-quotation/send-quotation";
import Settings from "@/pages/Settings/Settings";
import Chatbots from "@/pages/Chatbots/Chatbots";
import FranchiseCreate from "@/components/modules/franchise/franchise-create";
import FranchiseUpdate from "@/components/modules/franchise/franchise-update";
import ComplainDetails from "@/pages/complaint-details/complain-details";
import CreateNewService from "@/components/modules/service/create-new-service";
import ServiceDetails from "@/components/modules/service/update-service";
import LeadList from "@/pages/lead-management/lead-management";
import SentStatistics from "@/pages/SentStatistics/SentStatistics";
import SentMessage from "@/pages/SentMessage/SentMessage";
import { createBrowserRouter} from "react-router-dom";

const router = createBrowserRouter([
  // { path: "/", element: <Navigate to="/admin/login" /> },

  {
    path: "/admin/login",
    element: <LoginPage />,
  },
  {
    path: "/admin/forgot-password",
    element: <ForGetPassword />,
  },
  {
    path: "/admin/reset-password/:token",
    element: <ResetNewPassword />,
  },
  {
    path: "/admin/change-password",
    element: <ChangePassword />,
  },

  {
    element: (
      <DashboardLayout />
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
      { path: "/lead-list", element: <LeadList /> },
      { path: "/sentstatistics", element: <SentStatistics /> },
      { path: "/sentmessage", element: <SentMessage /> },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
