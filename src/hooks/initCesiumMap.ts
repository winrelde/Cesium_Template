import CesiumMap from "@/cesium";

let viewer: CesiumMap | null = null;

const initCesiumMap = () => {
  const init = (el: string | HTMLElement) => {
    viewer = new CesiumMap(el);
  };

  const getCesiumMap = () => viewer;

  return {
    init,
    getCesiumMap,
  };
};

export default initCesiumMap;
