import SortDirection from "./SortDirection";

export interface PaginateSearchParams<T extends string> {
  token: string;
  size: number;
  sortBy?: T;
  sortDirection?: SortDirection;
}
