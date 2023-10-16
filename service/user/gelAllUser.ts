import { fetcher } from "../fetcher";
import User from "@/types/User";

export async function gelAllUser(token: string) {
  const url = `/api/v1/users/all`;
  return fetcher<{ content: User[] }>(url, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
