import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "@/pages/dashboard";
import DashboardLayout from "@/components/layouts/dashboard-layout";

// import ProtectedRoute from "./protected-routes";
import ChangePassword from "@/pages/auth/change-password";
import ResetNewPassword from "@/pages/auth/reset-new-password";
import ComplainDetails from "@/pages/complaint-details/complain-details";
import FranchiseCreate from "@/components/modules/franchise/franchise-create";
import CreateNewService from "@/components/modules/service/create-new-service";
import LeadList from "@/pages/lead-management/lead-management";
import SendQuotation from "@/pages/send-quotation/send-quotation";
// import ProtectedRoute from "./protected-routes";
import FranchiseUpdate from "@/components/modules/franchise/franchise-update";
import ServiceDetails from "@/components/modules/service/update-service";
import ForGetPassword from "@/pages/auth/forget-password";
import LoginPage from "@/pages/auth/login-page";
import FranchiseLeadList from "@/pages/lead-management/targeted-franchise-lead-list";
import FranchiseSendQuotation from "@/pages/send-quotation/franchise-send-quotation";
import SentStatistics from "@/pages/SentStatistics/SentStatistics";
import SentMessage from "@/pages/SentMessage/SentMessage";
import Settings from "@/pages/Settings/Settings";
import Chatbots from "@/pages/Chatbots/Chatbots";
// import AddressAutocomplete from "@/pages/location";

const router = createBrowserRouter([
  {
    path: "/admin/reset-password/:token",
    element: <ResetNewPassword />,
    index: true,
  },
  // {
  // element: <ProtectedRoute roleAllowed={["Admin", "Franchise"]} />,
  // children: [
  {
    path: "/admin/login",
    element: <LoginPage />,
    index: true,
  },

  {
    path: "/admin/change-password",
    element: <ChangePassword />,
    index: true,
  },
  {
    path: "/admin/forgot-password",
    element: <ForGetPassword />,
    index: true,
  },
  {
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/franchise-lead/:id", element: <FranchiseSendQuotation /> },
      { path: "/lead", element: <FranchiseLeadList /> },
      { path: "/send-quotation/:id", element: <SendQuotation /> },
    ],
  },
  // ],
  // },

  // Admin-only routes
  // {
  // element: <ProtectedRoute roleAllowed={["Admin"]} />,
  // children: [
  {
    element: <DashboardLayout />,
    children: [
      { path: "/settings", element: <Settings /> },
      { path: "/chatbots", element: <Chatbots /> },
      { path: "/create-franchise", element: <FranchiseCreate /> },
      { path: "/franchise-edit/:id", element: <FranchiseUpdate /> },
      { path: "/sentstatistics", element: <SentStatistics /> },
      { path: "/complaint-details/:id", element: <ComplainDetails /> },
      { path: "/add-new-service", element: <CreateNewService /> },
      { path: "/service-details/:id", element: <ServiceDetails /> },
      { path: "/lead-list", element: <LeadList /> },
      { path: "/send-quotation/:id", element: <SendQuotation /> },

      { path: "/sentmessage", element: <SentMessage /> },
      // { path: "/service-list", element: <ServiceList /> },
    ],
  },
  //   ],
  // },

  // Catch-all for 404 errors
  {
    path: "/admin/login",
    element: <LoginPage />,
  },
]);

export default router;
