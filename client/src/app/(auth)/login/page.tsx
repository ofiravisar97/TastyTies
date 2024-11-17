import LoginForm from "@/features/login/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TastyTies | Login",
};

const Login = () => {
  return (
    <main className="bg-neutral-100 h-screen w-screen flex justify-center items-center">
      <LoginForm />
    </main>
  );
};

export default Login;
