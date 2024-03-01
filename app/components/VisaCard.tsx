import { Bitcoin, Visa } from "@/public";
import Image from "next/image";

export const VisaCard = () => {
  return (
    <div className="bg-[#6B6EFF] flex min-h-full justify-between p-4 relative rounded-2xl w-2/5 sm:min-h-fit sm:w-full md:min-h-fit md:w-full">
      <div className="flex flex-col h-full justify-between relative z-1">
        <span className="font-semibold text-[24px] text-white">W.</span>
        <div className="flex flex-col gap-y-2 relative">
          <span className="font-medium text-white">**** 9838</span>
          <span className="font-medium text-white">William</span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Image alt="Bitcoin" height={200} src={Bitcoin} width={200} />
      </div>
      <div className="flex flex-col h-full items-end justify-between relative z-1">
        <Image alt="Visa" className="pt-2" height={20} src={Visa} width={60} />
        <span className="font-medium text-white">08/12</span>
      </div>
    </div>
  );
};
