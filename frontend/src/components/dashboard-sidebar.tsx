"use client";

import { LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { sidebarData } from "@/lib/const-data";
import { useSidebarStore } from "@/store/sidebar-store";
import Link from "next/link";
import { SignoutConfirmation } from "./popup-confirmation";
import { SidebarTrigger } from "./sidebar-trigger";

export function DashboardSidebar() {
  const { index, setIndex } = useSidebarStore();
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarTrigger />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="my-5">
              {sidebarData.map((item, i) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`transition-all duration-300 hover:text-white ${index == i && "bg-primary/20 dark:bg-primary/50"} active:text-white`}
                    onClick={() => {
                      setIndex(i);
                      if (window.innerWidth < 768) toggleSidebar();
                    }}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SignoutConfirmation>
          <SidebarMenuButton
            asChild
            className="hover:bg-destructive active:bg-destructive cursor-pointer transition-all duration-300 select-none hover:text-white active:text-white"
          >
            <span>
              <LogOut />
              Sign out
            </span>
          </SidebarMenuButton>
        </SignoutConfirmation>
      </SidebarFooter>
    </Sidebar>
  );
}
