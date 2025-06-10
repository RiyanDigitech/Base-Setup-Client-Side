import axios from '@/lib/config/axios-instance';
import { TokenValue } from '../Base/TokenGet';

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


  // const token  = localStorage.getItem('token')

  try {
    const response = await axios.get(`chat` , {
      params:{status:status},
      
    })
  if(response.status === 200){
    return response.data
  }else{[]}
  } catch (error:any) {
    console.log(error?.response?.data?.message)
  }
  
}

export const sendMessagewithPusher = async ({message, wa_id}:{message: string, wa_id: string}) => {
  try {
    const response = await axios.post(
      'agent/reply',
      {
        wa_id, 
        message,
      },
      
    );

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


export const handleCloseButton = async (wa_id:string) => {
  const status = 'closed'
  try {
  const response = await axios.post(`chat/${wa_id}/status` , {status})
  if(response.status === 200){
   return response.data
  }else{[]}
  } catch (error:any) {
    console.log(error?.response?.data?.message)
  }

}

export const handleReplyButton = async (wa_id:any) => {
  const status = 'replied'
  try {
  const response = await axios.post(`chat/${wa_id}/status` , {status})
  if(response.status === 200){
   return response.data
  }else{[]}
  } catch (error:any) {
    console.log(error?.response?.data?.message)
  }

}

export const getChatByNumber = async (waNumber:any) => {
  try {
    const response = await axios.get(`chat/${waNumber}`)
  if(response.status === 200){
    return response?.data
  }else{[]}
  } catch (error:any) {
    console.log(error?.response?.data?.message)
  }

}






