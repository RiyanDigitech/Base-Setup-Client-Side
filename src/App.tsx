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
            itemColor: "white",
            colorBgBase: "#FAFAF2",
          },
          Layout: {
            colorBgHeader: "#ffffff",
            colorBgBody: "#f8fafc",
          },
          Checkbox: {
            colorPrimary: "#008444",
            colorPrimaryActive: "#036536",
            colorPrimaryHover: "#03a557",
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  );
}
export default App;
