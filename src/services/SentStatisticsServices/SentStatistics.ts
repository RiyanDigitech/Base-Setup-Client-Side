import axios from "@/lib/config/axios-instance"
import { TokenValue } from "../Base/TokenGet";


export const getDataTableChart = async (wa_id : string) => {

   try {
     const response = await axios.get(`https://js.cybersecure11.com/api/v1/stats/total-messages/${wa_id}` ,{
        headers:{
                   "Authorization": `Bearer ${TokenValue}`
        }
    })
    if(response.status === 200){
        return response.data.data
    }else{[]}
   } catch (error:any) {
    console.log(error?.response?.data?.message)
   }

}