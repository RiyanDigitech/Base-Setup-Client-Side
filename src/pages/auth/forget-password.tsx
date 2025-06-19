import { resetPassword } from "@/services/authService/AuthService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function ForGetPassword() {
  const { control, handleSubmit , formState: { errors } } = useForm({
    defaultValues: {
      phone: "",
    },
    mode: "onTouched"
  });

 const onSubmit = (data: any) => {
  const phone = data?.phone;

  console.log("API DATA" , data)

  if (!phone || phone.trim() === "") {
    message.error("Enter Phone Number");
    return;
  }

  resetMutation.mutate(phone);
};



  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const resetMutation = useMutation({
  mutationFn: resetPassword,

  onSuccess: (res) => {
    const phoneError = res?.errors?.phone?.[0];
    const otpError = res?.errors?.otp?.[0];

    if (phoneError) {
      message.error(phoneError);
    } else if (otpError) {
      message.error(otpError); // ✅ correct kiya
    } else {
      message.success(res?.message || "Password reset successful");
      navigate('/admin/changeresetpassword');
      queryClient.invalidateQueries({ queryKey: ['resetpassword'] });
    }
  },

  onError: (error: any) => {
    const phoneError = error?.response?.data?.errors?.phone?.[0];
    const otpError = error?.response?.data?.errors?.otp?.[0];

    if (phoneError) {
      message.error(phoneError);
    } else if (otpError) {
      message.error(otpError); // ✅ correct kiya
    } else {
      message.error(error?.response?.data?.message || "Something went wrong");
    }
  }
});

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-6">
      <div className="w-full max-w-[800px] border rounded-md shadow-sm pb-6 border-gray-300">
        {/* Header */}
        <div className="bg-gray-100 px-4 py-3 rounded-t-md border-b flex items-center gap-2 mb-4">
          <h2 className="text-gray-800 text-sm font-semibold">
            Forgot your Password
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-gray-700 sm:w-[200px] text-sm sm:text-right">
              Enter Phone Number
            </label>
            <Controller
              name="phone"
              control={control}
               rules={{ required: "Phone Number is required" }}
             render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.phone ? "error" : ""}
                    help={errors.phone?.message}
                    className=" w-full"
                  >
                  <Input
                    {...field}
                    placeholder="Enter your Phone Number"
                    className="w-full h-10 border border-gray-300 mt-6 hover:border-green-500 focus:border-green-500"
                    maxLength={18}
                  />
                </Form.Item>
              )}
            />
          </div>

          <div className="flex justify-center lg:ps-6 sm:ps-22">
            <div className="w-full max-w-md">
              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={resetMutation.isPending}
                  className="w-full bg-green-600 hover:!bg-green-700 border-none"
                >
                  Send Reset Link
                </Button>
                <Link to="/" className="w-full">
                  <Button
                    htmlType="button"
                    type="primary"
                    className="w-full bg-green-600 hover:!bg-green-700 border-none"
                  >
                    Back
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
}
