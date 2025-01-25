import { Promotion } from "~/types/actions/promotion";
import { request } from "~/utils/request";

export interface UpdatePromotionPayload {
  title: string;
  description: string;
  price: number;
  img_url: string;
  link_url: string;
  category_id: string;
  store_id: string;
}

export interface UpdatePromotionProps {
  id: string;
  payload: UpdatePromotionPayload;
}

export async function updatePromotion({
  id,
  payload,
}: UpdatePromotionProps) {
  const response = await request<Promotion>({
    url: `/promotion/update/${id}`,
    method: 'PUT',
    data: payload,
  });
  return response.data;
}