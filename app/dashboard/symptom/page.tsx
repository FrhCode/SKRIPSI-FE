import { getAllSymptoms } from "@/service/symptom/getAllSymptom";
import React from "react";
import { DataTable } from "./components/DataTable";
import { columns } from "./components/Column";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";

export default async function Page() {
  const { content: symptoms } = await getAllSymptoms();
  return (
    <Card className="rounded shadow-sm">
      <CardHeader>
        {/* <CardTitle className=" flex items-center justify-between text-2xl font-medium">
          <span>TES</span>
        </CardTitle> */}
      </CardHeader>
      <CardContent className="space-y-4">
        <DataTable columns={columns} data={symptoms} />
      </CardContent>
    </Card>
  );
}
