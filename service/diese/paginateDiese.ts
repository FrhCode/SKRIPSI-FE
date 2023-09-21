import Page from "@/types/Page";
import { fetcher } from "../fetcher";
import { PaginateSearchParams } from "@/types/PaginateSearchParams";
import Disease from "@/types/Diese";

interface Props
  extends PaginateSearchParams<keyof Omit<Disease, "description">> {}

export async function paginateDiese({
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

  return fetcher<Page<Disease>>(`/api/v1/dieses?${params.toString()}`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
