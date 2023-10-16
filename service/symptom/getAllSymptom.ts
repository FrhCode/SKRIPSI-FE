import Symptom from "@/types/Symptom";
import { fetcher } from "../fetcher";

export async function getAllSymptoms() {
  const url = "/api/v1/symptoms/all";
  return fetcher<{ content: Symptom[] }>(url);
}
