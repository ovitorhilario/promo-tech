import { request } from "~/utils/request";

export interface LoginPayload {
  username: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  const response = await request<{ token: string }>({
    url: "/auth/login",
    method: "POST",
    data: payload
  })
  return response.data;
}