import {
  BadgeDollarSign,
  BadgePercent,
  CircleUserRound,
  LayoutDashboard,
  PartyPopper,
  Ticket,
} from "lucide-react";

export const categories = [
  "Category",
  "Music",
  "Art",
  "Food",
  "Hobbies",
  "Sports",
  "Comedy",
];

export const cities = [
  "Location",
  "Jakarta",
  "Bandung",
  "Bali",
  "Medan",
  "Makassar",
  "Padang",
];

export const catDropdown = {
  title: "Category",
  items: categories,
};

export const locDropdown = {
  title: "Location",
  items: cities,
};

export const statusDropdown = [
  "WAITING_FOR_PAYMENT",
  "WAITING_FOR_CONFIRMATION",
  "DONE",
  "REJECTED",
  "EXPIRED",
  "CANCELED",
];

export const sidebarData = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Event",
    url: "/dashboard/events",
    icon: PartyPopper,
  },
  {
    title: "Voucher",
    url: "/dashboard/vouchers",
    icon: BadgePercent,
  },
  {
    title: "Ticket",
    url: "/dashboard/tickets",
    icon: Ticket,
  },
  {
    title: "Transaction",
    url: "/dashboard/transactions",
    icon: BadgeDollarSign,
  },
  {
    title: "Account",
    url: "/dashboard/account",
    icon: CircleUserRound,
  },
];

export const monthData = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const bankData = [
  {
    key: "Bank Name",
    val: "BCA (Bank Central Asia)",
  },
  {
    key: "Account Holder",
    val: "PT Hooman Stay Together",
  },
  {
    key: "Account Number",
    val: "5442138990",
  },
];
