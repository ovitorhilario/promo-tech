import { request } from "~/utils/request";

export async function deleteStore(id: string) {
  await request({
    url: `/store/delete/${id}`,
    method: 'DELETE',
  });
}