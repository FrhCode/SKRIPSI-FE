import { AiOutlineInbox } from "react-icons/ai";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
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
import { paginateConsultation } from "@/service/consultation/paginateConsultation";

export default async function Page() {
  const { jwtToken, expires, user } = (await getServerSession(
    authOptions
  )) as Session;

  // console.log("expires: " + expires);
  // console.log(user);

  const consultationPaginate = await paginateConsultation({
    token: jwtToken,
    size: 10,
  });

  return (
    <>
      <Card className="rounded shadow-sm">
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
            Sistem pakar secara otomatis mendiagnosa penyakit yang diderita oleh
            ikan berdasarkan basis pengetahuan dari pakar.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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

        <Card className="rounded shadow-sm">
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

        <Card className="rounded shadow-sm">
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
      <Card className="rounded shadow-sm">
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
    </>
  );
}
