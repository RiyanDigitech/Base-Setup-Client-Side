import { ThebaseUrl } from '../Base/BaseUrl';


export const AuthuserLogin = async ({phone,password}:{phone:string,password:string}) => {
    try {
        const response = await ThebaseUrl.post(`/login`,{phone , password }, {
            headers:{
                "Content-Type" : "application/json",
                // "Authorization" : `Bearer ${TokenValue}`
               },
        })
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        console.log(error)
    }

}


export const RecivecedOTPLogin = async ({phone , otp_code}:{phone:string , otp_code:string}) => {

    try {
        const response = await ThebaseUrl.post(`/verify-otp` ,{phone , otp_code} , {
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
  
      const response = await ThebaseUrl.post(
        `/logout`,{},{
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accesstoken}`,
          },});
  
      if (response.status === 200) {
        localStorage.removeItem('token');
        return response.data;
      }
    } catch (error) {
      console.error('Logout error:', error);
      return { error: true, message: 'Logout failed' };
    }
}
  