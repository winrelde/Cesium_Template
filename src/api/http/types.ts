import { AxiosResponse } from "axios";

export type Method = "GET" | "POST" | "PUT" | "DELETE";
export type ResponseType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "stream";

export interface AxiosRequest {
  baseURL?: string;
  url: string;
  data?: any;
  params?: any;
  method?: Method;
  headers?: any;
  timeout?: number;
  responseType?: ResponseType;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
}

export interface CustomResponse extends AxiosResponse {
  code?: string | number;
  message?: string;
  data: {
    code: number | string;
    data: any;
    msg: any;
  };
}
