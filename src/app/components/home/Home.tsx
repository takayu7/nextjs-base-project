import { HomeTabs } from "@/app/components/home/HomeTabs";

export const Home = () => {
  return (
    <>
      <div className="w-[350px]">
        <div className="flex justify-center mt-3 flex-col items-center gap-2">
          <h1  className="text-maincolor text-xl font-bold font-mono ">
            2025.09
          </h1>
          <h1 className="text-2xl font-bold font-mono text-[#F06E9C]">
            ¥200,000
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <HomeTabs />
        </div>
      </div>
    </>
  );
};
