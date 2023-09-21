import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDieseSymptoms } from "@/service/diese/getDieseSymptoms";
import { paginateDiese } from "@/service/diese/paginateDiese";
import { Session, getServerSession } from "next-auth";
import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";

export default async function Page() {
  const { jwtToken } = (await getServerSession(authOptions)) as Session;

  const page = await paginateDiese({ token: jwtToken, size: 50 });

  const { content } = page;

  const diesePromises = content.map(async (diese) => {
    const { data: symptoms } = await getDieseSymptoms(jwtToken, diese.code);
    return { ...diese, symptoms };
  });

  const dieses = await Promise.all(diesePromises);

  return (
    <div className="space-y-4">
      {dieses.map(({ id }) => {
        return <p key={id}>HI</p>;
      })}
      <pre>{JSON.stringify(dieses, null, 2)}</pre>
    </div>
  );
}
