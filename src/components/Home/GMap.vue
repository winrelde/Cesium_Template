<template>
  <div class="g-map-wrap">
    <div id="g-container" class="g-container-wrap"></div>
    <div class="g-map-action-panel">
      <!-- 绘图区域 -->
      <div class="g-map-panel-operation">
        <div @click="resetCompass">
          <div class="g-map-panel-compass"></div>
          <div class="compass-inner">
            <span class="heading-wrap"
              >{{ heading == "360" ? "0" : heading }}°</span
            >
          </div>
        </div>
        <div class="g-map-panel-item" @click="change23D">
          <span class="item-span">{{ DFlag ? "2D" : "3D" }}</span>
        </div>
        <div class="g-map-panel-item" @click="zoomIn">
          <el-icon :size="20">
            <Plus />
          </el-icon>
        </div>
        <div class="g-map-panel-item" @click="reset">
          <el-icon :size="20"><Aim /></el-icon>
        </div>
        <div class="g-map-panel-item" @click="zoomOut">
          <el-icon :size="20">
            <Minus />
          </el-icon>
        </div>
        <MapPicker></MapPicker>
      </div>
    </div>
    <div class="footer">
      <div class="footer-left"></div>
      <div class="footer-middle"></div>
      <div class="footer-right">
        <span class="right-item">{{ scaleValue }}</span>
        <span class="right-scale"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import initCesiumMap from "@/hooks/initCesiumMap";
import { onMounted } from "vue";
const { init, getCesiumMap } = initCesiumMap();

const DFlag = ref(true);
const heading = ref<string>("0");
const scaleValue = ref<string>("50m");

const change23D = () => {
  getCesiumMap()?.change23D(DFlag.value);
  DFlag.value = !DFlag.value;
};
const zoomIn = () => {
  getCesiumMap()?.zoomIn();
};

const zoomOut = () => {
  getCesiumMap()?.zoomOut();
};

const reset = () => {
  getCesiumMap()?.reset();
};

const resetCompass = () => {
  getCesiumMap()?.resetCompass();
};

const getScaleLabel = (pixelDistance: number) => {
  const distances = [
    1, 2, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000,
    10000, 20000, 30000, 50000, 100000, 200000, 300000, 500000, 1000000,
    2000000, 3000000, 5000000, 10000000, 20000000, 30000000, 50000000,
  ];

  let distance = 0;
  const maxBarWidth = 100;
  for (let i = distances.length - 1; !distance && i >= 0; --i) {
    if (distances[i] / pixelDistance < maxBarWidth) {
      distance = distances[i];
    }
  }
  let distanceLabel = "";
  let barWidth = 0;
  if (distance) {
    const label =
      distance >= 1000
        ? (distance / 1000).toString() + " km"
        : distance.toString() + " m";
    barWidth = (distance / pixelDistance) | 0;
    distanceLabel = label;
  } else {
    barWidth = 0;
    distanceLabel = "";
  }
  scaleValue.value = distanceLabel;
  const scaleElement = document.querySelector(".right-scale") as HTMLElement;
  scaleElement!.style.width = `${barWidth}px`;
};

onMounted(() => {
  init("g-container");

  getCesiumMap()?.viewer.scene.postRender.addEventListener(() => {
    const cameraHeading = getCesiumMap()?.viewer.camera.heading as number;
    const degree = (cameraHeading * 180) / Math.PI;
    // console.log("我改变了" + degree);
    heading.value = degree.toFixed(0);
    const rotateElement = document.querySelector(
      ".g-map-panel-compass"
    ) as HTMLElement;
    rotateElement!.style.transform = `rotate(${-heading.value}deg)`;

    const pixelDistance = getCesiumMap()?.getScale() as number;
    getScaleLabel(pixelDistance);
    DFlag.value = getCesiumMap()?.is3D() as boolean;
  });
});
</script>

<style lang="less" scoped>
.g-map-wrap {
  width: 100%;
  height: 100%;
  .g-container-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .g-map-action-panel {
    position: absolute;
    width: 56px;
    top: 24px;
    bottom: 48px;
    right: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    z-index: 99;

    .g-map-panel-operation {
      position: relative;
      width: 56px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      .g-map-panel-item {
        width: 28px;
        height: 28px;
        background-color: #f6f2f2;
        color: #333;
        border-radius: 2px;
        border: 1px solid rgba(237, 232, 232, 0.1);
        line-height: 20px;
        /* text-align: center; */
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
        font-size: 16px !important;
        cursor: pointer;
        .item-span {
          font-size: 16px;
        }
      }

      .g-map-panel-item:hover {
        border: 1px solid rgb(28, 125, 221);
        border-radius: 2px;
      }

      .g-map-panel-compass {
        width: 56px;
        height: 56px;
        background: url("@/assets/map-compass-outer.svg") no-repeat;
        background-size: contain;
        border-radius: 50%;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
      }
      .compass-inner {
        position: absolute;
        left: 7px;
        top: 6px;
        width: 42px;
        height: 42px;
        background: url("@/assets/map-compass-inner.svg") no-repeat 50%;
        background-size: contain;
        display: flex;
        justify-content: center;
        align-items: center;
        .heading-wrap {
          margin-top: 2px;
          font-size: 18px;
        }
      }
    }
  }

  .footer {
    position: absolute;
    width: 100%;
    height: 32px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 14px;
    line-height: 22px;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 99;
    .footer-left {
      flex: 3;
    }
    .footer-middle {
      flex: 1;
    }
    .footer-right {
      flex: 1;
      .right-scale {
        display: inline-block;
        border: 1px solid white;
        border-top: 0;
        border-bottom-width: 2px;
        width: 100px;
        height: 10px;
        transition: width 0.25s;
        margin-left: 8px;
      }
    }
  }
}
</style>
