"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";
import React from "react";
import { Eye } from "lucide-react";
import { FieldValues, UseFormRegister } from "react-hook-form";

const input = cva(
  ["border-borderColor border-[1px] px-2 bg-transparent pr-8 py-[4px] w-full"],
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
  register: UseFormRegister<FieldValues | any>;
  icon?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof input>;

const PasswordInput = ({
  error,
  variant,
  className,
  register,
  label,
  name,
  ...props
}: Props) => {
  const [hidden, setHidden] = useState(true);
  return (
    <div className="flex flex-col w-full">
      <label className="font-semibold" htmlFor={label}>
        {label}
      </label>
      <div className="flex bg-neutral-100 items-center border-1 border-borderColor relative">
        <input
          {...props}
          {...register(name)}
          placeholder="Password"
          type={hidden ? "password" : "text"}
          id={label}
          className={twMerge(className, input({ variant }))}
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Eye
            onClick={() => {
              setHidden((prev) => !prev);
            }}
          />
        </span>
      </div>
      {error && <p className="text-red-700 font-semibold">{error}</p>}
    </div>
  );
};

export default PasswordInput;
