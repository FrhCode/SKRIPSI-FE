import Symptom from "@/types/Symptom";
import { fetcher } from "../fetcher";

export async function getAllSymptoms(): Promise<Symptom[]> {
  return fetcher<Symptom[]>("/api/v1/symptoms/all");
}
