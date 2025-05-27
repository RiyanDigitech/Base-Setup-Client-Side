import axios from "@/lib/config/axios-instance"
import { TokenValue } from "../Base/TokenGet";


export const addPostParentMenu = async (title: string) => {
    try {
        const action_type = "text";
        const response = await axios.post(`menus`, { title, action_type , 
            headers:{
            
                    "Authorization": `Bearer ${TokenValue}`
                  }
         });

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
            headers:{
            
                    "Authorization": `Bearer ${TokenValue}`
                  }
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


