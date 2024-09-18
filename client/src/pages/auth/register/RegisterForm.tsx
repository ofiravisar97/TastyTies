import FieldInput from "../../../components/UI/FieldInput";
import LoadingButton from "../../../components/UI/LoadingButton";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RegisterSchemaType } from "../../../types/RegisterSchema";
import useRegister from "../../../hooks/useRegister";

const RegisterForm = () => {
  const registerUser = useRegister();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterSchemaType>();

  return (
    <form
      className="p-4 space-y-4 h-fit w-[90%]"
      method="POST"
      onSubmit={handleSubmit(registerUser)}
    >
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Register</h1>
        <h4>Register as a member.</h4>
      </div>
      <FieldInput
        placeholder="Name"
        name="name"
        label="Name"
        register={register}
      />
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
      <FieldInput
        placeholder="Confirm Password"
        name="confirm"
        label="Confirm Password"
        type="password"
        register={register}
      />
      <LoadingButton
        label="Register"
        type="submit"
        loading={isSubmitting}
        className="w-[100%]"
      />
      <NavLink
        to="/login"
        className="flex items-center justify-center hover:underline"
      >
        Already a member? <strong className="text-primary ml-2">Login</strong>
      </NavLink>
    </form>
  );
};

export default RegisterForm;
