import Container from "@/components/container/Container";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getOneConsultation } from "@/service/consultation/getOneConsultation";

export default async function page() {
  const invoiceData = await getOneConsultation();

  const dieses = invoiceData.dieses[0];
  const solutions = dieses.solutions;
  console.log(invoiceData);

  return (
    <>
      <Header />
      <Container.Root>
        <Container.Content>
          <p className="border-b border-gray-200 pb-5 text-3xl font-light">
            Hasil Diagnosa
          </p>
          <div className="space-y-3">
            <div className="space-y-1 border-b border-gray-200 py-5 last:pb-0 last-of-type:border-none">
              <p>{dieses.name}</p>
              <p className="text-gray-400">{dieses.description}</p>
            </div>
            <div className="space-y-1 border-b border-gray-200 py-5 last:pb-0 last-of-type:border-none">
              <p>Solusi</p>
              <Accordion type="single" collapsible>
                {solutions.map(({ description, name }, index) => (
                  <AccordionItem value={name} key={index}>
                    <AccordionTrigger>{name}</AccordionTrigger>
                    <AccordionContent>{description}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Container.Content>
      </Container.Root>
      <div className="h-40 lg:h-48"></div>
      <Footer />
    </>
  );
}
