"use client";

import { ChevronRight } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";

export const SidebarTriggerMobile = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { toggleSidebar, open } = useSidebar();

  return (
    <section className="items-center gap-5">
      <Button
        variant={"outline"}
        size={"icon-sm"}
        onClick={toggleSidebar}
        className="md:hidden"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      {children}
    </section>
  );
};
