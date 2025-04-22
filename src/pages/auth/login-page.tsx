import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Checkbox, Form, Input } from "antd";
import { AiOutlineLogin } from "react-icons/ai";
import { FaKey, FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/lib/schemas";
import { useState } from "react";
import AuthService from "@/services/auth.service";
import { Inputs } from "@/lib/types";

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const { useHandleLoginInService } = AuthService();
  const { mutate, isPending } = useHandleLoginInService(reset);

  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const email = watch("email");
  const password = watch("password");
  const isButtonDisabled = !email || !password || isPending;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate({ ...data, rememberMe: isRememberMeChecked });
  };

  return (
    <div className="min-h-screen lg:px-0 md:px-0 px-4 flex items-center justify-center bg-white">
      <div className="w-[700px]  border rounded-md shadow-sm pb-6  border-gray-300">
        {/* Header */}
        <div className="bg-gray-100 px-4 py-3 rounded-t-md border-b flex items-center gap-2 mb-4">
          <FaKey className="text-gray-600" />
          <h2 className="text-gray-800 text-sm font-semibold">Account Login</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6">
          {/* Username */}
          <div className="flex">
            <div className="flex mx-auto">
            <label className="block  text-gray-700 my-auto me-4">Username</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.email ? "error" : ""}
                  help={errors.email?.message}
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
            <label className="block  text-gray-700 my-auto me-5">Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.password ? "error" : ""}
                  help={errors.password?.message}
                  className="mb-0"
                >
                  <Input.Password className="lg:w-80 md:w-80 w-50  h-10" {...field} />
                </Form.Item>
              )}
            />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex">
            <div className="mx-auto ps-20">

          <div className="flex items-center gap-2">
            <Checkbox
              onChange={(e) => setIsRememberMeChecked(e.target.checked)}
            />
            <span className="text-sm text-gray-700">Remember Me</span>
          </div>

          {/* Login Button */}
          <Button
            htmlType="submit"
            type="primary"
            icon={<AiOutlineLogin />}
            className="lg:w-[325px] md:w-[325px] w-[225px] bg-green-600 mt-4 hover:!bg-green-700 border-none"
            disabled={isButtonDisabled}
          >
            Login
          </Button>

          {/* Forgot Password Link */}
          <div className=" mt-2">
            <Link
              to="/admin/forgot-password"
              className="text-blue-600 hover:underline  flex  gap-1"
            >
              <FaQuestionCircle className="text-blue-600 my-auto" />
              Forgot Your Password?
            </Link>
          </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
