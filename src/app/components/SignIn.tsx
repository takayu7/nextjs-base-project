"use client";

import React, { useEffect, useState } from "react";
import { PiPiggyBankDuotone } from "react-icons/pi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { InputField } from "@/app/components/molecules/InputField";
import { User } from "@/app/types/type";

export default function SignIn() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        console.log("データ:", data);
        setUsers(data);
      } catch (error) {
        console.error("失敗:", error);
      }
    };
    fetchData();
  }, []);

  const handleLogin = async () => {
    setLoginError(false);
    setIsLoading(true);
    try {
      const found = users.find((u) => u.address === email && u.password === password);

      if (found) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("userId", found.id);
          sessionStorage.setItem("name", found.name ?? "");
          sessionStorage.setItem("email", found.address ?? "");
          sessionStorage.setItem("birthday", String(found.birthday ?? ""));

          window.dispatchEvent(new Event("getUserInfo"));
        }
        router.push("/home");
        return;
      }

      // 見つからなかった場合
      setLoginError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-3">
        <h1 className="text-3xl font-bold font-mono text-gray-700">sign in</h1>
      </div>

      <div className="flex flex-row justify-end items-end mb-5 px-5">
        <div className="pb-1">
          <PiPiggyBankDuotone color="pink" className="w-[82px] h-[82px]" />
        </div>
        <div className="relative  w-[173px] rounded-lg bg-gray-400 p-4 text-white  text-center m-5">
          please enter your Email and Password.
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
          {isLoading ? "Signing in..." : "sign in"}
        </button>

        {loginError && (
          <p className="text-red-500 mt-3">EmailまたはPasswordが違います</p>
        )}
      </div>

      <div className="flex flex-row justify-center gap-8 pt-10">
        <p className="text-gray-400">Create a new account?</p>
        <Link href="/createAccount" className="hover:border-b-2 text-[#F06E9C]">
          create account
        </Link>
      </div>
    </>
  );
}
