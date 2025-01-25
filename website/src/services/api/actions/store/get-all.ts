import { Store } from "~/types/actions/store";
import { request } from "~/utils/request";

export async function getAllStores() {
  const response = await request<Store[]>({
    url: "/store/list-all",
    method: "GET"
  })
  return response.data;
}