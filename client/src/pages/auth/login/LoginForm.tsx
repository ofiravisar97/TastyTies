import FieldInput from "../../../components/UI/FieldInput";
import LoadingButton from "../../../components/UI/LoadingButton";
import { NavLink } from "react-router-dom";
import useLogin from "../../../hooks/useLogin";
import { useForm } from "react-hook-form";
import { LoginSchema, LoginType } from "../../../types/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const { login } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  return (
    <form
      className="p-4 space-y-4 h-fit w-[90%]"
      method="POST"
      onSubmit={handleSubmit(login)}
    >
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Login</h1>
        <h4>Login to your account.</h4>
      </div>
      <FieldInput
        placeholder="Email"
        name="email"
        label="Email"
        register={register}
      />
      <FieldInput
        placeholder="Password"
        name="password"
        label="Password"
        type="password"
        register={register}
      />
      <LoadingButton label="Login" type="submit" loading={isSubmitting} />
      <NavLink
        to="/register"
        className="flex items-center justify-center hover:underline"
      >
        Not a member yet?{" "}
        <strong className="text-primary ml-2">Register</strong>
      </NavLink>
    </form>
  );
};

export default LoginForm;
