import DashboardLayout from "@/components/layouts/dashboard-layout";
import NotFoundPage from "@/NotFoundPage";
import ChangePassword from "@/pages/auth/change-password";
import ForGetPassword from "@/pages/auth/forget-password";
import LoginPage from "@/pages/auth/login-page";
import ResetNewPassword from "@/pages/auth/reset-new-password";
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

const router = createBrowserRouter([
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
    element: (
      <ProtectedRoute>
        <ChangePassword />
      </ProtectedRoute>
    ),
  },
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
