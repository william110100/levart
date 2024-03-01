"use client";

import { Avatar, Tooltip } from "@mantine/core";
import { IconLogout, IconMessages, IconSearch } from "@tabler/icons-react";
import { cloneElement, useState } from "react";
import {
  Analytic,
  BalanceStatistic,
  ExpenseIncome,
  Messenger,
  Premium,
  ShoppingNote,
  Spending,
  Transaction,
  VisaCard,
} from "./components";
import { Button } from "./components/cores/Button";
import { NAVS, SPENDINGS, TRANSACTIONS } from "./utils/constants";
import { Modal } from "./components/cores/Modal";

const Page = () => {
  const [logout, setLogout] = useState<boolean>(false);
  const [menu, setMenu] = useState<string>("home");

  return (
    <main className="bg-[#EEE8FA] flex items-center min-h-screen min-w-screen scroll-smooth">
      <div className="bg-white flex flex-col h-screen items-center justify-between p-4 w-[100px]">
        <div className="flex flex-col gap-y-12 items-center p-2">
          <Tooltip label="William" position="right">
            <span className="font-semibold text-[32px]">W.</span>
          </Tooltip>
          <Tooltip label="Messenger" position="right">
            <div>
              <Button
                className="bg-[#FFC885] p-2.5 rounded-full"
                hoverScale={1}
                onClick={() => {}}
                tapScale={0.96}
                type="button"
              >
                <IconMessages color="#1E293B" size={20} />
              </Button>
            </div>
          </Tooltip>
        </div>
        <div className="bg-[#EEE8FA] flex flex-col gap-y-8 items-center p-1 rounded-full">
          {NAVS?.map(({ children, id }) => (
            <Tooltip
              className="capitalize"
              label={id}
              key={id}
              position="right"
            >
              <div>
                <Button
                  className={`${
                    id === menu ? "bg-[#6B6EFF]" : ""
                  } p-1 rounded-full`}
                  hoverScale={1}
                  onClick={() => setMenu(id)}
                  tapScale={0.96}
                  type="button"
                >
                  {id === menu
                    ? cloneElement(children, { color: "#FFFFFF" })
                    : children}
                </Button>
              </div>
            </Tooltip>
          ))}
        </div>
        <div className="bg-[#EEE8FA] flex flex-col gap-y-1 items-center p-2 rounded-full">
          <Avatar color="cyan" radius="xl">
            W
          </Avatar>
          <Button
            className="p-1"
            hoverScale={1}
            onClick={() => setLogout(true)}
            tapScale={0.96}
            type="button"
          >
            <IconLogout color="#1E293B" size={20} />
          </Button>
        </div>
      </div>
      <div className="flex flex-col h-screen gap-y-8 p-8 w-full">
        <div className="flex items-center justify-between sticky z-1">
          <div className="flex flex-col">
            <span className="font-semibold text-[24px]">Hello, William</span>
            <span className="font-medium text-[12px]">
              View and control your finances here!
            </span>
          </div>
          <Button
            className="bg-white hover:opacity-50 p-2 rounded-full"
            hoverScale={1}
            onClick={() => {}}
            tapScale={0.96}
            type="button"
          >
            <IconSearch />
          </Button>
        </div>
        <div className="flex flex-col gap-y-8 overflow-y-scroll relative">
          <div className="flex gap-8 w-full sm:flex-col md:flex-col">
            <BalanceStatistic />
            <VisaCard />
          </div>
          <div className="flex w-full sm:flex-col sm:gap-y-8 md:flex-col md:gap-y-8">
            <ShoppingNote />
            <Messenger />
          </div>
          <div className="flex gap-8 w-full sm:flex-col md:flex-col">
            <Transaction items={TRANSACTIONS} />
            <Analytic />
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-col gap-y-6 h-screen overflow-y-scroll p-6 relative w-[500px]">
        <ExpenseIncome
          expensePercentage={65}
          expenseTotal={6500}
          incomePercentage={35}
          incomeTotal={3500}
        />
        <Spending items={SPENDINGS} />
        <Premium />
      </div>
      <Modal onClose={() => setLogout(false)} show={logout}>
        <div className="flex flex-col gap-y-8 p-6 w-full">
          <span className="font-normal leading-6 text-[14px] text-black">
            Are you sure want to logout?
          </span>
          <div className="flex gap-x-2 items-center justify-end">
            <Button
              className="bg-transparent font-normal leading-5 px-4 py-3.5 rounded-lg text-[#026CB8] text-[14px] text-center"
              hoverScale={1}
              onClick={() => setLogout(false)}
              tapScale={0.96}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#DC2626] font-normal leading-5 px-4 py-3.5 rounded-lg text-[14px] text-center text-white"
              hoverScale={1}
              onClick={() => {}}
              tapScale={0.96}
            >
              Logout
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default Page;
