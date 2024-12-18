import { cva, type VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

const input = cva(
  [
    "border-borderColor border-[1px] px-2 rounded-md bg-transparent pr-8 py-[4px] w-full",
  ],
  {
    variants: {
      variant: {
        primary: "shadow-md",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type Props = {
  label: string;
  error?: string | null;
  name: string;
  icon?: React.ReactNode;
  register: UseFormRegister<FieldValues | any>;
} & InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof input>;

const Input = ({
  icon,
  register,
  error,
  label,
  variant,
  name,
  className,
  ...props
}: Props) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="font-semibold" htmlFor={label}>
          {label}
        </label>
      )}
      <div className="flex bg-neutral-100 items-center border-1 border-borderColor relative">
        <input
          {...props}
          {...register(name)}
          id={label}
          className={twMerge(className, input({ variant }))}
        />
        {icon && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {icon}
          </span>
        )}
      </div>
      {error && <p className="text-red-700 font-semibold">{error}</p>}
    </div>
  );
};

export default Input;
