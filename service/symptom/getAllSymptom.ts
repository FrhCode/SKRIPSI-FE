import Symptom from "@/types/Symptom";
import { fetcher } from "../fetcher";

export async function getAllSymptoms() {
  return fetcher<{ content: Symptom[] }>("/api/v1/symptoms/all");
}
