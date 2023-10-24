import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDieseSymptoms } from "@/service/diese/getDieseSymptoms";
import { paginateDiese } from "@/service/diese/paginateDiese";
import { getServerSession } from "next-auth";
import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import SymtomTable from "./components/TableSymtom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDieseSolutions } from "@/service/diese/getDieseSolution";
import SolutionTable from "./components/TableSolution";
import InvalidSessionException from "@/exception/InvalidSessionException";
import { paginateSymtom } from "@/service/symptom/paginateSymptom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new InvalidSessionException();
  }
  const { jwtToken } = session;
  const page = await paginateDiese({ token: jwtToken, size: 50 });

  const { content } = page;

  const diesePromises = content.map(async (diese) => {
    const { content: symptoms } = await getDieseSymptoms(jwtToken, diese.code);
    const { content: solutions } = await getDieseSolutions(
      jwtToken,
      diese.code
    );
    return { ...diese, symptoms, solutions };
  });

  const dieses = await Promise.all(diesePromises);

  const { content: symptoms } = await paginateSymtom({
    token: jwtToken,
    size: 50,
  });

  return (
    <>
      {dieses.map((diese) => {
        return (
          <Card className="rounded shadow-sm" key={diese.code}>
            <CardHeader>
              <CardTitle className=" flex items-center justify-between text-2xl font-medium">
                <span>{diese.name}</span>
                <div className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex justify-end">
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Hapus</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BsInfoCircleFill color="var(--blue-600)" />{" "}
                  <p className="font-semibold">info</p>
                </div>
                <p>{diese.description}</p>
              </div>

              <Tabs defaultValue="Gejala" className="">
                <TabsList className="grid w-full grid-cols-2 sm:w-48">
                  <TabsTrigger value="Gejala">Gejala</TabsTrigger>
                  <TabsTrigger value="Solusi">Solusi</TabsTrigger>
                </TabsList>
                <TabsContent value="Gejala">
                  <SymtomTable diese={diese} symptoms={symptoms} />
                </TabsContent>
                <TabsContent value="Solusi">
                  <SolutionTable diese={diese} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
