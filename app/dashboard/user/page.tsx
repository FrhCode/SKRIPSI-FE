import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import InvalidSessionException from "@/exception/InvalidSessionException";
import { gelAllUser } from "@/service/user/gelAllUser";
import { getServerSession } from "next-auth";
import React from "react";
import { DataTable } from "./components/DataTable";
import { columns } from "./components/Column";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new InvalidSessionException();
  }
  const { jwtToken } = session;
  const { content: users } = await gelAllUser(jwtToken);

  return (
    <Card className="rounded shadow-sm">
      <CardHeader>
        {/* <CardTitle className=" flex items-center justify-between text-2xl font-medium">
			<span>TES</span>
		</CardTitle> */}
      </CardHeader>
      <CardContent className="space-y-4">
        <DataTable columns={columns} data={users} />
      </CardContent>
    </Card>
  );
}
