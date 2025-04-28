import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Button, Checkbox, Form, Input, message, Modal } from "antd";
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
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
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
    onSuccess: () => {
      message.success('OTP sent to your phone number');
      setIsModalVisible(true);
    },
    onError: (error: any) => {
      message.error('Failed to send OTP');
      console.log(error);
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: RecivecedOTPLogin,
    onSuccess: (data: any) => {
      localStorage.setItem('token', data.token);
      navigate('/');
    },
    onError: () => {
      message.error('Invalid OTP');
    },
  });

  return (
    <div className="min-h-screen lg:px-0 md:px-0 px-4 flex items-center justify-center bg-white">
      <div className="w-[700px] border rounded-md shadow-sm pb-6 border-gray-300">
        {/* Header */}
        <div className="bg-gray-100 px-4 py-3 rounded-t-md border-b flex items-center gap-2 mb-4">
          <FaKey className="text-gray-600" />
          <h2 className="text-gray-800 text-sm font-semibold">Account Login</h2>
        </div>

        {/* Form */}
        <form className="space-y-4 px-6" onSubmit={handleSubmit(handleLogin)}>
          {/* Username */}
          <div className="flex">
            <div className="flex mx-auto">
              <label className="block text-gray-700 my-auto me-4">Username</label>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone number is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.phone ? "error" : ""}
                    help={errors.phone?.message}
                    className="mb-0"
                  >
                    <Input className="lg:w-80 md:w-80 w-50 h-10" {...field} />
                  </Form.Item>
                )}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex">
            <div className="flex mx-auto">
              <label className="block text-gray-700 my-auto me-5">Password</label>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.password ? "error" : ""}
                    help={errors.password?.message}
                    className="mb-0"
                  >
                    <Input.Password className="lg:w-80 md:w-80 w-50 h-10" {...field} />
                  </Form.Item>
                )}
              />
            </div>
          </div>

          {/* Remember Me and Submit */}
          <div className="flex">
            <div className="mx-auto ps-20">
              <div className="flex items-center gap-2">
                <Checkbox
                  onChange={(e) => setIsRememberMeChecked(e.target.checked)}
                />
                <span className="text-sm text-gray-700">Remember Me</span>
              </div>

              <Button
                htmlType="submit"
                type="primary"
                icon={<AiOutlineLogin />}
                className="lg:w-[325px] md:w-[325px] w-[225px] bg-green-600 mt-4 hover:!bg-green-700 border-none"
                disabled={isButtonDisabled}
              >
                Login
              </Button>

              <div className="mt-2">
                <Link to="/admin/forgot-password" className="text-blue-600 hover:underline flex gap-1">
                  <FaQuestionCircle className="text-blue-600 my-auto" />
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
          <Button key="submit" className="!bg-green-600" type="primary" onClick={handleVerifyOTP}>
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
