"use client";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface Props {
  menus: Array<{
    id: string;
    content: string | JSX.Element;
    pathname: string;
    icon: JSX.Element;
  }>;
}

export default function Menu({ menus }: Props) {
  const pathName = usePathname();
  return (
    <>
      {menus.map(({ content, icon, id, pathname: menuPathName }) => {
        const isActive = pathName === menuPathName;
        return (
          <Link key={id} href={menuPathName}>
            <li className="px-4">
              <span
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded p-2 transition hover:bg-blue-600 hover:text-white",
                  clsx({ "bg-blue-600": isActive, " text-white": isActive })
                )}
              >
                {icon}
                {content}
              </span>
            </li>
          </Link>
        );
      })}
    </>
  );
}
