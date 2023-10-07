import axios, { AxiosRequestConfig, Method } from "axios";

// 定义接口
interface PendingType {
  url?: string;
  method: Method;
  params?: any;
  data?: any;
  cancel?: (msg?: any) => void;
}

// 取消重复请求
const pending: PendingType[] = [];
const { CancelToken } = axios;
const instance = axios.create({
  timeout: 10000 * 6,
});

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  pending.forEach((item, index) => {
    if (
      item.url === config.url &&
      item.method === config.method &&
      JSON.stringify(item.params) === JSON.stringify(config.params) &&
      JSON.stringify(item.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      if (item.cancel) {
        item.cancel(`${config.url}--操作太频繁，请稍后再试`);
      }
      // 从数组中移除记录
      pending.splice(index, 1);
    }
  });
};

instance.interceptors.request.use(
  (request) => {
    // eslint-disable-next-line no-bitwise
    if (!~(request.url as string).search("signature")) removePending(request);
    request.cancelToken = new CancelToken((c) => {
      pending.push({
        url: request.url,
        method: request.method as Method,
        params: request.params,
        data: request.data,
        cancel: c,
      });
    });
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    removePending(response.config);
    return response;
  },
  (error) => {
    const { response } = error;
    // 超时重新请求
    const { config } = error;
    const [RETRY_COUNT, RETRY_DELAY] = [3, 1000];
    if (config && RETRY_COUNT) {
      // 设置用于跟踪重新计数的变量
      // eslint-disable-next-line no-underscore-dangle
      config.__retryCount = config.__retryCount || 0;
      // 检查是否已经把重试的总数用完
      // eslint-disable-next-line no-underscore-dangle
      if (config.__retryCount >= RETRY_COUNT) {
        return Promise.reject(response || { message: error.message });
      }
      // 增加重试计数
      // eslint-disable-next-line no-plusplus, no-underscore-dangle
      config.__retryCount++;
      // 创造新的Promise来处理指数后退
      const backoff = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, RETRY_DELAY || 1);
      });
      // instance重试请求的Promise
      return backoff.then(() => {
        return instance(config);
      });
    }
    return Promise.reject(response || { message: error.message });
  }
);

export default instance;
