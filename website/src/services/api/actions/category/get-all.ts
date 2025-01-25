import { Category } from "~/types/actions/category";
import { request } from "~/utils/request";

export async function getAllCategories() {
  const response = await request<Category[]>({
    url: "/category/list-all",
    method: "GET"
  })
  return response.data;
}