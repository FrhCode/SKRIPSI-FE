import Symptom from "@/types/Symptom";
import { fetcher } from "../fetcher";
import Consultation from "@/types/Consultation";

export async function getAllConsultation() {
  return fetcher<{ content: Consultation[] }>("/api/v1/consultations/all");
}
