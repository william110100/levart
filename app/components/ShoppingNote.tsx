import { Checkbox } from "@mantine/core";
import {
  IconChevronRight,
  IconDotsVertical,
  IconPlus,
} from "@tabler/icons-react";
import { Button } from "./cores/Button";
import { ITEMS } from "../utils/constants";

export const ShoppingNote = () => {
  return (
    <div className="border-r border-r-[#E2E8F0] border-solid bg-white flex flex-col gap-y-4 p-4 rounded-l-2xl w-3/5 sm:rounded-2xl sm:w-full md:rounded-2xl md:w-full">
      <span className="font-semibold text-[18px]">List of items to buy</span>
      <div className="flex gap-x-4 items-center">
        <div className="flex flex-col">
          <span className="font-semibold text-[24px]">02:00</span>
          <span className="font-semibold text-[#3C3C3C] text-[12px]">
            Sat, August 12
          </span>
        </div>
        <IconChevronRight color="#3C3C3C" size={24} />
        <div className="flex flex-col">
          <span className="font-semibold text-[24px]">05:00</span>
          <span className="font-semibold text-[#3C3C3C] text-[12px]">
            Sat, September 12
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-1 items-center">
            <span className="text-[#3C3C3C] text-[12px]">0/3</span>
            <span className="font-medium text-[12px]">Shopping list</span>
          </div>
          <Button
            className="flex gap-x-2 items-center"
            hoverScale={1}
            onClick={() => {}}
            tapScale={0.96}
            type="button"
          >
            <IconPlus size={16} />
            <span className="font-medium text-[12px]">Add an item</span>
          </Button>
        </div>
        <div className="gap-2 grid grid-cols-2">
          {ITEMS?.map((value, index) => (
            <div
              className="bg-[#E2E8F0] flex items-center justify-between p-2 rounded-lg"
              key={index}
            >
              <Checkbox color="violet" label={value} />
              <Button
                className="hover:bg-white p-1 rounded-full"
                hoverScale={1}
                onClick={() => {}}
                tapScale={0.96}
                type="button"
              >
                <IconDotsVertical size={20} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
