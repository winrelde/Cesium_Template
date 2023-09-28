import {
  WebMapTileServiceImageryProvider,
  Viewer,
  MapMode2D,
  ScreenSpaceEventType,
  Ion,
  Cartesian3,
  Math as CesiumMath,
  Terrain,
  Cartographic,
  sampleTerrainMostDetailed,
} from "cesium";

export const CHINA_LOCATION = {
  lng: 120.3098572201599,
  lat: 30.69670557214347,
  height: 15000000,
  extent: [
    73.5023550000000796, 3.3971618700000352, 135.0956700000002684,
    53.5632689999999982,
  ],
};

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZTMyMDE3Ny05NWFiLTQ3MzYtYWI5Yy01NzU3MGY3MjI1YTMiLCJpZCI6MTY4NzkyLCJpYXQiOjE2OTU3OTQ3ODZ9.a0GWNfdTuknPa3k_g1zi2MWKzGb_KXfWwN0RRtu0LHA";

const createMapWorldImageLayer = (
  viewer: Viewer,
  type: "vec_w" | "cva_w" | "img_w" | "cia_w" | "ter_w"
) => {
  const subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];
  const obj = {
    style: "default", // WMTS请求的样式名称
    format: "tiles", // MIME类型，用于从服务器检索图像
    tileMatrixSetID: "w", //   用于WMTS请求的TileMatrixSet的标识符
    subdomains, // 天地图8个服务器
    minimumLevel: 0, // 最小层级
    maximumLevel: 18, // 最大层级
  };
  const TIAN_DI_TU_KEY = "c6995e2cd7a247587cb2c12a57e69e0c";
  const layer = new WebMapTileServiceImageryProvider({
    url: `https://t{s}.tianditu.gov.cn/${type}/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={TileMatrix}&layer=${
      type.split("_")[0]
    }&style={style}&tilerow={TileRow}&tilecol={TileCol}&tilematrixset={TileMatrixSet}&format=tiles&tk=${TIAN_DI_TU_KEY}`,
    layer: type.split("_")[0],
    ...obj,
  });
  return layer;
};

const setMapWorldImageLayer = (viewer: Viewer) => {
  const layerBase = createMapWorldImageLayer(viewer, "img_w");
  const ciaW = createMapWorldImageLayer(viewer, "cia_w");
  const baseLayer = viewer.imageryLayers.addImageryProvider(layerBase);
  const ciaWLayer = viewer.imageryLayers.addImageryProvider(ciaW);

  return () => {
    viewer.imageryLayers.remove(baseLayer, true);
    viewer.imageryLayers.remove(ciaWLayer, true);
  };
};

const setView = (
  viewer: Viewer,
  { lng, lat }: { lng: number; lat: number }
) => {
  viewer.camera.setView({
    destination: Cartesian3.fromDegrees(lng + 0.005, lat + 0.005, 1000),
    orientation: {
      pitch: CesiumMath.toRadians(-90.0),
      heading: CesiumMath.toRadians(0),
      roll: 0,
    },
  });
};

/**
 * 创建地图
 * @param container
 */
const initViewer = (container: string | HTMLElement) => {
  const viewer = new Viewer(container, {
    shouldAnimate: true,
    selectionIndicator: false,
    homeButton: false, // 主页按钮，默认true
    scene3DOnly: false, // 每个几何实例仅以3D渲染以节省GPU内存
    animation: false, // 动画控制，默认true
    baseLayerPicker: false, // 是否显示图层选择控件
    geocoder: false, // 地名查找,默认true
    timeline: false, // 时间线,默认true
    navigationHelpButton: false, // 导航帮助说明,默认true
    sceneModePicker: false, // 是否显示投影方式控件
    infoBox: false, // 点击要素之后显示的信息,默认true
    fullscreenButton: false, // 全屏按钮,默认显示true
    navigationInstructionsInitiallyVisible: false,
    mapMode2D: MapMode2D.INFINITE_SCROLL,
    orderIndependentTranslucency: false,
    contextOptions: {
      requestWebgl1: true,
      webgl: {
        alpha: true,
      },
    },
    terrain: Terrain.fromWorldTerrain(),
  });
  viewer.scene.globe.depthTestAgainstTerrain = true;
  viewer.scene.globe.enableLighting = true;
  // window.viewer = viewer;
  const creditContainer = viewer.cesiumWidget.creditContainer as HTMLElement;
  creditContainer.style.display = "none";

  viewer.scene.globe.translucency.enabled = false;

  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    ScreenSpaceEventType.LEFT_CLICK
  );
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  );
  setMapWorldImageLayer(viewer);
  setView(viewer, { lng: 120, lat: 30 });

  return viewer;
};

export default initViewer;
