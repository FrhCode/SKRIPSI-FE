import Diese from "@/types/Diese";
import Symptom from "@/types/Symptom";

interface Props {
  diese: Omit<Diese, "id">;
  token: string;
}
export default async function editDiese({
  token,
  diese: { code, description, name },
}: Props) {
  const url = process.env.NEXT_PUBLIC_API_URL + `/api/v1/dieses/${code}`;

  const res: Response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ name, description } as Omit<Diese, "code">),
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
