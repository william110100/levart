import { Crown } from "@/public";
import Image from "next/image";
import { Button } from "./cores/Button";

export const Premium = () => {
  return (
    <div className="border border-[#E2E8F0] border-solid flex flex-col gap-y-4 p-4 rounded-2xl w-full">
      <span className="font-medium text-[18px] text-center">Go to premium</span>
      <div className="flex flex-col gap-y-1">
        <Image alt="Crown" height={30} src={Crown} width={80} />
        <span className="font-semibold text-[20px]">Need more features?</span>
        <span className="font-medium text-[#656565] text-[16px]">
          Update your account to premium to get more features
        </span>
      </div>
      <Button
        className="bg-[#6B6EFF] flex font-normal h-14 hover:opacity-50 items-center justify-center rounded-2xl text-[14px] text-white"
        hoverScale={1}
        onClick={() => {}}
        tapScale={0.96}
        type="button"
      >
        Get now
      </Button>
    </div>
  );
};
