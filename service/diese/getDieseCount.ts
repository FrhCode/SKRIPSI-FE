import { fetcher } from "../fetcher";

export async function getDieseCount(token: string) {
  const url = `/api/v1/dieses/count`;

  return fetcher<{ diese_count: number }>(url, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
