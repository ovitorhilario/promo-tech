import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "~/services/api/actions/category/get-all";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: Infinity
  });
}