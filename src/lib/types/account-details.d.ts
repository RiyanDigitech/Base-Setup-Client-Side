interface UserDetails {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  district: string | null;
  state: string | null;
  panchayat: string | null;
  taluk: string | null;
  address: string | undefined;
  postalOffice: string | null;
}

interface UserData {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  address: string | undefined;
  email: string;
  role: string;
  phone: string;
  registrationStatus: string | null;
  onboardToken: string | null;
  password: string;
  token: string;
  firebaseToken: string | null;
  otp: string | null;
  otpExpiry: string | null;
  lastOtpSentAt: string | null;
  otpAttempts: number;
  blockedUntil: string | null;
  image: string | null;
  nextOtpRequestAt: string | null;
  details: UserDetails;
}

interface ApiResponseAccountDetails {
  message: string;
  data: UserData;
}
