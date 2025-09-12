"use client";

import React from "react";

type InputFieldProps = {
  label?: string;
  id: string;
  name?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  color?: string;
  varient?: "normal" | "box";
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  color,
  varient = "normal",
}) => {
  return (
    <div
      className={
        varient === "normal"
          ? "flex flex-col gap-3 w-full max-w-sm"
          : ""
      }
    >
      <label htmlFor={id} style={{ color }} className="font-semibold ">
        {label}
      </label>
      <input
        id={id}
        name={name ?? id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={
          varient === "normal"
            ? "rounded-sm border-b border-gray-300 p-2 outline-none focus:border-[#F06E9C] text-sm"
            : "rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[195px] h-[60px] text-center text-[22px] text-[#E93578]"
        }
      />
    </div>
  );
};
