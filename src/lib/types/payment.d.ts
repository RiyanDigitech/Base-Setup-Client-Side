export interface WorkDetails {
  name: string;
  title: string;
  applicantName: string;
  franchiseName: string;
  workStatus: string;
  details: string;
  payment: string;
  leadId: number;
}
//paymentdetailspage
export interface PaymentDetail {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  title: string;
  applicantName: string;
  franchiseName: string;
  workStatus: string;
  details: string;
  payment: string;
  quotationId: number;
}

export interface Data {
  paymentDetail: PaymentDetail;
  leadId: number;
}

export interface PaymentDetailsApiResponse {
  message: string;
  data: Data;
}
