import Page from "@/types/Page";
import { fetcher } from "../fetcher";
import Consultation from "@/types/Consultation";
import SortDirection from "@/types/SortDirection";

interface Props {
  token: string;
  size: number;
  sortBy?: keyof Omit<Consultation, "id" | "invoice" | "dieses" | "symptoms">;
  sortDirection?: SortDirection;
}

export async function pageinateConsultation({
  token,
  size,
  sortBy = "invoiceDate",
  sortDirection = "ASC",
}: Props) {
  const params = new URLSearchParams({
    size: `${size}`,
    sortBy,
    sortDirection,
  });

  return fetcher<Page<Consultation>>(
    `/api/v1/consultations?${params.toString()}`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
