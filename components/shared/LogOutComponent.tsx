"use client";
import { signOut } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function LogOutComponent({ children }: Props) {
  return <button onClick={() => signOut()}>{children}</button>;
}
