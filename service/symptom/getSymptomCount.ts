import { fetcher } from "../fetcher";
import { Solution } from "@/types/Consultation";

export async function getSymptomCount(token: string) {
  return fetcher<{ symptom_count: number }>(`/api/v1/symptoms/count`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
