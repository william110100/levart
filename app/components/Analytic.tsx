import { DonutChart } from "@mantine/charts";
import { IconCircleFilled, IconDotsVertical } from "@tabler/icons-react";
import { Button } from "./cores/Button";
import { ANALYTICS } from "../utils/constants";

export const Analytic = () => {
  return (
    <div className="bg-white flex flex-col gap-y-4 p-4 rounded-2xl w-2/6 sm:w-full md:w-full">
      <div className="flex items-center justify-between">
        <span className="font-medium">Analytics</span>
        <Button
          className="hover:bg-[#E2E8F0] p-2 rounded-full"
          hoverScale={1}
          onClick={() => {}}
          tapScale={0.96}
          type="button"
        >
          <IconDotsVertical size={20} />
        </Button>
      </div>
      <div className="flex flex-col gap-y-2 items-center w-full">
        <DonutChart data={ANALYTICS} endAngle={0} size={240} startAngle={180} />
        <div className="flex items-center justify-between -mt-[100px] w-full">
          <div className="flex gap-x-1 items-center">
            <IconCircleFilled color="#6B6EFF" size={12} />
            <span className="font-medium text-[#3C3C3C] text-[12px]">Done</span>
          </div>
          <div className="flex gap-x-1 items-center">
            <IconCircleFilled color="#6B6EFF" size={12} />
            <span className="font-medium text-[#3C3C3C] text-[12px]">
              In progress
            </span>
          </div>
          <div className="flex gap-x-1 items-center">
            <IconCircleFilled color="#6B6EFF" size={12} />
            <span className="font-medium text-[#3C3C3C] text-[12px]">
              To do
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
