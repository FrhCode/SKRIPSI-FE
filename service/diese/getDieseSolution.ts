import { fetcher } from "../fetcher";
import { Solution } from "@/types/Consultation";

export async function getDieseSolutions(token: string, dieseCode: string) {
  const url = `/api/v1/dieses/${dieseCode}/solutions`;

  return fetcher<{ content: Array<Solution & { id: string }> }>(url, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
