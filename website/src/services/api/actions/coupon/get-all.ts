import { Coupon } from "~/types/actions/coupon";
import { request } from "~/utils/request";

export async function getAllCoupons() {
  const response = await request<Coupon[]>({
    url: "/coupon/list-all",
    method: "GET"
  });
  return response.data;
}