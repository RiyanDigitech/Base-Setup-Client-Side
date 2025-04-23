import { RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";

import router from "./routes";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function App() {
  return (
    <ConfigProvider
  theme={{
    token: {
      colorPrimary: "#ffffff",
      fontFamily: "DM Sans",
    },
    components: {
      Menu: {
        itemSelectedBg: "#e2e8f0",
        itemColor: "#ffffff",
        colorBgBase: "#FAFAF2",
      },
      Layout: {
        colorBgHeader: "#ffffff",
        colorBgBody: "#f8fafc",
      },
      Checkbox: {
        colorPrimary: "#059669", // Tailwind green-600
        colorPrimaryActive: "#10b981", // Tailwind green-500
        colorPrimaryHover: "#4ade80", // Tailwind green-400
      },
    },
  }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ConfigProvider>
  );
}
export default App;
