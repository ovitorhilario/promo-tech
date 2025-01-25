import { Store } from "~/types/actions/store";
import { request } from "~/utils/request";

export interface CreateStorePayload {
  name: string;
  description: string;
  img_url: string;
  link_url: string;
  tag: string;
}

export async function createStore(payload: CreateStorePayload) {
  const response = await request<Store>({
    url: "/store/create",
    method: "POST",
    data: payload
  });
  return response.data;
}