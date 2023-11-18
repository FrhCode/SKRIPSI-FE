"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Error({ error }: { error: Error; reset: () => void }) {
  useEffect(() => {
    signOut({ callbackUrl: "/signin", redirect: true });
  }, [error]);

  return null;
}
