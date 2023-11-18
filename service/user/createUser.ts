import CreateUserSchema from "@/app/dashboard/user/components/schema/CreateUserSchema";
import { z } from "zod";

interface Props {
  token: string;
  user: z.infer<typeof CreateUserSchema>;
}
export default async function createUser({ token, user }: Props) {
  const url = process.env.NEXT_PUBLIC_API_URL + `/api/v1/users`;

  const res: Response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json") == false) {
    throw new Error("Invalid content type");
  }
  return res.json() as Promise<{
    status: string;
  }>;
}
