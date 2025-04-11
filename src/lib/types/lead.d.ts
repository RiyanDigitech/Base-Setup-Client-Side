export interface Leadlist {
  name: string;
  mobile: string;
  email: string;
  worktitle: string;
  state: string;
  district: string;
  Action: string;
  paymentstatus: string;
}
// User details in the response
export interface User {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  email: string;
  role: string;
  phone: string;
  registrationStatus: string;
  onboardToken: string | null;
  password: string;
  token: string | null;
}

// Service details in the response
export interface Service {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  feeAmount: string;
  serviceCharge: string;
  totalAmount: string;
  image: string;
}

// Quotation details in the response
export interface Quotation {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  feeAmount: string;
  serviceCharge: string;
  totalAmount: string;
  paymentLink: string;
}
export interface QuotationCreate {
  leadId: number;

  feeAmount: number;
  serviceCharge: number;
  paymentLink?: string;
}
// Main object inside "data" array
export interface Lead {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  applicantName?: string;
  applicantMobile: string;
  email: string;
  state: string;
  district: string;
  taluk: string;
  panchayat: string;
  leadStatus: string;
  user: User;
  service: Service;
  franchise: null | string;
  quotations: Quotation[];
}

// Main response object
export interface LeadApiResponse {
  message: string;
  data: Lead[];
  page: number;
  lastPage: number;
  total: number;
}
export interface Quotation {
  leadId: number; // Unique identifier for the lead
  feeAmount: number; // Fee amount
  serviceCharge: number; // Service charge amount
  paymentLink?: string; // Optional payment link
}
//targeted Lead
// Main response structure
export interface TargetedLeadApiResponse {
  message: string;
  data: Datas;
}

// Data structure
export interface Datas {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  applicantName: string;
  applicantMobile: string;
  email: string;
  state: string;
  district: string;
  taluk: string;
  panchayat: string;
  leadStatus: string;
  user: Users;
  service: Services;
  franchise: null; // Change to appropriate type if franchise data exists
  quotations: Quotations[];
}

// User structure
export interface Users {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  email: string;
  role: string;
  phone: string;
  registrationStatus: string;
  onboardToken: string | null;
  password: string;
  token: string | null;
}

// Service structure
export interface Services {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  feeAmount: string;
  serviceCharge: string;
  totalAmount: string;
  image: string;
}

// Quotation structure
export interface Quotations {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  feeAmount: string;
  serviceCharge: string;
  totalAmount: string;
  paymentLink: string | null;
}
