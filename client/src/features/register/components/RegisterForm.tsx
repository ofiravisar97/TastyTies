"use client";

import Input from "@/components/UI/Input";
import LoadingButton from "@/components/UI/LoadingButton";
import Logo from "@/components/UI/Logo";
import PasswordInput from "@/components/UI/PasswordInput";
import Link from "next/link";
import { User2Icon, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/registerSchema";
import { registerType } from "../types/registerTypes";
import useRegister from "../hooks/useRegister";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerType>({
    resolver: zodResolver(registerSchema),
  });
  const handleRegister = useRegister();

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="bg-white rounded-sm border-[1px] border-borderColor items-center shadow-sm flex flex-col w-[90%] lg:w-[35%] min-h-[60%] h-fit p-4 space-y-4"
    >
      <Logo size="xxxxl" />
      <div className={"place-content-start w-full"}>
        <h2 className={"text-lg"}>
          <strong>Register</strong>
        </h2>
        <h4>Register as a member.</h4>
      </div>
      <Input
        register={register}
        label="Display Name"
        name="displayName"
        placeholder="Display Name"
        icon={<User2Icon />}
        error={errors.displayName?.message?.toString()}
      />
      <Input
        register={register}
        name="email"
        label="Email"
        error={errors.email?.message?.toString()}
        placeholder="Email"
        icon={<Mail />}
      />
      <PasswordInput
        error={errors.password?.message?.toString()}
        label="Password"
        name="password"
        register={register}
      />
      <PasswordInput
        name="passwordConfirm"
        error={errors.passwordConfirm?.message}
        label="Confirm Password"
        register={register}
      />
      <LoadingButton variant={"primary"} className={"w-full"} isLoading={false}>
        Register
      </LoadingButton>
      <Link href="/login" className="hover:underline">
        <strong>
          Already a member?<span className={"text-primary"}> Login.</span>
        </strong>
      </Link>
    </form>
  );
};

export default RegisterForm;
