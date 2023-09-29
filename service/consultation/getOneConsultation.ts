import { fetcher } from "../fetcher";
import Consultations from "@/types/Consultation";

export async function getOneConsultation(
  invoiceNumber: string
): Promise<Consultations> {
  return fetcher<Consultations>(`/api/v1/consultations/${invoiceNumber}`);
}
