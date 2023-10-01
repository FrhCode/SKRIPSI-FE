"use client"; // Error components must be Client Components

import InvalidSessionException from "@/exception/InvalidSessionException";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Error({ error }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    if (error instanceof InvalidSessionException) {
      signOut({ callbackUrl: "/signin", redirect: true });
    }
  }, [error]);

  return null;
}
