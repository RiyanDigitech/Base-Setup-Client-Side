export interface Permission {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    role_id: number;
    permission_id: number;
  };
}

export interface Role {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    user_id: number;
    role_id: number;
  };
  permissions: Permission[];
}

export interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  email_verified_at: string | null;
  mfa_enabled: number;
  otp_code: string | null;
  otp_expires_at: string | null;
  created_at: string;
  updated_at: string;
  roles: Role[];
}
export interface CreateUserInput {
  name: string;
  email: string;
  phone: string;
  password: string;
}