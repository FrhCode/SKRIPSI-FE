interface Props {
  token: string;
  dieseCode: string;
}
export default async function deleteDiese({ token, dieseCode }: Props) {
  const url = process.env.NEXT_PUBLIC_API_URL + `/api/v1/dieses/${dieseCode}`;

  const res: Response = await fetch(url, {
    method: "DELETE",
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
