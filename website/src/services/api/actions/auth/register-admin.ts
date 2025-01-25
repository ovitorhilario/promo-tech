import { request } from "~/utils/request";

export interface RegisterAdminPayload {
  username: string;
  password: string;
  full_name: string;
  email: string;
}

export async function registerAdmin(payload: RegisterAdminPayload) {
  await request({
    url: "/auth/register/admin",
    method: "POST",
    data: payload
  });
}