import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { AiOutlineInbox } from "react-icons/ai";

export default function page() {
  return (
    <>
      <Card className="rounded shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-sm font-medium">
            <span>Jumlah Penyakit</span>
            <AiOutlineInbox color="var(--blue-600)" />
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <span className="text-2xl font-bold">30</span>
        </CardContent>
      </Card>
    </>
  );
}
