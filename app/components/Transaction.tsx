"use client";

import { Avatar } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { FC, useState } from "react";
import { Button } from "./cores/Button";
import { TTransaction } from "../utils/types";

export const Transaction: FC<TTransaction> = (props: TTransaction) => {
  const { items } = props;
  const [sortBy, setSortBy] = useState<string>("newest");

  const onTransform = (name: string): string => {
    const initials = name.match(/\b\w/g) || [];
    return (initials.shift() || "") + (initials.pop() || "");
  };

  return (
    <div className="bg-white flex flex-col gap-y-4 h-[280px] p-4 rounded-2xl w-4/6 sm:w-full md:w-full">
      <div className="flex items-center justify-between sticky top-0">
        <span className="font-medium">Last transactions</span>
        <div className="flex gap-x-4 items-center">
          <Button
            className={`${
              sortBy === "newest" ? "underline" : ""
            } font-normal text-[12px]`}
            hoverScale={1}
            onClick={() => setSortBy("newest")}
            tapScale={0.96}
            type="button"
          >
            Newest
          </Button>
          <Button
            className={`${
              sortBy === "oldest" ? "underline" : ""
            } font-normal text-[12px]`}
            hoverScale={1}
            onClick={() => setSortBy("oldest")}
            tapScale={0.96}
            type="button"
          >
            Oldest
          </Button>
        </div>
      </div>
      <div className="border-y border-y-[#E2E8F0] border-solid flex flex-col overflow-y-scroll">
        {items?.map(({ amount, date, name }, index) => (
          <div
            className={`${
              index === items?.length - 1
                ? ""
                : "border-b border-b-[#E2E8F0] border-solid"
            } flex items-center justify-between py-3`}
            key={index}
          >
            <div className="flex gap-x-2 items-center">
              <Avatar color="indigo" radius="xl">
                {onTransform(name)}
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold">{name}</span>
                <span className="font-normal text-[#656565] text-[12px]">
                  {date}
                </span>
              </div>
            </div>
            <div className="flex gap-x-4 items-center justify-end">
              <span className="font-medium">
                {amount < 0 ? `-$${Math.abs(amount)}` : `+$${amount}`}
              </span>
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
          </div>
        ))}
      </div>
    </div>
  );
};
