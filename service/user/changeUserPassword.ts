import ChangePasswordSchema from "@/app/dashboard/user/components/schema/ChagePasswordSchema";
import { z } from "zod";

interface Props {
  user: z.infer<typeof ChangePasswordSchema> & { id: number };
  token: string;
}

export default async function changeUserPassword({
  user: { password, id },
  token,
}: Props) {
  const url = process.env.NEXT_PUBLIC_API_URL + `/api/v1/users/${id}/password`;

  const res: Response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ password } as z.infer<typeof ChangePasswordSchema>),
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
