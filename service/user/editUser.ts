import UpdateUserSchema from "@/app/dashboard/user/components/schema/UpdateUserSchema";
import { z } from "zod";

interface Props {
  user: z.infer<typeof UpdateUserSchema> & { id: number };
  token: string;
}

export default async function editUser({
  user: { name, phoneNumber, id },
  token,
}: Props) {
  const url = process.env.NEXT_PUBLIC_API_URL + `/api/v1/users/${id}`;

  const res: Response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ name, phoneNumber } as z.infer<
      typeof UpdateUserSchema
    >),
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
