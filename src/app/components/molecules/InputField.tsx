"use client";

import React from "react";

type InputFieldProps = {
  label: string;
  id: string;
  name?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <label htmlFor={id} className="font-semibold text-[#F06E9C]">
        {label}
      </label>
      <input
        id={id}
        name={name ?? id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="rounded-sm border-b border-gray-300 p-2 outline-none focus:border-[#F06E9C] text-sm"
      />
    </div>
  );
};
