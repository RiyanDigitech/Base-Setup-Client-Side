import axios from "@/lib/config/axios-instance"
import { CreateUserInput, User } from "@/lib/types/user";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from 'antd';
import { PaginatedResponse } from "../Role&PermissionService/Roles&PermissionService";
// import { TokenValue } from "../Base/TokenGet";

 const fetchUsers = async (
   search?: string,
   page = 1,
   limit = 10
 ): Promise<PaginatedResponse<User>> => {
  if (search && search.trim()) {
    const res = await axios.get('/users/search', {
      params: { q: search },
      
    });
    return {
      data: res.data.data,
      total: res.data.data.length,
      currentPage: 1,
      pageSize: res.data.data.length,
    };
  } else {
    const res = await axios.get('/users',{
      params: { page, limit },
    });
    return {
      data: res.data.data.data, // ✅ Fixed
      total: res.data.data.total, // ✅ Fixed
      currentPage: res.data.data.current_page, // ✅ Fixed
      pageSize: res.data.data.per_page, // ✅ Fixed
    };
  }
};
const createUser = async (userData: CreateUserInput) => {
  const response = await axios.post('/users', userData,{
    
  });
  return response.data;
};
export const deleteUser = async (userId: number | string) => {
  const response = await axios.delete(`/users/${userId}`,{
    
  });
  return response.data;
};
export const updateUser = async (user: {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}) => {
  const { id, ...payload } = user;
  const response = await axios.put(`/users/${id}`, payload,{
    
  });
  return response.data;
};


// get users
export const useUsers = (
  search?: string,
  page = 1,
  limit = 10
) =>
  useQuery({
    queryKey: ['users', search, page, limit],
    queryFn: () => fetchUsers(search, page, limit),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
// --- Custom Hook for create user mutation ---
export const useCreateUser = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      message.success('User created successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      onSuccessCallback?.(); // Optional callback (e.g. closing modal)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create user';
      message.error(errorMessage);
    },
  });
};

// delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      message.success('User deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to delete role';
      message.error(errorMessage);
    },
  });
};
// updaet user
export const useUpdateUser = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      message.success('User updated successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      if (onSuccessCallback) {
        onSuccessCallback(); // 💡 Trigger modal close in UI
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update role';
      message.error(errorMessage);
    },
  });
};

export const useAssignRoleToUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, roleId }: { userId: number; roleId: number }) => {
      const response = await axios.post(`/users/${userId}/assign-role`, {
        role_id: roleId,
      });
      return response.data;
    },
   onSuccess: () => {
      message.success('Role Assign successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to Assign Role';
      message.error(errorMessage);
    },
  });
};
