"use client";
// import { useEffect, useState } from "react";
import { PiggyBank } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { InputField } from "@/app/components/molecules/InputField";

export const SignIn = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-center mt-3">
        <h1 className="text-3xl font-bold font-mono text-gray-700">sign in</h1>
      </div>

      <div className="flex flex-row justify-end items-end mb-5 px-5">
        <div className="pb-1">
          <PiggyBank color="pink" className="w-[82px] h-[82px]" />
        </div>
        <div className="relative  w-[173px] rounded-lg bg-gray-400 p-4 text-white  text-center m-5">
          please enter your Email and Password.
          <div className="absolute z-10 left-[12px]">
            <div className="rounded-sm before:absolute before:-top-5 before:-left-5 before:h-4 before:w-4 before:-rotate-45 before:transform before:border-black before:bg-gray-400" />
          </div>
        </div>
      </div>

      <ul className="text-xl space-y-8  flex flex-col px-9">
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
          sign in
        </button>
      </div>

      <div className="flex flex-row justify-center gap-8 pt-10">
        <p className="text-gray-400">Create a new account?</p>
        <Link href="/createAccount" className="hover:border-b-2 text-[#F06E9C]">
          create account{" "}
        </Link>
      </div>
    </>
  );
};
