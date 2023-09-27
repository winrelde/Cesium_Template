import { Viewer, Cartesian3, Entity } from "cesium";
import InitViewer from "./initViewer";

class CesiumMap {
  viewer: Viewer;

  constructor(container: string | HTMLElement) {
    this.viewer = InitViewer(container);
  }
}

export default CesiumMap;
