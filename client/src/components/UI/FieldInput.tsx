import React, { HTMLInputTypeAttribute } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

type FieldInputProps = {
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  label?: string;
  register: UseFormRegister<any>;
};

const FieldInput: React.FC<FieldInputProps> = ({
  name,
  type,
  placeholder,
  label,
  register,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label>{label}</label>}
      <input
        placeholder={placeholder}
        type={type}
        {...register(name)}
        className="p-2 border-solid border border-borderColor"
      />
    </div>
  );
};

export default FieldInput;
