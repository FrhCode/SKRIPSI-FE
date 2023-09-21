import Page from "@/types/Page";
import { fetcher } from "../fetcher";
import { PaginateSearchParams } from "@/types/PaginateSearchParams";
import Symptom from "@/types/Symptom";

interface Props
  extends PaginateSearchParams<keyof Omit<Symptom, "id" | "dsValue">> {}
export async function paginateSymtom({
  token,
  size,
  sortBy = "code",
  sortDirection = "DESC",
}: Props) {
  const params = new URLSearchParams({
    size: `${size}`,
    sortBy,
    sortDirection,
  });

  return fetcher<Page<Symptom>>(`/api/v1/symptoms?${params.toString()}`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
