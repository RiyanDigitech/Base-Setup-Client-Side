import axios from '@/lib/config/axios-instance';
// import { TokenValue } from '../Base/TokenGet';

export const getAllChatswithPusher = async () => {
  try {
    const response = await axios.post('webhook'); 

    if (response.status === 200) {
      return response.data;
    } else {
      console.log('Unexpected status:', response.status);
      return [];
    }
  } catch (error: any) {
    console.error('API Error:', error?.response?.data?.message || error.message);
    return [];
  }
};


export const getAllMessage = async (status: string) => {

  try {
    const response = await axios.get(`chat` , {
      params:{status:status}
    })
  if(response.status === 200){
    return response.data
  }else{[]}
  } catch (error:any) {
    console.log(error?.response?.data?.message)
  }
  
}



