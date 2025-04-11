export interface ComplaintsResponse {
  message: string; // Response message, e.g., "Success"
  data: Complaint[]; // Array of complaints
  page: number; // Current page number
  total: number; // Total number of complaints
  lastPage: number; // Last page number
}

// export Interface for individual complaints
export interface Complaint {
  complaintId: number; // Unique ID of the complaint
  complaintStatus: string; // Status of the complaint, e.g., "Pending"
  complaint: string; // Complaint description
  date: string; // ISO date string of when the complaint was made
  userId: number; // ID of the user who raised the complaint
  applicantName: string; // Name of the applicant
  mobile: string; // Mobile number of the applicant
  email: string; // Email of the applicant
  key: number; // Key for the table (added for Ant Design)
}
export interface TargetedComplaintResponse {
  message: string;
  data: {
    userId: number;
    username: string;
    complaintDate: string; // ISO date format string
    serviceId: number;
    service: string;
    complaintId: number;
    description: string;
    status: string;
    adminReply: string;
  };
}
export interface ComplaintReply {
  complaintId: number | string; // Required when submitting a reply
  applicantName?: string; // Optional for display purposes
  complaintDate?: string; // Optional for display purposes
  description?: string; // Optional for display purposes
  complaintStatus: string; // Required when submitting ("Pending", "Resolved", etc.)
  adminReply?: string; // Optional for display purposes
  // adminReply: string; // Required when submitting a reply
}
