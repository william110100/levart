import { Hospital, Store, Ticket } from "@/public";
import {
  IconBell,
  IconClock,
  IconSettings,
  IconSmartHome,
  IconUsers,
  IconWallet,
} from "@tabler/icons-react";

export const ANALYTICS = [
  {
    color: "indigo.6",
    name: "Done",
    value: 100,
  },
  {
    color: "orange.6",
    name: "In progress",
    value: 100,
  },
  {
    color: "red.6",
    name: "To do",
    value: 100,
  },
  {
    color: "gray.2",
    name: "",
    value: 100,
  },
];

export const ITEMS = ["Macbook", "Bicycle", "Motorcycle", "Iphone 14 Pro Max"];

export const NAVS = [
  {
    children: <IconSmartHome />,
    id: "home",
  },
  {
    children: <IconBell />,
    id: "notification",
  },
  {
    children: <IconClock />,
    id: "history",
  },
  {
    children: <IconUsers />,
    id: "group",
  },
  {
    children: <IconWallet />,
    id: "wallet",
  },
  {
    children: <IconSettings />,
    id: "settings",
  },
];

export const SPENDINGS = [
  {
    date: "May 30, 2023 at 08:00 pm",
    image: Store,
    name: "Online store",
  },
  {
    date: "May 28, 2023 at 10:00 pm",
    image: Hospital,
    name: "Pay the hospital",
  },
  {
    date: "May 10, 2023 at 12:00 pm",
    image: Ticket,
    name: "Tickets",
  },
];

export const STATISTICS = [
  {
    Expense: 60,
    Income: 50,
    month: "Oct",
  },
  {
    Expense: 36,
    Income: 22,
    month: "Nov",
  },
  {
    Expense: 30,
    Income: 20,
    month: "Dec",
  },
  {
    Expense: 25,
    Income: 18,
    month: "Jan",
  },
  {
    Expense: 20,
    Income: 15,
    month: "Feb",
  },
];

export const TRANSACTIONS = [
  {
    amount: -3000,
    date: "02 July, 2023",
    name: "Bessie Couper",
  },
  {
    amount: 1970,
    date: "02 July, 2023",
    name: "Guy Hawkins",
  },
  {
    amount: -5000,
    date: "02 July, 2023",
    name: "Floyd Miles",
  },
  {
    amount: 8000,
    date: "02 July, 2023",
    name: "John Hopkins",
  },
];
