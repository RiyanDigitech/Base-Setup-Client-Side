import { Button, Form, Input, notification, Spin } from "antd";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaKey, FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import AuthService from "@/services/auth.service";
import { schemaForgotPassword } from "@/lib/schemas";
import { InputsForgotPassword } from "@/lib/types/auth";

export default function ForGetPassword() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputsForgotPassword>({
    resolver: zodResolver(schemaForgotPassword),
    mode: "onTouched",
  });

  const { useHandleForGotPassword } = AuthService();
  const { mutate, isPending } = useHandleForGotPassword(reset);

  const onSubmit: SubmitHandler<InputsForgotPassword> = (data) => {
    localStorage.setItem("lastWhatsappNumber", data.WhatsappNumber);
    mutate(data);
  };

  const onError: SubmitErrorHandler<InputsForgotPassword> = (errors) => {
    if (errors.WhatsappNumber) {
      notification.error({
        message: "Validation Failed",
        description: errors.WhatsappNumber.message,
        placement: "topRight",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-[800px] border rounded-md shadow-sm pb-6 border-gray-300">
        {/* Header */}
        <div className="bg-gray-100 px-4 py-3 rounded-t-md border-b flex items-center gap-2 mb-4">
          <FaKey className="text-gray-600" />
          <h2 className="text-gray-800 text-sm font-semibold">
            Forgot your Password
          </h2>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-4 px-6"
        >
          <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2 sm:gap-0">
            <label className="block text-gray-700 sm:my-auto sm:mr-4   sm:text-left">
              WhatsApp Number
            </label>
            <Controller
              name="WhatsappNumber"
              control={control}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.WhatsappNumber ? "error" : ""}
                  help={errors.WhatsappNumber?.message}
                  className="mb-0 w-full sm:w-auto"
                >
                  <Input
                    {...field}
                    placeholder="Enter your WhatsApp number"
                    className="w-full sm:w-96 h-10"
                    maxLength={18}
                  />
                </Form.Item>
              )}
            />
          </div>

          <div className="flex justify-center items-center">
            <div className="w-full sm:w-[370px] ">
              <Button
                htmlType="submit"
                type="primary"
                icon={isPending ? <Spin size="small" /> : <AiOutlineLogin />}
                className="w-full bg-green-600 hover:!bg-green-700 lg:ms-19 md:ms-19 sm:ms-19 border-none"
              >
                Send Reset Link
              </Button>

              <div className="mt-2 text-center">
                <Link
                  to="/admin/login"
                  className="text-blue-600 hover:underline inline-flex gap-1 justify-center"
                >
                  <FaQuestionCircle className="text-blue-600 my-auto" />
                  Login Your Account?
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
