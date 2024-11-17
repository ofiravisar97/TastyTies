"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";
import React from "react";
import { Eye } from "lucide-react";

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
  error?: string | null;
  icon?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof input>;

const PasswordInput = ({ error, variant, className, ...props }: Props) => {
  const [hidden, setHidden] = useState(true);
  return (
    <div className="flex flex-col w-full">
      <label className="font-semibold" htmlFor="password">
        Password
      </label>
      <div className="flex bg-neutral-100 items-center border-1 border-borderColor relative">
        <input
          placeholder="Password"
          type={hidden ? "password" : "text"}
          id="password"
          name="password"
          {...props}
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
      {error && <p className="text-red-700 font-semibold">error</p>}
    </div>
  );
};

export default PasswordInput;
