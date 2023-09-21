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
import DialogAddSymptom from "./components/DialogAddSymptom";

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
      {dieses.map(({ id, description, name, symptoms, code }) => {
        return (
          <Card className="rounded shadow-sm" key={id}>
            <CardHeader>
              <CardTitle className=" flex items-center justify-between text-2xl font-medium">
                <span>{name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BsInfoCircleFill color="var(--blue-600)" />{" "}
                  <p className="font-semibold">info</p>
                </div>
                <p>{description}</p>
              </div>

              <Table>
                <TableCaption>
                  <DialogAddSymptom symptomName={name} dieseCode={code} />
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead className="text-right">
                      Nilai Keyakinan
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {symptoms.map(({ code, dsValue, id, name }) => {
                    return (
                      <TableRow key={id}>
                        <TableCell className="font-medium">{code}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell className="text-right">{dsValue}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
