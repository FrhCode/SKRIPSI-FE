import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Disease, Solution } from "@/types/Consultation";
import React from "react";

interface Props {
  disease: Disease;
  solutions: Solution[];
}

export default function ResulData({ disease, solutions }: Props) {
  return (
    <div className="space-y-3">
      <div className="space-y-1 border-b border-gray-200 py-5 last:pb-0 last-of-type:border-none">
        <p className="text-lg">{disease.name}</p>
        <p className="font-light">{disease.description}</p>
      </div>
      <div className="space-y-1 border-b border-gray-200 py-5 last:pb-0 last-of-type:border-none">
        <p>Solusi</p>
        <Accordion type="multiple">
          {solutions.map(({ description, name }, index) => (
            <AccordionItem value={name} key={index}>
              <AccordionTrigger>{name}</AccordionTrigger>
              <AccordionContent>{description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
