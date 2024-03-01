import { Progress } from "@mantine/core";
import { FC } from "react";
import { TExpenseIncome } from "../utils/types";

export const ExpenseIncome: FC<TExpenseIncome> = (props: TExpenseIncome) => {
  const { expensePercentage, expenseTotal, incomePercentage, incomeTotal } =
    props;

  return (
    <div className="border border-[#E2E8F0] border-solid flex flex-col gap-y-4 p-4 rounded-2xl w-full">
      <span className="font-medium text-[20px]">Expenses and income</span>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <span className="font-medium text-[16px]">Expense</span>
          <span className="font-semibold text-[18px]">
            {expensePercentage}%
          </span>
          <span className="font-medium text-[#656565] text-[12px]">
            {expenseTotal}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-normal text-[16px]">|</span>
          <span className="font-semibold text-[18px]">vs</span>
          <span className="font-normal text-[16px]">|</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-medium text-[16px]">Income</span>
          <span className="font-semibold text-[18px]">{incomePercentage}%</span>
          <span className="font-medium text-[#656565] text-[12px]">
            {incomeTotal}
          </span>
        </div>
      </div>
      <Progress.Root radius="md" size={40}>
        <Progress.Section
          color="#6B6EFF"
          value={expensePercentage}
        ></Progress.Section>
        <Progress.Section
          color="orange"
          value={incomePercentage}
        ></Progress.Section>
      </Progress.Root>
    </div>
  );
};
