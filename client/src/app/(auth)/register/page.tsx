import Input from '@/components/UI/Input';
import Logo from "@/components/UI/Logo";
import {MdEmail} from "react-icons/md";
import {Metadata} from "next";
import PasswordInput from "@/components/UI/PasswordInput";
import Link from "next/link";
import LoadingButton from "@/components/UI/LoadingButton";
import {FaUser} from "react-icons/fa6";


export const metadata : Metadata = {
    title: "TastyTies | Login",
}

const Register = () => {
    return (
        <main className="bg-neutral-100 h-screen w-screen flex justify-center items-center">

            <form className='bg-white rounded-sm border-[1px] border-borderColor items-center shadow-sm flex flex-col w-[90%] lg:w-[35%] min-h-[60%] h-fit p-4 space-y-4'>
                <Logo size='xxxxl'/>
                <div className={"place-content-start w-full"}>
                    <h2 className={"text-lg"}><strong>Register</strong></h2>
                    <h4>Register as a member.</h4>
                </div>
                <Input required label="Display Name" name="displayName" placeholder='Display Name' icon={<FaUser />}  />
                <Input required label="Email" name="email" placeholder='Email' icon={<MdEmail />} />
                <PasswordInput required/>
                <PasswordInput required/>
                <LoadingButton variant={"primary"} className={"w-full"} isLoading={false}>Register</LoadingButton>
                <Link href="/login" className="hover:underline">
                    <strong>Already a member?<span className={"text-primary"}> Login.</span></strong>
                </Link>
            </form>
        </main>
    )
}

export default Register