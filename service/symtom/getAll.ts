import Symptom from "@/types/Symptom";

export async function getAllSymptoms(): Promise<Symptom[]> {
  const res: Response = await fetch(
    process.env.API_URL + "/api/v1/symptoms/all",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json") == false) {
    throw new Error("Invalid content type");
  }
  return res.json() as Promise<Symptom[]>;
}
