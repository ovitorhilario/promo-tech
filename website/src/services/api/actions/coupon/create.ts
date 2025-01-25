import { Coupon } from "~/types/actions/coupon";
import { request } from "~/utils/request";

export interface CreateCouponPayload {
  title: string;
  description: string;
  code: string;
  link_url: string;
  store_id: string;
}

export async function createCoupon(payload: CreateCouponPayload) {
  const response = await request<Coupon>({
    url: "/coupon/create",
    method: "POST",
    data: payload
  });
  return response.data;
}