import { IconArrowRight, IconDotsVertical } from "@tabler/icons-react";
import Image from "next/image";
import { FC } from "react";
import { Button } from "./cores/Button";
import { TSpending } from "../utils/types";

export const Spending: FC<TSpending> = (props: TSpending) => {
  const { items } = props;

  return (
    <div className="border border-[#E2E8F0] border-solid flex flex-col gap-y-4 p-4 rounded-2xl w-full">
      <div className="flex items-center justify-between">
        <span className="font-medium text-[18px]">Latest spending</span>
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
      <div className="flex flex-col">
        {items?.map(({ date, image, name }, index) => (
          <div
            className={`${
              index < items?.length - 1
                ? "border-b border-b-[#E2E8F0] border-solid"
                : ""
            } flex gap-x-4 items-center py-4`}
            key={index}
          >
            <Image alt="Shining" height={60} src={image} width={60} />
            <div className="flex flex-col">
              <span className="font-medium text-[16px]">{name}</span>
              <span className="font-medium text-[#656565] text-[12px]">
                {date}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Button
        className="flex gap-x-2 hover:opacity-50 items-center justify-center"
        hoverScale={1}
        onClick={() => {}}
        tapScale={0.96}
        type="button"
      >
        <span className="font-medium text-[#6B6EFF] text-[16px]">View all</span>
        <IconArrowRight color="#6B6EFF" size={18} />
      </Button>
    </div>
  );
};
