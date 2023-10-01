import { fetcher } from "../fetcher";
import User from "@/types/User";

export async function gelAllUser(token: string) {
  return fetcher<{ content: User[] }>(`/api/v1/users/all`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
