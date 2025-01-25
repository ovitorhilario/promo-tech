import { Coupon } from "~/types/actions/coupon";
import { request } from "~/utils/request";

export interface UpdateCouponPayload {
  title: string;
  description: string;
  code: string;
  link_url: string;
  store_id: string;
  is_expired: boolean;
}

export interface UpdateCouponProps {
  payload: UpdateCouponPayload;
  id: string;
}

export async function updateCoupon({ 
  payload, 
  id 
}: UpdateCouponProps) {
  const response = await request<Coupon>({
    url: `/coupon/update/${id}`,
    method: 'PUT',
    data: payload,
  })
  return response.data;
}