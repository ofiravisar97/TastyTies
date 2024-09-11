import { useEffect } from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  useEffect(() => {
    document.title = "Login | TastyTies";
  }, []);
  return (
    <div className="bg-background h-screen w-screen flex items-center justify-center">
      <main className="h-[70%] w-[90%] bg-white lg:w-[50%] grid grid-cols-1 lg:grid-cols-2 p-2 rounded-md shadow-md">
        <section className="flex items-center justify-center">
          <LoginForm />
        </section>
        <section className="hidden lg:flex flex-col gap-4 bg-primary items-center justify-center">
          <h1 className="text-6xl text-white font-bold">TastyTies</h1>
          <h4 className="text-white font-semibold">A tasty way to connect.</h4>
        </section>
      </main>
    </div>
  );
};

export default Login;
