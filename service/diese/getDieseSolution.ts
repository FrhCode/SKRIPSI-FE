import { fetcher } from "../fetcher";
import { Solution } from "@/types/Consultation";

export async function getDieseSolutions(token: string, dieseCode: string) {
  return fetcher<{ data: Array<Solution & { id: string }> }>(
    `/api/v1/dieses/${dieseCode}/solutions`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
