import Link from "next/link";
import React from "react";

export const TextLink = ({ link }: { link: string }) => {
  return (
    <Link
      href={link}
      className="hover:text-primary active:text-primary text-xs underline transition-all duration-200 md:text-sm"
    >
      See all
    </Link>
  );
};
