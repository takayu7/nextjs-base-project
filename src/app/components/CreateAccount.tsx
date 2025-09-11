"use client";
// import { useEffect, useState } from "react";
import { PiggyBank } from "lucide-react";
import { useRouter } from "next/navigation";
import { InputField } from "@/app/components/molecules/InputField";

export const CreateAccount = () => {
  const router = useRouter();
  return (
    <>
      <div className="">
        <div className="flex justify-center mt-3 ">
          <h1 className="text-3xl font-bold font-mono text-gray-700">
            create account
          </h1>
        </div>

      <div className="flex flex-row justify-end items-end mb-5 px-5">
        <div className="pb-2">
          <PiggyBank color="pink" className="w-[82px] h-[82px]" />
        </div>
        <div className="relative  w-[177px] rounded-lg bg-gray-400 p-4 text-white  text-center m-5">
          please enter your Name, Birthday, Email and Password.
          <div className="absolute z-10 left-[12px]">
            <div className="rounded-sm before:absolute before:-top-5 before:-left-5 before:h-4 before:w-4 before:-rotate-45 before:transform before:border-black before:bg-gray-400" />
          </div>
        </div>
      </div>

        <ul className="text-xl space-y-8  flex flex-col px-9">
          <li className="flex flex-col gap-3">
            <InputField label="Name" id="name" type="name" placeholder="name" />
          </li>
          <li className="flex flex-col gap-3 pr-18">
            <label className="font-semibold text-[#F06E9C]">Birthday</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              className="input rounded-sm outline-none border-b-1 p-1 flex justify-center"
            />
          </li>
          <li className="flex flex-col gap-3">
            <InputField
              label="Email"
              id="email"
              type="email"
              placeholder="email"
            />
          </li>
          <li className="flex flex-col gap-3">
            <InputField
              label="Password"
              id="password"
              type="password"
              placeholder="password"
            />
          </li>
        </ul>

        <div className="flex flex-col items-center pt-13">
          <button
            type="button"
            className="btn rounded-[3px] bg-[#F6A2BF] text-white btn-xl btn-wide hover:bg-pink-300 w-[182px] h-[40px]"
            onClick={() => router.push("/home")}
          >
            create account
          </button>
        </div>
      </div>
    </>
  );
};
