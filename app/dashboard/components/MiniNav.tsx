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

export default function MiniNav({ menus }: Props) {
  const pathName = usePathname();

  return (
    <>
      {menus.map(({ content, icon, id, pathname: menuPathName }) => {
        return (
          <Link href={menuPathName} key={id} className="block">
            <li
              className={cn(
                "flex items-center gap-2",
                clsx({
                  "text-blue-600": menuPathName === pathName,
                })
              )}
            >
              {icon}
              {content}
            </li>
          </Link>
        );
      })}
    </>
  );
}
