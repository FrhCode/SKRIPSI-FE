interface Props {
  symptomsCode: string[];
  dieseCode: string;
  token: string;
}
export default async function addSymptoms({
  dieseCode,
  symptomsCode,
  token,
}: Props) {
  const url =
    process.env.NEXT_PUBLIC_API_URL + `/api/v1/dieses/${dieseCode}/symptoms`;

  const res: Response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ symptomsCode }),
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
