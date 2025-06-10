import axios from "@/lib/config/axios-instance"
import { useMutation, UseMutationOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
// import { TokenValue } from "../Base/TokenGet";

export type CreateMenuPayload = {
  title: string;
  action_type: "text" | "video";
  action_payload: string;
};


export const addPostParentMenu = async (data: CreateMenuPayload) => {
    try {
        const response = await axios.post("/menus", data);

        if (response.status === 200) {
            return response.data;
        } else {
            console.log("Check Your Internet Connection");
            return null;
        }
    } catch (error: any) {
        console.log(error?.response?.data?.message || 'Error in Data fetching');
        // message.error(error?.response?.data?.message || 'Error in Data fetching');
        return null;
    }
};

export const getAllMenus = async () => {

    try {
        const response = await axios.get('menus' , {
            
        });
        if (response.status === 200) {
            return response.data
        } else {
            console.log("Check Internet Connection")
            return null
        }
    } catch (error: any) {
        console.log(error?.response?.data?.message)
        return null
    }

}

export const getLatestMenus = async () => {
  try {
    const response = await axios.get('menus/latest');
    if (response.status === 200 && response.data) {
      return response.data; // ideally should return an object like { data: [...] }
    } else {
      throw new Error("No draft menus found");
    }
  } catch (error: any) {
    console.error(error?.response?.data?.message || 'Error fetching latest menus');
    throw error; // let react-query handle the error
  }
};


const fetchMenus = async () => {
  const response = await axios.get('menus') // Replace with your endpoint
  return response?.data
 
}

export const useLatestMenus = () => {
  return useQuery({
    queryKey: ['Lmenus'],
    queryFn: getLatestMenus,
    refetchOnWindowFocus: false,
  });
};




export const useMenuQuery = () => {
  return useQuery({
    queryKey: ['menus'],
    queryFn: fetchMenus,
  })
}
// type DeleteMenuFn = (menuId: number) => Promise<any>;
export const useDeleteMenu = ( options?: UseMutationOptions<any, any, number>) => {
  const queryClient = useQueryClient()

  return useMutation<any, any, number>({
    mutationFn: (menuId: number) => axios.delete(`/menus/${menuId}`),
    onSuccess: (data, menuId, context) => {
       message.success("Menu deleted successfully.")
      queryClient.invalidateQueries({ queryKey: ['menus'] }) // This will refetch the menus
       if (options?.onSuccess) {
        options.onSuccess(data, menuId, context);
      }
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.message || "Failed to delete the menu."
      message.error(errorMsg)
    },
    ...options,
  })
}