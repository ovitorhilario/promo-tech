import { request } from "~/utils/request";

export async function deleteCoupon(id: string) {
  await request({
    url: `/coupon/delete/${id}`,
    method: 'DELETE'
  });
}