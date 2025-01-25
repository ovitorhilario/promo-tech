import { Promotion } from "~/types/actions/promotion";
import { request } from "~/utils/request";

export async function getAllPromotions() {
  const response = await request<Promotion[]>({
    url: "/promotion/list-all",
    method: "GET"
  })
  return response.data;
}