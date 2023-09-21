"use client";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import React from "react";

interface Props {
  id: string;
}

export default function Temp({ id }: Props) {
  return (
    <DialogFooter data-dialog-id={id} className="hidden">
      <DialogClose asChild>
        <Button
          onClick={() => {
            console.log("HI");
          }}
        >
          Save changes
        </Button>
      </DialogClose>
    </DialogFooter>
  );
}
