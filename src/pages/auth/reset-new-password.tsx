import { resetChangePassword } from '@/services/authService/AuthService';
import { useMutation } from '@tanstack/react-query';
import { Button, Input, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Resetnewpassword() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Validation
    if (!phone || !otp || !password || !password_confirmation) {
      message.error('All fields are required!');
      return;
    }

    if (password !== password_confirmation) {
      message.error('Passwords do not match!');
      return;
    }
    const formData = {
      phone,
      otp,
      password,
      password_confirmation,
    };

    console.log('Form Data:', formData);
    resetPasswordMutation.mutate(formData)
  };

  const naviagte = useNavigate()
  const resetPasswordMutation = useMutation({
    mutationFn: resetChangePassword,
    onSuccess: (data:any) => {
      if (data?.success) {
        console.log('reset Passwrd' , data)
        message.success(data.data.message || "Password has been reset successfully");
      naviagte('/admin/login')
      }else {
              message.error(data.error || "Password Reset failed");
            }
    },
    onError: () => {
      message.error("Failed To Change Password")
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-lg shadow-sm w-full max-w-md"
      >
        {/* Header */}
        <div className="bg-gray-100 border-b px-4 py-3 rounded-t-lg">
          <h2 className="text-base font-semibold text-gray-700">
            Reset Your Password
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <Input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OTP
            </label>
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <Input.Password
              className="!w-full !h-10 px-3 !border !border-gray-300 !rounded-md focus:!outline-none focus:!ring-2 focus:!ring-green-500"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <Input.Password
              className="!w-full !h-10 px-3 !border !border-gray-300 !rounded-md !focus:!outline-none !focus:!ring-2 !focus:!ring-green-500"
              type="password"
              placeholder="Confirm new password"
              value={password_confirmation}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button
            htmlType='submit'
            loading={resetPasswordMutation.isPending}
            className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:!bg-green-700 transition duration-300"
          >
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Resetnewpassword;
