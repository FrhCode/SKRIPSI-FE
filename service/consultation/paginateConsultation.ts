import Page from "@/types/Page";
import { fetcher } from "../fetcher";
import Consultation from "@/types/Consultation";
import { PaginateSearchParams } from "@/types/PaginateSearchParams";

interface Props
  extends PaginateSearchParams<
    keyof Omit<Consultation, "id" | "invoice" | "dieses" | "symptoms">
  > {}

export async function paginateConsultation({
  token,
  size,
  sortBy = "invoiceDate",
  sortDirection = "DESC",
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
