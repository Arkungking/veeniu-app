"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const hiddenRoutes = ["/auth", "/dashboard"];

  if (hiddenRoutes.some((route) => pathname.startsWith(route))) return null;

  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full justify-center backdrop-blur-lg">
      <div className="mx-5 flex w-[1920px] items-center justify-between py-4 md:mx-20">
        <Link href="/" className="text-3xl font-bold">
          Veeniu
        </Link>
        {!!session.data?.user ? (
          <Button onClick={() => router.push("/account")} size={"sm"}>
            {session.data?.user.name}
          </Button>
        ) : (
          <Button onClick={() => router.push("/auth/signin")} size={"sm"}>
            Sign in
          </Button>
        )}
      </div>
    </nav>
  );
};
