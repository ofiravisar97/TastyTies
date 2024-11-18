"use client";

import Input from "@/components/UI/Input";
import LoadingButton from "@/components/UI/LoadingButton";
import Logo from "@/components/UI/Logo";
import PasswordInput from "@/components/UI/PasswordInput";
import Link from "next/link";
import { Mail } from "lucide-react";
import useLoginActions from "../hooks/useLoginActions";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const handleLogin = useLoginActions();
  const {register,handleSubmit,formState: {errors,isSubmitting},reset} = useForm();

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="bg-white rounded-sm border-[1px] border-borderColor items-center shadow-sm flex flex-col w-[90%] lg:w-[35%] h-[60%] p-4 space-y-4">
      <Logo size="xxxxl" />
      <div className={"place-content-start w-full"}>
        <h2 className={"text-lg"}>
          <strong>Login</strong>
        </h2>
        <h4>Login to your account</h4>
      </div>
      <Input
        {...register("email")}
        required
        label="Email"
        name="email"
        placeholder="Email"
        icon={<Mail />}
      />
      <PasswordInput {...register("password")} required />

      <LoadingButton variant={"primary"} className={"w-full"} isLoading={false}>
        Login
      </LoadingButton>
      <Link href="/register" className="hover:underline">
        <strong>
          Not a member yet?<span className={"text-primary"}> Register.</span>
        </strong>
      </Link>
    </form>
  );
};

export default LoginForm;
