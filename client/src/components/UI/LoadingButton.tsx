import { Loading02Icon } from "hugeicons-react";
import React from "react";

type LoadingButtonProps = {
  label: string;
  type: "reset" | "submit" | "button";
  loading: boolean;
  width?: number;
  className?: string;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  label,
  type,
  loading,
  className,
}) => {
  return (
    <button
      disabled={loading}
      type={type}
      className={
        "bg-primary text-white font-semibold p-2 rounded-md shadow-md hover:opacity-80 transition-opacity " +
        className
      }
    >
      {!loading && label}
      {loading && (
        <div className="flex gap-2 items-center justify-center">
          <Loading02Icon strokeWidth="3px" size={18} className="animate-spin" />
          Loading
        </div>
      )}
    </button>
  );
};

export default LoadingButton;
