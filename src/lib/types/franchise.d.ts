export interface Franchiselist {
  username: string;
  phone: string;
  email: string;
  officeName: string;
  state: string;
  district: string;
  action?: string; // Optional now
  officeAddress: string;
  id: number;
  key?: number;
}

// Define a type for individual franchise objects
export interface Franchise {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  phone: string;
  email: string;
  officeName: string;
  officeAddress: string;
  state: string;
  district: string;
  taluk: string;
  panchayat: string;
  postOffice: string;
  pin: number;
}

// Define a type for the entire response
export interface FranchiseResponse {
  message: string;
  data: Franchise[];
  total: number;
  page: number;
  lastPage: number;
}
export type franchiseInputs = z.infer<typeof schemaFranchise>;
export type FranchiseCreateResponse = {
  message: string;
  data: {
    username: string;
    phone: string;
    email: string;
    officeName: string;
    officeAddress: string;
    state: string;
    district: string;
    taluk: string;
    panchayat: string;
    postOffice: string;
    pin: number;
    id: number;
    status: "Active" | "Inactive"; // Assuming status can have limited values
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
  };
};
export interface TargetdFranchise {
  data: {
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    username: string;
    phone: string;
    email: string;
    officeName: string;
    officeAddress: string;
    state: string;
    district: string;
    taluk: string;
    panchayat: string;
    postOffice: string;
    pin: number;
  };
}
export interface UpdateFranchise {
  id?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  username?: string;
  phone?: string;
  email?: string;
  officeName?: string;
  officeAddress?: string;
  state?: string;
  district?: string;
  taluk?: string;
  panchayat?: string;
  postOffice?: string;
  pin?: number;
}
