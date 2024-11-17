import {cva, type VariantProps} from 'class-variance-authority'
import React, {ButtonHTMLAttributes} from "react";
import {twMerge} from "tailwind-merge";


const button = cva(['shadow-sm rounded-sm'],{
    variants: {
        variant: {
            primary: 'bg-primary text-white',
        }
    }
});

type Props = {
    children?: React.ReactNode,
    className?: string;
} & VariantProps<typeof button> & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({children,variant,className,...props} : Props) => {
    return (
        <button {...props}  className={twMerge(className,button({variant}))}>{children}</button>
    )
}

export default Button;