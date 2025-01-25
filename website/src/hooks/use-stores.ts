import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "~/services/api/actions/store/get-all";

export function useStores() {
  return useQuery({
    queryKey: ["stores"],
    queryFn: getAllStores,
  });
}