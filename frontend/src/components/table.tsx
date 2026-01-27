"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SectionTitle } from "@/components/ui/section-title";
import { formatCurrency, formatDate } from "@/lib/utils";
import clsx from "clsx";
import { Button } from "./ui/button";

function getValueByPath(obj: Record<string, any>, path: string): unknown {
  return path.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, any>)[key];
    }
    return undefined;
  }, obj);
}

export interface Column {
  key: string;
  title: string;
}

export interface DropdownItem {
  label: string;
  onClick?: (row: any) => void;
  destructive?: boolean;
  isPortal?: boolean;
  children?: DropdownItem[];
}

export interface TableProps {
  title: string;
  columns: Column[];
  data: Record<string, any>[];
  actions?: {
    label?: string;
    items: DropdownItem[];
  };
  actionLabel?: string;
  className?: string;
}

export const Table = ({
  title,
  columns,
  data,
  actions,
  actionLabel = "Action",
  className,
}: TableProps) => {
  const priceKey = ["amount", "price", "value", "finalAmount"];
  const dateKey = ["date", "createdAt", "updatedAt", "canceledAt", "expiresAt"];

  return (
    <div className={clsx("bg-card rounded-lg p-5", className)}>
      {title && <SectionTitle variant="small">{title}</SectionTitle>}

      {data.length === 0 ? (
        <div className="text-muted-foreground flex h-[400px] items-center justify-center rounded-2xl border-2 border-dashed">
          No data available
        </div>
      ) : (
        <div className="scroll-hidden overflow-x-auto">
          <div className="min-w-max">
            <table className="w-full rounded-md text-left whitespace-nowrap">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={clsx(
                        "text-foreground px-4 py-3 text-sm font-semibold",
                        col.key === "action" && "px-0 text-right",
                      )}
                    >
                      {col.title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="border-t transition-colors">
                    {columns.map((col) => {
                      const key = col.key;

                      let rawValue: unknown =
                        key === "no"
                          ? i + 1
                          : (getValueByPath(row, key) ?? "-");

                      let value: string | number | React.ReactNode =
                        rawValue as string | number;

                      if (priceKey.includes(key)) {
                        const numericValue = Number(value);
                        if (!isNaN(numericValue)) {
                          value = formatCurrency(numericValue);
                        }
                      }

                      if (dateKey.includes(key)) {
                        const dateValue = new Date(String(value));
                        if (!isNaN(dateValue.getTime())) {
                          value = formatDate(dateValue.toISOString());
                        }
                      }

                      if (key === "status" && value) {
                        const TRANSACTION_STATUS_LABELS: Record<
                          string,
                          string
                        > = {
                          WAITING_FOR_PAYMENT: "Waiting for Payment",
                          WAITING_FOR_CONFIRMATION: "Waiting for Confirmation",
                          DONE: "Completed",
                          REJECTED: "Rejected",
                          EXPIRED: "Expired",
                          CANCELED: "Canceled",
                        };
                        const strValue = String(value);
                        value = TRANSACTION_STATUS_LABELS[strValue] ?? strValue;
                      }

                      return (
                        <td
                          key={key}
                          className="px-4 py-4 text-sm font-light whitespace-nowrap opacity-70"
                        >
                          {value}
                        </td>
                      );
                    })}

                    {actions && (
                      <td className="px-1 text-right whitespace-nowrap">
                        <TableDropdown
                          label={actions.label}
                          items={actions.items.map((item) => ({
                            ...item,
                            onClick: item.onClick
                              ? () => item.onClick?.(row)
                              : undefined,
                            children: item.children
                              ? item.children.map((child) => ({
                                  ...child,
                                  onClick: child.onClick
                                    ? () => child.onClick?.(row)
                                    : undefined,
                                }))
                              : undefined,
                          }))}
                        >
                          <Button variant="outline">{actionLabel}</Button>
                        </TableDropdown>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export const TableDropdown = ({
  children,
  label,
  items,
}: {
  children: React.ReactNode;
  label?: string;
  items: DropdownItem[];
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        {label && <DropdownMenuSeparator />}

        {items.map((item, i) =>
          item.isPortal && item.children ? (
            <DropdownMenuSub key={i}>
              <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {item.children.map((subItem, j) => (
                    <DropdownMenuItem
                      key={j}
                      onClick={subItem.onClick}
                      className={
                        subItem.destructive
                          ? "text-destructive focus:text-destructive"
                          : ""
                      }
                    >
                      {subItem.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ) : (
            <DropdownMenuItem
              key={i}
              onClick={item.onClick}
              className={
                item.destructive
                  ? "text-destructive focus:text-destructive"
                  : ""
              }
            >
              {item.label}
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
