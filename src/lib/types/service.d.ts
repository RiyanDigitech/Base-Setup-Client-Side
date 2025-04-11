export interface ServiceListType {
  id: number;
  status: string;
  title: string;
  description: string;
  feeAmount: string;
  serviceCharge: string;
  totalAmount: string;
  image: string;
}
export interface ServiceUpdateListType {
  data: {
    id: number;
    status: string;
    title: string;
    description: string;
    feeAmount: string;
    serviceCharge: string;
    totalAmount: string;
    image: string;
  };
}
export interface ServiceResponse {
  message: string;
  data: Franchise[];
  total: number;
  page: number;
  lastPage: number;
}
