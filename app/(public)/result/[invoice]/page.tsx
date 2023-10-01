import Container from "@/Components/container/Container";
import { getOneConsultation } from "@/service/consultation/getOneConsultation";
import ResulData from "./components/ResulData";

export default async function page({
  params,
}: {
  params: { invoice: string };
}) {
  const invoiceData = await getOneConsultation(params.invoice);

  const dieses = invoiceData.results[0].dieses;

  return (
    <>
      <Container.Root>
        <Container.Content>
          <div className="flex items-end gap-3 border-b border-gray-200 pb-5">
            <p className="text-3xl font-light">Hasil Diagnosa</p>
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/consultations/${params.invoice}/download`}
              className="font-thin hover:underline"
            >
              unduh hasil analisa
            </a>
          </div>
          <div className="space-y-5">
            {dieses.map((diese) => {
              return (
                <ResulData
                  disease={diese}
                  key={diese.code}
                  solutions={diese.solutions}
                />
              );
            })}
          </div>
        </Container.Content>
      </Container.Root>
    </>
  );
}
