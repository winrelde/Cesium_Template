<template>
  <div class="project-app-wrapper">
    <div class="left">
      <SideBar />
      <div
        class="main-content"
        :class="{
          'main-content-shrink': !showRouterView,
        }"
      >
        <router-view />
      </div>
      <div class="shrink" @click="shrinkClick">
        <div v-if="showRouterView">
          <DArrowLeft style="width: 20px; height: 20px" />
        </div>
        <div v-else>
          <DArrowRight style="width: 20px; height: 20px" />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="map-wrapper">
        <GMap />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const showRouterView = ref<boolean>(true);
const shrinkClick = () => {
  showRouterView.value = !showRouterView.value;
};
</script>
<style lang="less" scoped>
.project-app-wrapper {
  display: flex;
  transition: width 0.2s ease;
  height: 100%;
  width: 100%;

  .left {
    display: flex;
    background-color: #232323;
    position: relative;
    .main-content {
      flex: 1;
      color: white;
      width: 285px;
      transition: all 0.1s ease;
    }
    .shrink {
      position: absolute;
      z-index: 200;
      right: 0;
      top: 50%;
      transform: translate(16px, -50%);
      border-radius: 0 4px 4px 0;
      width: 16px;
      height: 80px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);
      cursor: pointer;
    }
    .main-content-shrink {
      width: 0;
      overflow: scroll;
      transition: all 0.1s ease;
    }
  }

  .right {
    flex-grow: 1;
    position: relative;

    .map-wrapper {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
