import { request } from "~/utils/request";

export async function deletePromotion(id: string) {
  await request({
    url: `/promotion/delete/${id}`,
    method: 'DELETE'
  });
}