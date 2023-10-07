<template>
  <div class="map-picker-wrap">
    <div
      :class="mapFlag ? 'g-map-panel-3dmap' : 'g-map-panel-2dmap'"
      @click="mapPick"
    ></div>
    <div class="map-picker-extend" v-if="mapPickFlag">
      <div class="extend-map">
        <div class="basic-map" ref="basicMapRef" @click="changeBasicMap">
          <div
            :class="mapFlag ? 'basic-map-name-false' : 'basic-map-name-true'"
          >
            标准地图
          </div>
        </div>
        <div
          class="satellite-map"
          ref="satelliteMapRef"
          @click="changeSatelliteMap"
        >
          <div
            :class="
              mapFlag ? 'satellite-map-name-true' : 'satellite-map-name-false'
            "
          >
            高清地图
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import initCesiumMap from "@/hooks/initCesiumMap";

const { getCesiumMap } = initCesiumMap();

const mapFlag = ref<boolean>(true);
const mapPickFlag = ref<boolean>(false);
const mapPick = () => {
  mapPickFlag.value = !mapPickFlag.value;
  // console.log("mapPick");
};
const basicMapRef = ref<any>(null);
const changeBasicMap = () => {
  mapFlag.value = false;
  basicMapRef.value.style.border = "2px solid rgb(28, 125, 221)";
  satelliteMapRef.value.style.border = "";
  getCesiumMap()?.removeTianDiTuImage();
  getCesiumMap()?.removeTianDiTuShp();
  getCesiumMap()?.addTianDiTuShp();
  // console.log("changeBasicMap");
};

const satelliteMapRef = ref<any>(null);
const changeSatelliteMap = () => {
  mapFlag.value = true;
  satelliteMapRef.value.style.border = "2px solid rgb(28, 125, 221)";
  basicMapRef.value.style.border = "";
  getCesiumMap()?.removeTianDiTuImage();
  getCesiumMap()?.removeTianDiTuShp();
  getCesiumMap()?.addTianDiTuImage();
  // console.log("changeSatelliteMap");
};
</script>

<style lang="less" scoped>
.map-picker-wrap {
  width: 40px;
  height: 40px;
  margin-top: 10px;
  cursor: pointer;
  .g-map-panel-2dmap {
    width: 40px;
    height: 40px;
    background-image: url("@/assets/2dmap.png");
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
    border: 3px solid rgb(250, 246, 246);
    cursor: pointer;
  }

  .g-map-panel-2dmap:hover {
    border: 2px solid white;
    border-radius: 50%;
    border: 3px solid rgb(28, 125, 221);
    cursor: pointer;
  }

  .g-map-panel-3dmap {
    width: 40px;
    height: 40px;
    background-image: url("@/assets/3dmap.png");
    border-radius: 50%;
    border: 3px solid rgb(250, 246, 246);
  }

  .g-map-panel-3dmap:hover {
    border: 2px solid white;
    border-radius: 50%;
    border: 3px solid rgb(28, 125, 221);
  }

  .map-picker-extend {
    position: relative;
    left: -320px;
    top: -100px;
    width: 300px;
    padding: 8px;
    background-color: rgb(251, 253, 253);
    font-size: 16px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .extend-header {
      display: block;
      font-weight: bold;
    }

    .extend-map {
      width: 300px;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .basic-map {
        width: 150px;
        height: 100px;
        border-radius: 6px;
        float: left;
        background-image: url("@/assets/2dmap.png");
        background-repeat: no-repeat;
        background-size: cover;
        margin-right: 10px;

        .basic-map-name-false {
          display: inline-block;
          color: white;
          background-color: rgba(231, 236, 236, 0.1);
        }

        .basic-map-name-true {
          display: inline-block;
          color: white;
          background-color: rgb(16, 130, 244);
        }
      }

      .satellite-map {
        width: 150px;
        height: 100px;
        border-radius: 6px;
        float: right;
        background-image: url("@/assets/3dmap.png");
        background-repeat: no-repeat;
        background-size: cover;

        .satellite-map-name-false {
          display: inline-block;
          color: white;
          background-color: rgba(231, 236, 236, 0.1);
        }

        .satellite-map-name-true {
          display: inline-block;
          color: white;
          background-color: rgb(16, 130, 244);
        }
      }
    }
  }
}
</style>
