"use client";

import Input from "@/components/UI/Input";
import LoadingButton from "@/components/UI/LoadingButton";
import Logo from "@/components/UI/Logo";
import PasswordInput from "@/components/UI/PasswordInput";
import Link from "next/link";
import { Mail } from "lucide-react";
import useLoginActions from "../hooks/useLoginActions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/LoginSchema";

const LoginForm = () => {
  const handleLogin = useLoginActions();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="bg-white rounded-sm border-[1px] border-borderColor items-center shadow-sm flex flex-col w-[90%] lg:w-[35%] h-[60%] p-4 space-y-4"
    >
      <Logo size="xxxxl" />
      <div className={"place-content-start w-full"}>
        <h2 className={"text-lg"}>
          <strong>Login</strong>
        </h2>
        <h4>Login to your account</h4>
      </div>
      <Input
        register={register}
        label="Email"
        name="email"
        placeholder="Email"
        icon={<Mail />}
        error={errors.email?.message?.valueOf().toString()}
      />
      <PasswordInput
        label="Password"
        name="password"
        register={register}
        error={errors.password?.message?.toString()}
      />

      <LoadingButton
        variant={"primary"}
        className={"w-full"}
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
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
