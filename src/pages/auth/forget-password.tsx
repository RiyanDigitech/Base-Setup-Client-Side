import { Form, Input, notification, Spin } from "antd";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { PiGreaterThanLight } from "react-icons/pi";
// import { useNavigate } from "react-router-dom";
import "../../index.css";
import { schemaForgotPassword } from "@/lib/schemas";
import { InputsForgotPassword } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from "@/services/auth.service";
export default function ForGetPassword() {
  const {
    control,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<InputsForgotPassword>({
    resolver: zodResolver(schemaForgotPassword),
  });
  // const navigate = useNavigate();
  const { useHandleForGotPassword } = AuthService();
  const { mutate, isPending } = useHandleForGotPassword(reset);
  const onSubmit: SubmitHandler<InputsForgotPassword> = (data) => {
    console.log(data, "forgetpassword data");
    localStorage.setItem("lastpersonemail", data?.email);

    mutate(data);
  };
  const onError: SubmitErrorHandler<InputsForgotPassword> = (errors) => {
    if (errors?.email) {
      notification.error({
        message: "Failed",
        description: "Email field is missing",
        placement: "topRight",
      });
    }
  };
  return (
    <div className="h-screen bg-[url('/auth-bg.png')] bg-cover bg-center  relative flex md:items-center justify-center font-manrope">
      <div className="font-manrope my-auto md:my-5 flex-1 md:max-w-150 bg-white bg-opacity-40 rounded-2xl pt-9 px-8 md:px-16 h-hit">
        <h2 className="text-xl font-bold text-[#fa7537]">App Name / logo</h2>
        <div className="mt-5 md:mt-28">
          <h1 className="text-lg text-center md:text-2xl font-bold text-[#222834] md:mt-6 font-manrope">
            Forgot your Password?
          </h1>
          <p className="text-[#6b6b6b] text-center font-manrope text-sm md:mb-5">
            Enter your email below and we will send you reset link{" "}
          </p>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="font-manrope mt-4 w-full flex items-center flex-col md:flex-row md:mt-0 md:mb-30"
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Form.Item className="w-full sm:w-full ">
                  <Input
                    {...field}
                    id="email"
                    placeholder="Enter Email"
                    className=" w-full bg-white border-[1px] border-[#CBD0DD] h-[44px]"
                  />
                </Form.Item>
              )}
            />
            <button
              type="submit"
              className="submit bg-[#ff6f2c] h-[44px] mb-6 px-6 rounded-lg text-white ml-2 flex items-center"
            >
              {isPending ? <Spin /> : "Send"}
              <PiGreaterThanLight className="text-white ml-2" />{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
