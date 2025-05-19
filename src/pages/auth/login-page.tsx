import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Button, Form, Input, message, Modal } from "antd";
import { AiOutlineLogin } from "react-icons/ai";
import { FaKey, FaQuestionCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthuserLogin, RecivecedOTPLogin } from "@/services/authService/AuthService";

interface LoginFormInputs {
  phone: string;
  password: string;
}

export default function LoginPage() {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    defaultValues: { phone: '', password: '' }, // default empty
    mode: "onTouched" // validation touch par chale
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp_code, setOtp] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();


  const handleLogin: SubmitHandler<LoginFormInputs> = (data) => {
   
      setPhone(data.phone);
      setPassword(data.password);
      sendOtpMutation.mutate({ phone: data.phone, password: data.password });
    
  };

  const handleVerifyOTP = () => {
    verifyOtpMutation.mutate({ phone, otp_code });
  };

  const sendOtpMutation = useMutation({
    mutationFn: AuthuserLogin,
    onSuccess: (data: any) => {
      if (data?.success) {
        
          localStorage.setItem('token', data?.data?.data?.token);
          localStorage.setItem("token_expiry", String(Date.now() + 24 * 60 * 60 * 1000));
          message.success(data.data.message || "Login successful");
          console.log("User Logged In:", data.data.data.token);
          navigate('/');
      
      }
       else {
        message.error(data.error || "Login failed");
      }
    },
    onError: (error: any) => {
      message.success("OTP Sent Successfully");
          console.log("OTP Sent Response:", error);
          setIsModalVisible(true);
    }
  });
  

  const verifyOtpMutation = useMutation({
    mutationFn: RecivecedOTPLogin,
    onSuccess: (data: any) => {
      localStorage.setItem('token', data?.data?.token);
      localStorage.setItem("token_expiry", String(Date.now() + 24 * 60 * 60 * 1000));
      console.log("User Logged In:", data);
      navigate('/');
    },
    onError: () => {
      message.error('Invalid OTP');
    },
  });

  return (
    <div className="min-h-screen px-4 flex items-center justify-center bg-white">
      <div className="w-full max-w-xl border rounded-md shadow-sm pb-6 border-gray-300">
        {/* Header */}
        <div className="bg-gray-100 px-4 py-3 rounded-t-md border-b flex items-center gap-2 mb-4">
          <FaKey className="text-gray-600" />
          <h2 className="text-gray-800 text-sm font-semibold">Account Login</h2>
        </div>

        {/* Form */}
        <form className="space-y-4 px-4 sm:px-6" onSubmit={handleSubmit(handleLogin)}>
          {/* Username */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2">
            <label className="block text-gray-700 w-full sm:w-auto sm:me-4">Username</label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.phone ? "error" : ""}
                  help={errors.phone?.message}
                  className="mb-0 w-full max-w-xs"
                >
                  <Input
                    className="w-full h-10 border border-gray-300 hover:border-green-500 focus:border-green-500"
                    {...field}
                  />
                </Form.Item>
              )}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2">
            <label className="block text-gray-700 w-full sm:w-auto sm:me-4">Password</label>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.password ? "error" : ""}
                  help={errors.password?.message}
                  className="mb-0 w-full max-w-xs"
                >
                  <Input.Password
                    className="w-full h-10 border border-gray-300 hover:border-green-500 focus:border-green-500"
                    {...field}
                  />
                </Form.Item>
              )}
            />
          </div>

          {/* Remember Me and Submit */}
          <div className="flex justify-center">
            <div className="w-full sm:w-auto text-center">
              {/* <div className="flex items-center justify-center gap-2 mb-4">
                <Checkbox />
                <span className="text-sm text-gray-700">Remember Me</span>
              </div> */}

              <Button
                htmlType="submit"
                type="primary"
                icon={<AiOutlineLogin />}
                className="w-full sm:w-[325px] bg-green-600 hover:!bg-green-700 border-none"
                disabled={isButtonDisabled}
                loading={sendOtpMutation.isPending}
              >
                Login
              </Button>

              <div className="mt-2">
                <Link to="/admin/forgot-password" className="text-blue-600 hover:underline flex items-center justify-center gap-1">
                  <FaQuestionCircle className="text-blue-600" />
                  Forgot Your Password?
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Modal */}
      <Modal
        title="Verify OTP"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="submit" loading={verifyOtpMutation.isPending} className="!bg-green-600" type="primary" onClick={handleVerifyOTP}>
            Verify OTP
          </Button>,
        ]}
      >
        <Input
          type="text"
          value={otp_code}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          allowClear
        />
      </Modal>
    </div>

  );
}
