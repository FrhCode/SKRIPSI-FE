import { fetcher } from "../fetcher";
import InvoiceData from "@/types/Consultation";

export async function getOneConsultation(
  invoiceNumber: string = "INV-20230918-1"
): Promise<InvoiceData> {
  return fetcher<InvoiceData>(`/api/v1/consultations/${invoiceNumber}`);
}
