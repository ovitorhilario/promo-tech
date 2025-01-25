import { useQuery } from "@tanstack/react-query";
import { getAllCoupons } from "~/services/api/actions/coupon/get-all";

export function useCoupons() {
  return useQuery({
    queryKey: ["coupons"],
    queryFn: getAllCoupons
  });
}