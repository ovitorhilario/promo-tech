import { Promotion } from "~/types/actions/promotion";
import { request } from "~/utils/request";

export interface CreatePromotionPayload {
  title: string;
  description: string;
  price: number;
  img_url: string;
  link_url: string;
  category_id: string;
  store_id: string;
}

export async function createPromotion(payload: CreatePromotionPayload) {
  const response = await request<Promotion>({
    url: "/promotion/create",
    method: "POST",
    data: payload
  });
  return response.data;
}