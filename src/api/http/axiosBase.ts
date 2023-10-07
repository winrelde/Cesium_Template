import requestURL from "./serverUrl";
import instance from "./instance";
import { AxiosRequest, CustomResponse, Method } from "./types";

class Abstract {
  protected baseURL: string = requestURL;

  private apiAxios({
    baseURL = this.baseURL,
    headers = {},
    method,
    url,
    data,
    params,
    responseType,
    onUploadProgress,
    onDownloadProgress,
  }: AxiosRequest): Promise<any> {
    // headers = Object.assign(headers, {
    //   "token":
    //     localStorage.getItem("token") || ("" as string),
    // });
    return new Promise((resolve, reject) => {
      const config: AxiosRequest = {
        baseURL,
        headers,
        method,
        url,
        params,
        data,
        responseType,
        onUploadProgress,
        onDownloadProgress,
      };
      instance(config)
        .then((res: CustomResponse) => {
          const {
            data: { code, data: dataset, msg },
          } = res;
          if (+code === 20002 && !/logout/.test(config.url)) {
            ElMessage.error("用户信息已过期，请重新登录");
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }
          if (+code === 200) {
            resolve(dataset);
          } else {
            resolve(data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private baseReq(method: Method, opt: AxiosRequest) {
    return this.apiAxios({ method, ...opt });
  }

  /**
   * get请求
   * @returns {Promise<any>}
   * @param opt
   */
  protected get(opt: AxiosRequest) {
    return this.baseReq("GET", opt);
  }

  /**
   * post请求
   * @returns {Promise<any>}
   * @param opt
   */
  protected post(opt: AxiosRequest) {
    return this.baseReq("POST", opt);
  }

  /**
   * put请求
   * @returns {Promise<any>}
   * @param opt
   */
  protected put(opt: AxiosRequest) {
    return this.baseReq("PUT", opt);
  }

  /**
   * delete请求
   * @returns {Promise<any>}
   * @param opt
   */
  protected delete(opt: AxiosRequest) {
    return this.baseReq("DELETE", opt);
  }
}

export default Abstract;
