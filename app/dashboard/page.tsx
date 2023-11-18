import { AiOutlineInbox } from "react-icons/ai";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "next-auth";
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
import InvalidSessionException from "@/exception/InvalidSessionException";
import { getDieseCount } from "@/service/diese/getDieseCount";
import { getSymptomCount } from "@/service/symptom/getSymptomCount";
import { getConsultationCount } from "@/service/consultation/getConsultationCount";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new InvalidSessionException();
  }
  const { jwtToken } = session;



  const consultationPaginate = await paginateConsultation({
    token: jwtToken,
    size: 10,
  });

  const { diese_count } = await getDieseCount(jwtToken);
  const { symptom_count } = await getSymptomCount(jwtToken);
  const { consultation_count } = await getConsultationCount(jwtToken);

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
            <span className="text-2xl font-bold">{diese_count}</span>
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
            <span className="text-2xl font-bold">{symptom_count}</span>
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
            <span className="text-2xl font-bold">{consultation_count}</span>
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
                      <Button variant={"dashboard"} size={"sm"} asChild>
                        <a
                          href={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/consultations/${row.invoice}/download`}
                          target="_blank"
                        >
                          Download
                        </a>
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
