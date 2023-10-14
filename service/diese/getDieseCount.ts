import { fetcher } from "../fetcher";
import { Solution } from "@/types/Consultation";

export async function getDieseCount(token: string) {
  return fetcher<{ diese_count: number }>(`/api/v1/dieses/count`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
