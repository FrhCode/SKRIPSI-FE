import Symptom from "@/types/Symptom";

interface Props {
  symptom: Omit<Symptom, "id">;
  token: string;
}
export default async function editSymptom({
  token,
  symptom: { code, dsValue, name },
}: Props) {
  const url = process.env.NEXT_PUBLIC_API_URL + `/api/v1/symptoms/${code}`;

  const res: Response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ name, dsValue } as Omit<Symptom, "code">),
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
