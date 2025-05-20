import axios from "@/lib/config/axios-instance"
import { resetPasswordType } from "@/lib/types/resetPasswordTypes";
import { useQuery } from "@tanstack/react-query";
import { message } from 'antd';


export const AuthuserLogin = async ({ phone, password }: { phone: string, password: string }) => {
    try {
        const response = await axios.post(`/login`, { phone, password }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            return { success: true, data: response.data };
        } else if (response.status === 401) {
            console.log("Unauthorized access");
            return { success: false, error: 'Unauthorized' };
        } else{[]}
    } catch (error: any) {
        console.log("Login Error:", error?.response?.data || error.message);
        return {
            success: false,
            error: error?.response?.data?.message || "Something went wrong",
        };
    }
};



export const RecivecedOTPLogin = async ({phone , otp_code}:{phone:string , otp_code:string}) => {

    try {
        const response = await axios.post(`/verify-otp` ,{phone , otp_code} , {
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            }
        })
    
        if(response.status === 200){
            return response.data
        }else{[]}
    } catch (error) {
       console.log("Error in System Recived OTP" , error)
    }
}


export const logoutFunc = async () => {
    try {
      const accesstoken: any = localStorage.getItem('token');
      console.log('Token:', accesstoken);
  
      const response = await axios.post(
        `/logout`,{},{
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accesstoken}`,
          },});
    
      if (response.status === 200) {
        localStorage.removeItem('token');
        message.success('Logged out successfully')
        
        return response.data;
      }
      
    } catch (error) {
      console.error('Logout error:', error);
      return { error: true, message: 'Logout failed' };
    }
}
  

export const enableOTPModal = async (enable:boolean) => {
    try {
        const accessToken:any = localStorage.getItem('token')
        console.log("njkjbnvkn" ,accessToken)
        const reponse = await axios.post(`/mfa-toggle`,{enable},{
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${accessToken}`
        },
        })

    if(reponse.status === 200){
        return  reponse.data
    }else {[]}
    } catch (error) {
        console.log(error)
    }
}

export const resetPassword = async (phone : string) => {
   try {
    const reponse = await axios.post(`/forgot-password`,{phone})

    if(reponse.status === 200){
        return  reponse.data
    }else {[]}
    } 
   catch (error) {
    console.log(error)
   }
}


export const resetChangePassword = async (data:resetPasswordType) => {
    try {
        const reponse = await axios.post(`/reset-password`,data , {
            headers:{
                "Content-Type" : "multipart/form-data",
            }
        })
    
        if(reponse.status === 200){
            return { success: true, data: reponse.data };
        }
        else if(reponse.status === 422){
            console.log("OTP is Invalid");
            return { success: false, error: 'OTP is Invalid' };
        }
        else {[]}
        } 
        catch (error: any) {
            console.log("Login Error:", error?.response?.data || error.message);
            return {
                success: false,
                error: error?.response?.data?.message || "Something went wrong",
            };
        }
}
export interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}
export interface Permission {
  id: number;
  name: string;
}

 const fetchRoles = async (): Promise<Role[]> => {
  const res = await axios.get('/roles');       // GET /roles
  return res.data.data as Role[];            // unwrap “data” key
};
export const useRoles = () =>
  useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    staleTime: 5 * 60 * 1000,   // 5 min – tweak as you like
  });