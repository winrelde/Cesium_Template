<template>
  <div id="g-container" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script setup lang="ts">
import initCesiumMap from "../hooks/initCesiumMap";
import { onMounted } from "vue";
const { init } = initCesiumMap();

onMounted(() => {
  init("g-container");
});
</script>

<style scoped></style>
