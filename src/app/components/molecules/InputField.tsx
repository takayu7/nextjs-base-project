"use client";

import React, { forwardRef } from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  color?: string;
  varient?: "normal" | "box" | "category";
  isError?: boolean;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, color, varient = "normal", isError = false, ...props }, ref) => {
    return (
      <div
        className={
          varient === "normal" ? "flex flex-col gap-3 w-full max-w-sm" : ""
        }
      >
        {label && (
          <label
            htmlFor={props.id}
            style={{ color }}
            className={
              varient === "normal"
                ? "font-semibold text-[#F06E9C]"
                : varient === "category"
                ? "font-semibold text-[#7A7A7A] pl-0.5 pr-1"
                : ""
            }
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          {...props}
          className={
            varient === "normal"
              ? `rounded-sm border-b border-gray-300 p-2 outline-none focus:border-[#F06E9C] text-sm ${
                  isError ? "border-red-500" : ""
                }`
              : varient === "box"
              ? "rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[195px] h-[60px] text-center text-[22px] text-[#E93578]"
              : varient === "category"
              ? "rounded-[3px] border-2 px-2 py-1 w-[160px] h-[30px] text-sm text-[#7A7A7A]"
              : ""
          }
        />
      </div>
    );
  }
);

InputField.displayName = "InputField";
