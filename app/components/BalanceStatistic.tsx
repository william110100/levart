import { Coin } from "@/public";
import { BarChart, LineChart } from "@mantine/charts";
import { IconChevronDown, IconCircleArrowUp } from "@tabler/icons-react";
import Image from "next/image";
import { Button } from "./cores/Button";
import { STATISTICS } from "../utils/constants";

export const BalanceStatistic = () => {
  return (
    <div className="bg-white flex gap-x-1 p-4 rounded-2xl w-3/5 sm:w-full md:w-full">
      <div className="flex flex-col gap-y-1 justify-center">
        <span className="font-medium text-[16px]">Balance statistics</span>
        <span className="font-semibold text-[24px]">$564</span>
        <div className="flex flex-col">
          <div className="border-b border-b-[#E2E8F0] border-solid flex gap-x-4 items-center py-4">
            <Image alt="Coin" height={32} src={Coin} width={32} />
            <span className="font-medium text-[#656565] text-[12px]">
              Your total balance
            </span>
          </div>
          <div className="flex gap-x-1 items-center py-4">
            <LineChart
              curveType="natural"
              data={STATISTICS}
              dataKey="month"
              gridAxis="none"
              h={40}
              series={[{ color: "violet.6", name: "Expense" }]}
              tickLine="none"
              withDots={false}
              withXAxis={false}
              withYAxis={false}
            />
            <IconCircleArrowUp size={24} />
            <span className="text-[12px]">6%</span>
          </div>
        </div>
        <span className="font-medium text-[#656565] text-[12px]">
          Always see your earnings updates
        </span>
      </div>
      <div className="flex flex-col gap-y-2 items-end w-full">
        <Button
          className="bg-[#E5E5E5] flex gap-x-2 hover:opacity-50 items-center p-2 rounded-lg"
          hoverScale={1}
          onClick={() => {}}
          tapScale={0.96}
          type="button"
        >
          <span className="font-medium text-[12px]">Filter</span>
          <IconChevronDown size={18} />
        </Button>
        <BarChart
          data={STATISTICS}
          dataKey="month"
          h={200}
          series={[
            { color: "violet.6", name: "Expense" },
            { color: "violet.2", name: "Income" },
          ]}
          tickLine="y"
        />
      </div>
    </div>
  );
};
