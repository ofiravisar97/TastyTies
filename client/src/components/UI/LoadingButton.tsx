import { cva, type VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

const button = cva(
  ["shadow-sm rounded-sm flex items-center py-[4px] justify-center gap-2"],
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
      },
    },
  }
);

type Props = {
  children?: React.ReactNode;
  className?: string;
  isLoading: boolean;
} & VariantProps<typeof button> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const LoadingButton = ({
  isLoading,
  children,
  variant,
  className,
  ...props
}: Props) => {
  return (
    <button {...props} className={twMerge(className, button({ variant }))}>
      {isLoading ? <Loader2 className={"animate-spin size-4"} /> : null}{" "}
      {children}
    </button>
  );
};

export default LoadingButton;
