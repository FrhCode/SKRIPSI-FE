import { headers } from "next/headers";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineDashboard, AiOutlineInbox } from "react-icons/ai";
import { BiCubeAlt, BiDetail } from "react-icons/bi";
import { BsWindowDock } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LogOutComponent from "@/components/shared/LogOutComponent";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { pageinateConsultation } from "@/service/consultation/pageinateConsultation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default async function Page() {
  const data = (await getServerSession(authOptions)) as Session;
  const headersList = headers();
  const path = headersList.get("x-url") || "";
  const { pathname } = new URL(path);

  const consultationPaginate = await pageinateConsultation({
    token: data.jwtToken,
    size: 10,
  });

  const menus: Array<{
    id: string;
    content: string | JSX.Element;
    pathname: string;
    icon: JSX.Element;
  }> = [
    {
      id: "Dashboard",
      content: "Dashboard",
      pathname: "/dashboard",
      icon: <AiOutlineDashboard />,
    },
    {
      id: "Penyakit",
      content: "Penyakit",
      pathname: "/a",
      icon: <AiOutlineInbox />,
    },
    {
      id: "Gejala",
      content: "Gejala",
      pathname: "/a",
      icon: <BsWindowDock />,
    },
    {
      id: "Basis Pengetahuan",
      content: "Basis Pengetahuan",
      pathname: "/a",
      icon: <BiCubeAlt />,
    },
    {
      id: "Hasil Konsultasi",
      content: "Hasil Konsultasi",
      pathname: "/a",
      icon: <BiDetail />,
    },
    {
      id: "Hasil Konsultasi",
      content: <LogOutComponent>Logout</LogOutComponent>,
      pathname: "/a",
      icon: <CgLogOut />,
    },
  ];

  return (
    <div className="flex h-screen">
      <div className="hidden w-60 flex-shrink-0 p-4 shadow lg:block">
        <div className="flex h-14 items-center text-2xl font-black text-blue-600">
          Dokter Lele
        </div>
      </div>
      <div className="max-h-[100dvh] flex-grow overflow-auto p-4 pb-20">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 content-start gap-4">
          <Card className="rounded">
            <CardContent className="flex h-14 items-center py-0">
              <Sheet>
                <SheetTrigger className="lg:hidden">
                  <div>
                    <GiHamburgerMenu color="var(--blue-600)" size={23} />
                  </div>
                </SheetTrigger>
                <SheetContent side={"left"}>
                  <div className="mb-5"></div>
                  <ul className="space-y-5">
                    {menus.map(
                      ({ content, icon, id, pathname: menuPathName }) => {
                        return (
                          <li
                            key={id}
                            className={cn(
                              clsx("flex items-center gap-2", {
                                "text-blue-600": menuPathName === pathname,
                              })
                            )}
                          >
                            {icon}
                            {content}
                          </li>
                        );
                      }
                    )}
                  </ul>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>

          <Card className="rounded">
            <CardHeader>
              <CardTitle>
                Selamat datang <span className="text-blue-600">admin</span>
              </CardTitle>
              <CardDescription>
                Aplikasi diagnosa penyakit ikan lele
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <p>
                Sistem pakar secara otomatis mendiagnosa penyakit yang diderita
                oleh ikan berdasarkan basis pengetahuan dari pakar.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="rounded">
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

            <Card className="rounded">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-sm font-medium">
                  <span>Jumlah Gejala</span>
                  <AiOutlineInbox color="var(--blue-600)" />
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <span className="text-2xl font-bold">11</span>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-sm font-medium">
                  <span>Total hasil diagnosa</span>
                  <AiOutlineInbox color="var(--blue-600)" />
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <span className="text-2xl font-bold">230</span>
              </CardContent>
            </Card>
          </div>
          <Card className="rounded">
            <CardHeader>
              <CardTitle className="font-semibold">
                <span>Hasil diagnosa terbaru</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Tanggal Konsultasi</TableHead>
                    <TableHead>Nama Pasien</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consultationPaginate.content.map((row) => {
                    const formattedDate = format(
                      new Date(row.invoiceDate),
                      "yyyy-MM-dd HH:mm:ss"
                    );

                    return (
                      <TableRow key={row.id}>
                        <TableCell className="font-medium">
                          {formattedDate}
                        </TableCell>
                        <TableCell>{row.patientName}</TableCell>
                        <TableCell className="text-right">
                          <Button variant={"dashboard"} size={"sm"}>
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
