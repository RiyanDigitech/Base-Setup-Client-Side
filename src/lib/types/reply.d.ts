interface ApiResponseComplaintReply {
  message: string;
  data: ComplaintDetails;
}

// Complaint Details Interface
interface ComplaintDetails {
  id: number;
  status: string;
  createdAt: string; // ISO date format
  updatedAt: string; // ISO date format
  description: string;
  adminReply: string;
  complaintStatus: string;
  user: UserDetails;
  service: ServiceDetails;
  callback: CallbackDetails;
}

// User Details Interface
interface UserDetails {
  id: number;
  status: string;
  createdAt: string; // ISO date format
  updatedAt: string; // ISO date format
  username: string;
  email: string;
  role: string;
  phone: string;
  registrationStatus: string;
  onboardToken: string | null;
  password: string;
  token: string | null;
}

// Service Details Interface
interface ServiceDetails {
  id: number;
  status: string;
  createdAt: string; // ISO date format
  updatedAt: string; // ISO date format
  title: string;
  description: string; // HTML string
  feeAmount: string; // Represented as string
  serviceCharge: string; // Represented as string
  totalAmount: string; // Represented as string
  image: string | null; // Nullable image field
}

// Callback Details Interface
interface CallbackDetails {
  id: number;
  status: string;
  createdAt: string; // ISO date format
  updatedAt: string; // ISO date format
  callbackType: string;
  applicantName: string | null; // Nullable field
}
