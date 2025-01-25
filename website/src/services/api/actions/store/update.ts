import { Store } from "~/types/actions/store";
import { request } from "~/utils/request";

export interface UpdateStorePayload {
  name: string;
  description: string;
  img_url: string;
  link_url: string;
  tag: string;
}

export interface UpdateStoreProps {
  payload: UpdateStorePayload;
  id: string;
}

export async function updateStore({ payload, id }: UpdateStoreProps) {
  const response = await request<Store>({
    url: `/store/update/${id}`,
    method: 'PUT',
    data: payload,
  });
  return response.data;
}