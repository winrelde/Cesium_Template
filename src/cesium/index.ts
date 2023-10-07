import {
  ImageryLayerCollection,
  ScreenSpaceEventHandler,
  Viewer,
  Rectangle,
  ImageryLayer,
  Cartesian3,
  Entity,
  Cartographic,
  Math as CesiumMath,
  ScreenSpaceEventType,
  defined,
  Cartesian2,
  Ellipsoid,
  HeadingPitchRange,
  BoundingSphere,
  EllipsoidGeodesic,
} from "cesium";
import InitViewer from "./initViewer";

class CesiumMap {
  viewer: Viewer;

  constructor(container: string | HTMLElement) {
    this.viewer = InitViewer(container);
  }

  destroy() {
    this.viewer?.destroy();
    this.viewer = null as any;
  }

  is3D() {
    const is3D = -this.viewer.camera.pitch < 1.57;
    return is3D;
  }

  change23D(DFlag) {
    let curLongitude, curLatitude;
    const centerResult = this.viewer.camera.pickEllipsoid(
      new Cartesian2(
        this.viewer.canvas.clientWidth / 2,
        this.viewer.canvas.clientHeight / 2
      )
    );
    if (!centerResult) {
      return null;
    }
    const curPosition = Ellipsoid.WGS84.cartesianToCartographic(centerResult);
    if (curPosition) {
      curLongitude = CesiumMath.toDegrees(curPosition.longitude);
      curLatitude = CesiumMath.toDegrees(curPosition.latitude);
    }
    const cameraHeight = this.viewer.camera.positionCartographic.height;
    const pitch = -this.viewer.camera.pitch;
    const heading = this.viewer.camera.heading;
    if (DFlag) {
      const h = cameraHeight / Math.sin(pitch);
      this.viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(curLongitude, curLatitude, h),
        orientation: {
          heading: heading,
          pitch: CesiumMath.toRadians(-90),
          roll: 0.0,
        },
      });
    } else {
      const modifyPitch = CesiumMath.toRadians(45);
      const modifyHeight = cameraHeight * Math.sin(modifyPitch);
      const modifyLongitude =
        curLongitude - (modifyHeight / 110000) * Math.sin(heading);
      const modifyLatitude =
        curLatitude - (modifyHeight / 110000) * Math.cos(heading);
      this.viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(
          modifyLongitude,
          modifyLatitude,
          modifyHeight
        ),
        orientation: {
          heading: heading,
          pitch: CesiumMath.toRadians(-45),
          roll: 0.0,
        },
      });
    }
  }

  zoomIn() {
    const position = this.viewer.camera.positionCartographic;
    this.viewer.camera.moveForward(position.height * 0.5);
  }

  zoomOut() {
    const position = this.viewer.camera.positionCartographic;
    this.viewer.camera.moveBackward(position.height * 0.5);
  }
  reset() {
    this.viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(
        119.976333212832,
        30.5242367543257,
        2000
      ),
      orientation: {
        pitch: CesiumMath.toRadians(-90.0),
        heading: CesiumMath.toRadians(0),
        roll: 0,
      },
    });
  }

  resetCompass() {
    let curLongitude, curLatitude;
    const centerResult = this.viewer.camera.pickEllipsoid(
      new Cartesian2(
        this.viewer.canvas.clientWidth / 2,
        this.viewer.canvas.clientHeight / 2
      )
    );
    if (!centerResult) {
      return null;
    }
    const curPosition = Ellipsoid.WGS84.cartesianToCartographic(centerResult);
    if (curPosition) {
      curLongitude = CesiumMath.toDegrees(curPosition.longitude);
      curLatitude = CesiumMath.toDegrees(curPosition.latitude);
    }
    const cameraHeight = this.viewer.camera.positionCartographic.height;
    const pitch = -this.viewer.camera.pitch;
    const L = cameraHeight / Math.tan(pitch);
    this.viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(
        CesiumMath.toDegrees(curPosition.longitude),
        CesiumMath.toDegrees(curPosition.latitude) - L / 110000,
        cameraHeight
      ),
      orientation: {
        heading: 0,
        pitch: this.viewer.camera.pitch,
        roll: 0,
      },
    });
  }
  getScale(): number {
    const viewer = this.viewer;

    const geodesic = new EllipsoidGeodesic();
    const width = viewer.scene.canvas.clientWidth;
    const height = viewer.scene.canvas.clientHeight;

    const left = viewer.scene.camera.getPickRay(
      new Cartesian2((width / 2) | 0, height - 1)
    );
    const right = viewer.scene.camera.getPickRay(
      new Cartesian2((1 + width / 2) | 0, height - 1)
    );

    const globe = viewer.scene.globe;
    const leftPosition = globe.pick(left, viewer.scene);
    const rightPosition = globe.pick(right, viewer.scene);

    if (
      typeof leftPosition === "undefined" ||
      typeof rightPosition === "undefined"
    ) {
      return;
    }

    const leftCartographic =
      globe.ellipsoid.cartesianToCartographic(leftPosition);
    const rightCartographic =
      globe.ellipsoid.cartesianToCartographic(rightPosition);

    geodesic.setEndPoints(leftCartographic, rightCartographic);
    const pixelDistance = geodesic.surfaceDistance;

    return pixelDistance;
  }
}

export default CesiumMap;
