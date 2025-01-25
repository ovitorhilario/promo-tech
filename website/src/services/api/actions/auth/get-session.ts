import { request } from "~/utils/request";
import { Session } from "~/types/actions/session";

export async function getSession() {
  const response = await request<Session>({
    url: "/auth/session",
    method: "GET",
  })
  return response.data;
}