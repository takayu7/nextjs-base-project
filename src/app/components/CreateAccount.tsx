"use client";
import { useTransition } from "react";
import { PiPiggyBankDuotone } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { InputField } from "@/app/components/molecules/InputField";
import { ButtonGroup } from "@/app/components/molecules/ButtonGroup";
import { useForm } from "react-hook-form";
import { User } from "@/app/types/type";

export const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSave = async (user: User) => {
    console.log("user:", user);

    // アカウント登録
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("ユーザー登録に失敗しました");
      return;
    }

    // ログイン
    const login = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: user.address,
        password: user.password,
      }),
      cache: "no-store",
    });

    const loginData = await login.json();

    // セッション保存
    if (typeof window !== "undefined") {
      sessionStorage.setItem("name", loginData.name ?? "");
      sessionStorage.setItem("email", loginData.address ?? "");
      sessionStorage.setItem("birthday", String(loginData.birthday ?? ""));
      sessionStorage.setItem("userId", String(loginData.userId ?? ""));
      window.dispatchEvent(new Event("headerUpdate"));
    }

    // ホーム画面に遷移
    setTimeout(() => {
      startTransition(() => router.push("/home"));
    }, 200);
  };

  return (
    <div className="pt-15">
      <div className="flex justify-center mt-3">
        <h1 className="text-3xl font-bold font-mono text-gray-700">
          create account
        </h1>
      </div>

      <div className="flex flex-row justify-end items-end mb-5 px-5">
        <div className="pb-2">
          <PiPiggyBankDuotone color="pink" className="w-[70px] h-[75px]" />
        </div>
        <div className="relative w-[177px] rounded-lg bg-gray-400 p-4 text-white text-center m-5">
          Please enter your Name, Birthday, Email and Password.
          <div className="absolute z-10 left-[12px]">
            <div className="rounded-sm before:absolute before:-top-5 before:-left-5 before:h-4 before:w-4 before:-rotate-45 before:transform before:bg-gray-400" />
          </div>
        </div>
      </div>

      <form>
        <ul className="text-xl space-y-8 flex flex-col px-9">
          {/* 名前 */}
          <li className="flex flex-col gap-3">
            <InputField
              label="Name"
              id="name"
              type="text"
              placeholder="name"
              isError={!!errors.name}
              {...register("name", {
                required: "Name is required.",
                maxLength: {
                  value: 30,
                  message: "Please enter no more than 30 characters.",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </li>

          {/* 生年月日 */}
          <li className="flex flex-col gap-3">
            <label className="font-semibold text-[#F06E9C]">Birthday</label>
            <input
              type="date"
              id="birthday"
              max={new Date().toISOString().split("T")[0]}
              className="rounded-sm border-b p-1 outline-none"
              {...register("birthday", {
                required: "Date of birth is required.",
                validate: (value) => {
                  if (!value) return "Date of birth is required.";
                  const today = new Date();
                  const selectedDate = new Date(value);
                  return (
                    selectedDate <= today || "You cannot select a future date."
                  );
                },
              })}
            />
            {errors.birthday && (
              <p className="text-red-500 text-sm mt-1">
                {errors.birthday.message}
              </p>
            )}
          </li>

          {/* メールアドレス */}
          <li className="flex flex-col gap-3">
            <InputField
              label="Email"
              id="email"
              type="email"
              placeholder="email"
              isError={!!errors.address}
              {...register("address", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format.",
                },
              })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </li>

          {/* パスワード */}
          <li className="flex flex-col gap-3">
            <InputField
              label="Password"
              id="password"
              type="password"
              placeholder="password"
              isError={!!errors.password}
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Please enter at least 6 characters.",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </li>
        </ul>

        <div className="flex flex-col items-center pt-10">
          <ButtonGroup
            label={isPending ? "creating..." : "create"}
            varient="income"
            onClick={handleSubmit(onSave)}
          />
        </div>
      </form>
    </div>
  );
};
