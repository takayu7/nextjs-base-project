import { HomeTabs } from "@/app/components/home/HomeTabs";

export const Home = () => {
  const today = new Date();
  const formatted = today
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
    })
    .split("/")
    .join(".");
  console.log(today);
  console.log(formatted);
  return (
    <>
      <div className="w-[350px]">
        <div className="flex justify-center mt-3 flex-col items-center gap-2">
          <h1 className="text-maincolor text-xl font-bold font-mono ">
            {formatted}
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
