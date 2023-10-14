import { fetcher } from "../fetcher";
import { Solution } from "@/types/Consultation";

export async function getConsultationCount(token: string) {
  return fetcher<{ consultation_count: number }>(
    `/api/v1/consultations/count`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
