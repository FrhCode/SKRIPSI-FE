import Symptom from "@/types/Symptom";
import { fetcher } from "../fetcher";

export async function getDieseSymptoms(token: string, dieseCode: string) {
  const url = `/api/v1/dieses/${dieseCode}/symptoms`;

  return fetcher<{ content: Symptom[] }>(url, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
