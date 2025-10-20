"use client";
import { useState, useTransition } from "react";
import { PiPiggyBankDuotone } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { InputField } from "@/app/components/molecules/InputField";
import { createComment } from "@/app/api/Comments";
import { User } from "@/app/types/type";
import { ButtonGroup } from "@/app/components/molecules/ButtonGroup";

export const CreateAccount = () => {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");

  const router = useRouter();

  const onSave = async (user: User) => {
    console.log("user:", user);
    //アカウント登録
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      cache: "no-store",
    });
    const data = await res.text();
    console.log("Response text:", data);

    //ログイン
    const login = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address, password }),
      cache: "no-store",
    });
    const loginData = await login.json();

    //保存
    // localStorage.setItem("user", JSON.stringify(loginData));
    sessionStorage.setItem("name", loginData.name ?? "");
    sessionStorage.setItem("email", loginData.address ?? "");
    sessionStorage.setItem("birthday", String(loginData.birthday ?? ""));
    sessionStorage.setItem("userId", loginData.userId ?? "");
    window.dispatchEvent(new Event("getUserInfo"));

    //ホーム画面に遷移
    setTimeout(() => {
      startTransition(() => {
        router.push("/home");
      });
    }, 200);
  };

  const handleSave = () => {
    const userData: User = {
      id: "",
      name: name,
      password: password,
      address: address,
      birthday: birthday ? new Date(birthday) : null,
    };
    startTransition(() => {
      onSave(userData);
    });
  };

  return (
    <>
      <div>
        <div className="flex justify-center mt-3 ">
          <h1 className="text-3xl font-bold font-mono text-gray-700">
            create account
          </h1>
        </div>

        <div className="flex flex-row justify-end items-end mb-5 px-5">
          <div className="pb-2">
            <PiPiggyBankDuotone color="pink" className="w-[82px] h-[82px]" />
          </div>
          <div className="relative  w-[177px] rounded-lg bg-gray-400 p-4 text-white  text-center m-5">
            please enter your Name, Birthday, Email and Password.
            <div className="absolute z-10 left-[12px]">
              <div className="rounded-sm before:absolute before:-top-5 before:-left-5 before:h-4 before:w-4 before:-rotate-45 before:transform before:border-black before:bg-gray-400" />
            </div>
          </div>
        </div>

        <form action={createComment}>
          <ul className="text-xl space-y-8  flex flex-col px-9">
            <li className="flex flex-col gap-3">
              <InputField
                label="Name"
                id="name"
                type="name"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
            </li>
            <li className="flex flex-col gap-3 pr-18">
              <label className="font-semibold text-[#F06E9C]">Birthday</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                className="input rounded-sm outline-none border-b-1 p-1 flex justify-center"
                onChange={(e) => setBirthday(e.target.value)}
              />
            </li>
            <li className="flex flex-col gap-3">
              <InputField
                label="Email"
                id="email"
                type="email"
                placeholder="email"
                onChange={(e) => setAddress(e.target.value)}
              />
            </li>
            <li className="flex flex-col gap-3">
              <InputField
                label="Password"
                id="password"
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>
          </ul>
        </form>
        <div className="flex flex-col items-center pt-13">
          <ButtonGroup
            label="Create Account"
            varient="income"
            onClick={() => {
              handleSave();
              console.log(name, password, birthday, address);
            }}
          />
        </div>
      </div>
    </>
  );
};
