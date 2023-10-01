import React from "react";
import { DataTable } from "./components/DataTable";
import { columns } from "./components/Column";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllConsultation } from "@/service/consultation/getAllConsultation";

export default async function Page() {
  const { content: consultations } = await getAllConsultation();

  return (
    <Card className="rounded shadow-sm">
      <CardHeader>
        {/* <CardTitle className=" flex items-center justify-between text-2xl font-medium">
          <span>TES</span>
        </CardTitle> */}
      </CardHeader>
      <CardContent className="space-y-4">
        <DataTable columns={columns} data={consultations} />
      </CardContent>
    </Card>
  );
}
