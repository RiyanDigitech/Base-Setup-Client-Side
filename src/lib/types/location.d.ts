// Interface to define the structure of a single district object
export interface DistrictData {
  id: number;
  state: string;
  district: string[];
}

// Interface to define the structure of the overall response
export interface ApiLocationResponse {
  message: string;
  data: DistrictData[];
}
