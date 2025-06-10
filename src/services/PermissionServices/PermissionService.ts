
import axios from '@/lib/config/axios-instance'
// import { error } from 'console'
// import { TokenValue } from '../Base/TokenGet'

export const getAllPermission = async () => {

    try {
       const response = await axios.get('permissions',{
        // headers: {
        //         "Authorization": `Bearer ${TokenValue}`
        //       }
       })
    if(response.status === 200){
        return response.data
    }else{
        console.log("Check Internet Connection")
    }
    } catch (error) {
        console.log(error)
    }

}

export const addPermission = async (pname: string) => {
  try {
    const response = await axios.post("/permissions", { name: pname,
      // headers: {
      //   "Authorization": `Bearer ${TokenValue}`
      // }
     });

    // Check if response indicates duplication
    if (response.data?.message?.includes("already exists")) {
      // Throw error manually so it goes to onError block
      throw new Error("Permission already exists");
    }

    return response.data;
  } catch (error: any) {
    throw error?.response?.data || new Error("Failed to add permission");
  }
};


// export const addPermission = async (name :string) => {

//     try {
//        const response = await axios.post('/permissions',{name})
//     if(response.status === 200){
//         return response.data
//     }else{
//         console.log("Check Internet Connection")
//     }
//     } catch (error) {
//         console.log(error)
//     }

// }



export const updatePermission = async ({ id, name }: { id: number; name: string }) => {
  try {
    const response = await axios.put(`/permissions/${id}`, { name,
      // headers: {
      //         "Authorization": `Bearer ${TokenValue}`
      //       }
     });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update. Check your internet connection.");
    }
  } catch (error: any) {
    // Rethrow the error to be caught by React Query's onError
    throw error.response || error;
  }
};



export const searchPermission = async (q: string) => {
  try {
    const endpoint = q ? `/permissions/search?q=${encodeURIComponent(q)}` : `/permissions`;
    const response = await axios.get(endpoint,{
      // headers: {
      //         "Authorization": `Bearer ${TokenValue}`
      //       }
    });

    if (response.status === 200) {
      const { data, total } = response.data;
      return { data, total };
    } else {
      return { data: [], total: 0 };
    }
  } catch (error) {
    console.error("Search Permission Error:", error);
    return { data: [], total: 0 };
  }
};


export const deletePermission = async (id:number) => {

    try {
       const response = await axios.delete(`/permissions/${id}`,{
      //   headers: {
      //   "Authorization": `Bearer ${TokenValue}`
      // }
       })
    if(response.status === 200){
        return response.data
    }else{
        console.log("Check Internet Connection")
    }
    } catch (error) {
        console.log(error)
    }

}