import Abstract from "../http/axiosBase";
import requestURL from "../http/serverUrl";

class TestApi extends Abstract {
  getTestData(params: any) {
    return this.get({
      baseURL: requestURL.baseUrl,
      url: "v7/weather/3d?location=119.514,27.444&key=589d699389904131a904dab25872c6a9",
      params,
    });
  }
}

let instance;
export default (() => {
  if (instance) return instance;
  instance = new TestApi();
  return instance;
})();
