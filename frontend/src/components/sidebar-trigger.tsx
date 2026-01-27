"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { useSidebarStore } from "@/store/sidebar-store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function SidebarTrigger() {
  const { toggleSidebar, open } = useSidebar();
  const { setIndex } = useSidebarStore();

  return (
    <div
      className={`flex w-full items-center transition-all duration-300 ${
        open ? "justify-between" : "justify-center"
      } p-3`}
    >
      {open && (
        <Link
          href="/dashboard"
          className="text-primary cursor-pointer text-4xl font-bold"
          onClick={() => {
            setIndex(0);
            if (window.innerWidth < 768) toggleSidebar();
          }}
        >
          Veeniu
        </Link>
      )}

      <Button variant={"outline"} size={"icon-sm"} onClick={toggleSidebar}>
        {open ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
