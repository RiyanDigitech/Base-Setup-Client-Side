import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/config/axios-instance";
import { message } from "antd";
import { TokenValue } from "../Base/TokenGet";

export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const { data } = await axios.get("/settings",{
        headers: {
                "Authorization": `Bearer ${TokenValue}`
              }
      });
      return data?.data?.filter(
        (item: any) =>
          item.key === "welcome_message" || item.key === "footer"
      );
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });
};
// UPDATE setting
export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { welcome: string; footer: string }) => {
      await axios.post("/settings/update", {
        key: "welcome_message",
        value: payload.welcome,
        headers: {
                "Authorization": `Bearer ${TokenValue}`
              }
      });

      await axios.post("/settings/update", {
        key: "footer",
        value: payload.footer,
        headers: {
                "Authorization": `Bearer ${TokenValue}`
              }
      });
    },
    onSuccess: () => {
      message.success("Settings updated successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to update settings";
      message.error(errorMessage);
    },
  });
};
