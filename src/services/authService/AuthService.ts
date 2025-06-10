import axios from "@/lib/config/axios-instance"
import { resetPasswordType } from "@/lib/types/resetPasswordTypes";
import { message } from 'antd';
import Cookies from "js-cookie";


export const AuthuserLogin = async ({ phone, password }: { phone: string, password: string }) => {
    try {
        const response = await axios.post(`/login`, { phone, password }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            //  const token = response.data?.data?.token;

            // if (token) {
            //     // Store the token in cookies for 7 days
            //     Cookies.set('token', token, {
            //         expires: 7, // expires in 7 days
            //         secure: true, // use secure cookies in production
            //         sameSite: 'Strict',
            //     });
            // }

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
        localStorage.removeItem('token_expiry');
        localStorage.removeItem('userdetails');
        Cookies.remove('token')
        message.success('Logged out successfully')
        
        return response.data;
      }
      
    } catch (error:any) {
      message.error(error?.response?.data?.message  || 'Logout Failed Check your Internet Connection' );
    //   return { error: true, message: '' };
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

