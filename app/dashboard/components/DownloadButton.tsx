"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React, { MouseEvent } from "react";

interface Props {
  url: String;
}

export default function DownloadButton() {
  const { data } = useSession();

  const download = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const fileName = "example.txt"; // Replace with the actual file name
    const url = `http://localhost:8080/download/${fileName}`; // Replace with your backend URL

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((error) => console.error("Error downloading file:", error));
  };

  return (
    <Button variant={"dashboard"} size={"sm"} onClick={download}>
      Download
    </Button>
  );
}
