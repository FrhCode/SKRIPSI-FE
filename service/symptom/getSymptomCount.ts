import { fetcher } from "../fetcher";

export async function getSymptomCount(token: string) {
  const url = `/api/v1/symptoms/count`;
  return fetcher<{ symptom_count: number }>(url, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
