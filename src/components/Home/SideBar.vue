<template>
  <div class="sidebar-wrapper">
    <div>
      <router-link
        v-for="item in options"
        :key="item.key"
        :to="item.path"
        :class="{
          'menu-item': true,
          selected: selectedRoute(item),
        }"
      >
        <el-tooltip :content="item.label" placement="right">
          <!-- <Edit class="tooltip" /> -->
          <component :is="item.icon" class="tooltip" />
        </el-tooltip>
      </router-link>
    </div>
    <div class="mb20">
      <el-tooltip content="退出登录" placement="right">
        <el-icon @click="logOut">
          <DArrowLeft style="cursor: pointer" />
        </el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

interface IOptions {
  key: number;
  label: string;
  path:
    | string
    | {
        path: string;
        query?: any;
      };
  icon: string;
}

const router = useRouter();
const route = useRoute();

const options = ref([
  {
    key: 0,
    label: "项目1",
    path: "/project1",
    icon: "Edit",
  },
  {
    key: 1,
    label: "项目2",
    path: "/project2",
    icon: "Plus",
  },
  {
    key: 2,
    label: "项目3",
    path: "/project3",
    icon: "Edit",
  },
]);

const selectedRoute = (item: IOptions) => {
  const path = typeof item.path === "string" ? item.path : item.path.path;
  return route.path?.indexOf(path) === 0;
};

const logOut = () => {
  router.push("/login");
};
</script>

<style scoped lang="less">
.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 50px;
  border-right: 1px solid #4f4f4f;
  color: white;
  // flex: 1;
  overflow: hidden;
  .menu-item {
    width: 100%;
    padding: 16px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    cursor: pointer;
    &.selected {
      background-color: #101010;
      color: blue;
    }
    .tooltip {
      width: 50px;
      height: 20px;
      pointer-events: none;
    }
  }
  .mb20 {
    width: 20px;
    height: 20px;
    padding: 0 0 10px 0;
  }
}
</style>
