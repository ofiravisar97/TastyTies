import { Metadata } from "next";
import RegisterForm from "@/features/register/components/RegisterForm";

export const metadata: Metadata = {
  title: "TastyTies | Register",
};

const Register = () => {
  return (
    <main className="bg-neutral-100 h-screen w-screen flex justify-center items-center">
      <RegisterForm />
    </main>
  );
};

export default Register;
