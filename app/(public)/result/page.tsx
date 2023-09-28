import Container from "@/components/container/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getOneConsultation } from "@/service/consultation/getOneConsultation";
import ResulData from "./components/ResulData";

export default async function page() {
  const invoiceData = await getOneConsultation();

  console.log(invoiceData);

  const dieses = invoiceData.results[0].dieses;

  return (
    <>
      <Container.Root>
        <Container.Content>
          <p className="border-b border-gray-200 pb-5 text-3xl font-light">
            Hasil Diagnosa
          </p>
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
