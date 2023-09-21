import Symptom from "@/types/Symptom";
import { fetcher } from "../fetcher";

export async function getDieseSymptoms(token: string, dieseCode: string) {
  return fetcher<{ data: Symptom[] }>(`/api/v1/dieses/${dieseCode}/symptoms`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
