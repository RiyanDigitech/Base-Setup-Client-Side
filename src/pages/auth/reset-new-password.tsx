import { resetChangePassword } from '@/services/authService/AuthService';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Resetnewpassword() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: '',
      otp: '',
      password: '',
      password_confirmation: '',
    },
    mode: 'onTouched',
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetChangePassword,
    onSuccess: (data: any) => {
      if (data?.success) {
        message.success(data.data.message || 'Password has been reset successfully');
        navigate('/');
      } else {
        message.error(data.error || 'Password reset failed');
      }
    },
    onError: () => {
      message.error('Failed to change password');
    },
  });

  const onSubmit = (data: any) => {
    if (data.password !== data.password_confirmation) {
      message.error('Passwords do not match');
      return;
    }
    resetPasswordMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border rounded-lg shadow-sm w-full max-w-md"
      >
        <div className="bg-gray-100 border-b px-4 py-3 rounded-t-lg">
          <h2 className="text-base font-semibold text-gray-700">Reset Your Password</h2>
        </div>

        <div className="px-6 py-6 space-y-4">
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: 'Phone number is required' }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.phone ? 'error' : ''}
                  help={errors.phone?.message}
                  className="mb-0"
                >
                  <Input
                    placeholder="Enter Phone Number"
                    className="w-full h-10 focus:!border-green-600 hover:!border-green-600 focus:!shadow-none px-3"
                    {...field}
                  />
                </Form.Item>
              )}
            />
          </div>

          {/* OTP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
            <Controller
              name="otp"
              control={control}
              rules={{ required: 'OTP is required' }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.otp ? 'error' : ''}
                  help={errors.otp?.message}
                  className="mb-0"
                >
                  <Input
                    placeholder="Enter OTP"
                    className="w-full h-10 focus:!border-green-600 hover:!border-green-600 focus:!shadow-none px-3"
                    {...field}
                  />
                </Form.Item>
              )}
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <Controller
              name="password"
              control={control}
              rules={{ required: 'New Password is required' }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.password ? 'error' : ''}
                  help={errors.password?.message}
                  className="mb-0"
                >
                  <Input.Password
                    placeholder="Enter New Password"
                    className="w-full h-10 focus:!border-green-600 hover:!border-green-600 focus:!shadow-none px-3"
                    {...field}
                  />
                </Form.Item>
              )}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <Controller
              name="password_confirmation"
              control={control}
              rules={{
                required: 'Confirm Password is required',
                validate: (value) =>
                  value === watch('password') || 'Passwords do not match',
              }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.password_confirmation ? 'error' : ''}
                  help={errors.password_confirmation?.message}
                  className="mb-0"
                >
                  <Input.Password
                    placeholder="Enter Confirm Password"
                    className="w-full h-10 focus:!border-green-600 hover:!border-green-600 focus:!shadow-none px-3"
                    {...field}
                  />
                </Form.Item>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            htmlType="submit"
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
