import { AxiosRequestConfig } from "axios";
import axiosInstance, { getAuthorizationHeader } from "~/services/api/axios";

interface RequestProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  config?: AxiosRequestConfig;
}

export function request<T = any>({
  url,
  method,
  config,
  data
}: RequestProps) {
  return axiosInstance.request<T>({
    headers: {
      Authorization: getAuthorizationHeader()
    },
    url: url,
    method: method,
    data: data,
    ...config
  });
}
