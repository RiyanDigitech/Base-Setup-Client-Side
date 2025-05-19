// import { ChangePasswordType, errorType } from "@/lib/types";
import { Form, Input, Spin } from "antd";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import "../../index.css";
import { ChangePasswordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from "@/services/auth.service";
export default function ChangePassword() {
  const {
    control,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordSchema),
  });
  const { useHandleChangePassword } = AuthService();

  const { mutate, isPending } = useHandleChangePassword(reset);

  const onSubmit: SubmitHandler<ChangePasswordType> = (data) => {
    mutate(data);
  };
  const onError: SubmitErrorHandler<errorType> = (errors) => {
    console.log(errors);
  };
  return (
    <div className="h-screen bg-[url('/auth-bg.png')] bg-cover bg-center  relative flex md:items-center justify-center font-manrope">
      <div className="font-manrope my-5 sm:my-auto md:my-5 flex-1 md:max-w-150 bg-white bg-opacity-40 rounded-2xl pt-9 px-8 md:px-16 h-fit pb-8">
        <h2 className="text-xl font-bold text-[#FF6820]">App Name / logo</h2>
        <h1 className="text-lg md:text-2xl font-bold text-[#18120F] mt-6">
          Change Password
        </h1>
        <p className="text-[#6b6b6b] font-manrope text-sm my-5 font-semibold">
          Your current password is a one-time password provided by your
          administrator. Set a new password now.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="font-manrope w-full flex flex-col mt-3 "
        >
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <Form.Item className="w-full sm:w-full  mb-4">
                <label
                  htmlFor="newPassword"
                  className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                >
                  New Password
                </label>
                <Input.Password
                  {...field}
                  id="newPassword"
                  placeholder="New Password"
                  className="h-[44px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
                />
              </Form.Item>
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Form.Item className="w-full sm:w-full  mb-1">
                <label
                  htmlFor="confirmPassword"
                  className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem] flex"
                >
                  Confirm New Password{" "}
                </label>
                <Input.Password
                  {...field}
                  id="confirmPassword"
                  placeholder="Confirm New Password"
                  className="h-[44px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
                />
              </Form.Item>
            )}
          />

          <button
            type="submit"
            className={`bg-[#ff6820] font-manrope w-11/12 sm:w-6/12 lg:w-full text-white py-2 rounded-md text-[14px] mt-6 "
            }`}
          >
            {isPending ? <Spin /> : "Set Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
