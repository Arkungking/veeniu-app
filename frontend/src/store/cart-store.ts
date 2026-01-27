import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { create } from "zustand";

const MAX_TOTAL_TICKETS = 5;
const MAX_TOTAL_VOUCHER = 1;

interface Ticket {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface Voucher {
  id: string;
  code: string;
  value: number;
}

interface CartState {
  tickets: Ticket[];
  vouchers: Voucher[];
  points: number;
  maxTickets: number;
  maxVoucher: number;

  isCartEmpty: () => boolean;

  addTicket: (ticket: Omit<Ticket, "qty">) => void;
  removeTicket: (ticketId: string) => void;

  addVoucher: (voucher: Voucher) => void;
  removeVoucher: (voucherId: string) => void;
  isVoucherSelected: (voucherId: string) => boolean;
  getTotalVoucher: () => number;

  setPoints: (points: number) => void;
  clearPoints: () => void;

  getTicketQuantity: (ticketId: string) => number;
  getTotalTickets: () => number;

  subtotal: string;
  discount: string;
  total: string;
}

interface CreateTransactionPayload {
  payload: {
    ticketId: string;
    qty: number;
  }[];
  voucherId?: string;
  usePoints?: number;
  email: string;
}

const calculateTotals = (
  tickets: Ticket[],
  vouchers: Voucher[],
  points: number,
) => {
  const subtotalNum = tickets.reduce((sum, t) => sum + t.price * t.qty, 0);
  const voucherDiscount = vouchers.reduce((sum, v) => sum + v.value, 0);
  const totalDiscount = voucherDiscount + points;
  const totalNum = Math.max(subtotalNum - totalDiscount, 0);

  return {
    subtotal: formatCurrency(subtotalNum),
    discount: formatCurrency(totalDiscount),
    total: formatCurrency(totalNum),
  };
};

export const useCartStore = create<
  CartState & {
    getTransactionPayload: (email: string) => CreateTransactionPayload;
  }
>((set, get) => ({
  tickets: [],
  vouchers: [],
  points: 0,
  maxTickets: MAX_TOTAL_TICKETS,
  maxVoucher: MAX_TOTAL_VOUCHER,
  ...calculateTotals([], [], 0),

  isCartEmpty: () => {
    const { tickets, vouchers, points } = get();
    return tickets.length === 0 && vouchers.length === 0 && points === 0;
  },

  addTicket: (ticket) => {
    const { tickets, vouchers, points } = get();
    const totalTickets = get().getTotalTickets();
    if (totalTickets >= MAX_TOTAL_TICKETS) return;

    const existing = tickets.find((t) => t.id === ticket.id);
    const updated = existing
      ? tickets.map((t) => (t.id === ticket.id ? { ...t, qty: t.qty + 1 } : t))
      : [...tickets, { ...ticket, qty: 1 }];

    set({ tickets: updated, ...calculateTotals(updated, vouchers, points) });
  },
  removeTicket: (ticketId) => {
    const { tickets, vouchers, points } = get();
    const updated = tickets
      .map((t) =>
        t.id === ticketId ? { ...t, qty: Math.max(t.qty - 1, 0) } : t,
      )
      .filter((t) => t.qty > 0);

    set({ tickets: updated, ...calculateTotals(updated, vouchers, points) });
  },

  addVoucher: (voucher) => {
    const { vouchers, tickets, points } = get();
    if (vouchers.length < MAX_TOTAL_VOUCHER) {
      if (vouchers.some((v) => v.id === voucher.id)) return; // avoid duplicates
      const updated = [...vouchers, voucher];
      set({ vouchers: updated, ...calculateTotals(tickets, updated, points) });
    } else toast.warning("You can only use one voucher at a time!");
  },
  removeVoucher: (voucherId) => {
    const { vouchers, tickets, points } = get();
    const updated = vouchers.filter((v) => v.id !== voucherId);
    set({ vouchers: updated, ...calculateTotals(tickets, updated, points) });
  },
  isVoucherSelected: (voucherId) => {
    const { vouchers } = get();
    return vouchers.some((v) => v.id === voucherId);
  },
  getTotalVoucher: () => {
    return get().vouchers.length;
  },

  setPoints: (points) => {
    const { tickets, vouchers } = get();
    set({ points, ...calculateTotals(tickets, vouchers, points) });
  },
  clearPoints: () => {
    const { tickets, vouchers } = get();
    set({ points: 0, ...calculateTotals(tickets, vouchers, 0) });
  },

  getTicketQuantity: (id) => {
    const ticket = get().tickets.find((t) => t.id === id);
    return ticket ? ticket.qty : 0;
  },

  getTotalTickets: () => {
    return get().tickets.reduce((sum, t) => sum + t.qty, 0);
  },

  getTransactionPayload: (email) => {
    const { tickets, vouchers, points } = get();

    const payload = tickets.map((t) => ({
      ticketId: t.id,
      qty: t.qty,
    }));

    const voucherId = vouchers.length > 0 ? vouchers[0].id : undefined;
    const usePoints = points > 0 ? points : undefined;

    return {
      payload,
      voucherId,
      usePoints,
      email,
    };
  },
}));
