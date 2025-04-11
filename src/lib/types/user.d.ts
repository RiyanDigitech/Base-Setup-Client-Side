export type UserType = {
  firstName: string;
  lastName: string;
  designation: string;
  email: string;
  roleId?: number;
  userName?: string | null;
  id?: number;
  status: string;
  isVerified?: boolean;
  isActive?: boolean;
  role: string;
  updatedAt?: string;
  image?: string | null;
};
export interface UserInfo {
  username?: string; // User ka username
  phone?: string; // Phone number (string format me, jisme +91 jaise prefixes ho sakte hain)
  postalOffice?: string; // Postal office ka naam
  state?: string; // State ka naam
  address?: string; // User ka address
  email?: string; // Email address
  image?: string;
}
