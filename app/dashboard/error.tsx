"use client"; // Error components must be Client Components

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error(error);
    signOut();
  }, [error]);

  return null;
}
