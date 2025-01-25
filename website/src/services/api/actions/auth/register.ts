import { request } from "~/utils/request";

export interface RegisterPayload {
  username: string;
  password: string;
  full_name: string;
  email: string;
}

export async function register(payload: RegisterPayload) {
   await request({
      url: "/auth/register",
      method: "POST",
      data: payload
    });
}