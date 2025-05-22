import axios from "@/lib/config/axios-instance"
import { Role } from "@/lib/types/role&permission";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from 'antd';

 const fetchRoles = async (search?: string): Promise<Role[]> => {
  if (search && search.trim()) {
    const res = await axios.get('/roles/search', {
      params: { q: search },
    });
    return res.data.data as Role[];
  } else {
    const res = await axios.get('/roles');
    return res.data.data as Role[];
  }
};
const createRole = async (roleName: string) => {
  const response = await axios.post('/roles', { name: roleName });
  return response.data;
};
export const deleteRole = async (roleId: number | string) => {
  const response = await axios.delete(`/roles/${roleId}`);
  return response.data;
};
export const updateRole = async ({ id, name }: { id: number; name: string }) => {
  const response = await axios.put(`/roles/${id}`, { name });
  return response.data;
};
 export const fetchAllPermissions = async () => {
  const response = await axios.get("/permissions");
  return response.data.data; // assuming the structure is { success, message, data }
};
export const assignPermissionsToRole = async ({
  roleId,
  permissions,
}: {
  roleId: number;
  permissions: number[];
}) => {
  const res = await axios.post(`/roles/${roleId}/permissions`, {
    permissions,
  });
  return res.data;
};

// get roles
export const useRoles = (search?: string) =>
  useQuery({
    queryKey: ['roles', search],
    queryFn: () => fetchRoles(search),
    staleTime: 5 * 60 * 1000,
  });
// --- Custom Hook for create role mutation ---
export const useCreateRole = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      message.success('Role created successfully');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      onSuccessCallback?.(); // run optional callback
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create role';
      message.error(errorMessage);
    },
  });
};
// delete role
export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      message.success('Role deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to delete role';
      message.error(errorMessage);
    },
  });
};
// updaet role
export const useUpdateRole = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      message.success('Role updated successfully');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
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

