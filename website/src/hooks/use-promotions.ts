import { useQuery } from "@tanstack/react-query";
import { getAllPromotions } from "~/services/api/actions/promotion/get-all";

export function usePromotions() {
  return useQuery({
    queryKey: ["promotions"],
    queryFn: getAllPromotions
  });
}