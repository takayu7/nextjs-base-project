"use client";

import React, {  useState } from "react";
import { PiPiggyBankDuotone } from "react-icons/pi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { InputField } from "@/app/components/molecules/InputField";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoginError(false);
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: email, password }),
      });

      if (!res.ok) {
        setLoginError(true);
        return;
      }

      const user = await res.json();
      console.log("login response:", user);

      sessionStorage.setItem("userId", String(user.userId));
      sessionStorage.setItem("name", user.name ?? "");
      sessionStorage.setItem("email", user.address ?? "");
      sessionStorage.setItem("birthday", String(user.birthday ?? ""));

      window.dispatchEvent(new Event("headerUpdate"));

      router.push("/home");
    } catch (error) {
      console.error(error);
      setLoginError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-col pt-20">
      <div className="flex justify-center mt-3 ">
        <h1 className="text-3xl font-bold font-mono text-gray-700">sign in</h1>
      </div>

      <div className="flex flex-row justify-end items-end mb-5 px-5">
        <div className="pb-1">
          <PiPiggyBankDuotone color="pink" className="w-[70px] h-[75px]" />
        </div>
        <div className="relative  w-[173px] rounded-lg bg-gray-400 p-4 text-white  text-center m-5">
          please enter your Email and Password.
           <div className="absolute z-10 left-[12px]">
            <div className="rounded-sm before:absolute before:-top-5 before:-left-5 before:h-4 before:w-4 before:-rotate-45 before:transform before:bg-gray-400" />
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </li>
        <li className="flex flex-col gap-3">
          <InputField
            label="Password"
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </li>
      </ul>

      <div className="flex flex-col items-center pt-13">
        <button
          type="button"
          className="btn rounded-[3px] bg-[#F6A2BF] text-white btn-xl btn-wide hover:bg-pink-300 w-[182px] h-[40px]"
          onClick={() => handleLogin()}
          disabled={isLoading}
        >
          {isLoading ? "signi in..." : "sign in"}
        </button>

        {loginError && (
          <p className="text-red-500 mt-3">Email or password is incorrect.</p>
        )}
      </div>

      <div className="flex flex-row justify-center gap-8 pt-10">
        <p className="text-gray-400">Create a new account?</p>
        <Link href="/createAccount" className="hover:border-b-2 text-[#F06E9C]">
          create account
        </Link>
      </div>
    </div>
  );
}
