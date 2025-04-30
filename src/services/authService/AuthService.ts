import {useNavigate } from 'react-router-dom';
import { ThebaseUrl } from '../Base/BaseUrl';
import { message } from 'antd';
import axios from "@/lib/config/axios-instance"
import { useMutation } from '@tanstack/react-query';


export const AuthuserLogin = async ({phone,password}:{phone:string,password:string}) => {
    try {
        const response = await axios.post(`/login`,{phone , password })
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        console.log(error)
    }

}


export const RecivecedOTPLogin = async ({phone , otp_code}:{phone:string , otp_code:string}) => {

    try {
        const response = await axios.post(`/verify-otp` ,{phone , otp_code})
    
        if(response.status === 200){
            return response.data
        }else{[]}
    } catch (error) {
       console.log("Error in System Recived OTP" , error)
    }
}


// const navigate = useNavigate()
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
        message.success('You Have Logout Successfully')
        
        return response.data;
      }
    } catch (error) {
      console.error('Logout error:', error);
      return { error: true, message: 'Logout failed' };
    }
}
  // TanStack Query hooks
export const useSendOtp = ({ onSuccess }: { onSuccess: () => void }) => {
    return useMutation({
      mutationFn: AuthuserLogin,
      onSuccess: () => {
        message.success("OTP sent to your phone number");
        onSuccess(); // trigger modal etc.
      },
      onError: () => {
        message.error("Failed to send OTP");
      },
    });
  };

//   verify OPT
export const useVerifyOtp = () => {
    const navigate = useNavigate();
  
    return useMutation({
      mutationFn: RecivecedOTPLogin,
      onSuccess: (data: any) => {
        localStorage.setItem("token", data.token);
        navigate("/");
      },
      onError: () => {
        message.error("Invalid OTP");
      },
    });
  };
  