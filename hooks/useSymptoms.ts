import { paginateSymtom } from "@/service/symptom/paginateSymptom";
import { useQuery } from "@tanstack/react-query";

export default function useSymptoms(token: string) {
  return useQuery<
    Awaited<ReturnType<typeof paginateSymtom>>,
    { message: string }
  >({
    queryKey: ["symptoms"],
    queryFn: () => paginateSymtom({ token, size: 10 }),
  });
}
