import { fetcher } from "../fetcher";
import Consultations from "@/types/Consultation";

export async function getOneConsultation(
  invoiceNumber: string = "INV-20230517-1"
): Promise<Consultations> {
  return fetcher<Consultations>(`/api/v1/consultations/${invoiceNumber}`);
}
