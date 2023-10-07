import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cesium from "vite-plugin-cesium";
// 按需引入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 8081,
    open: true,
  },
  plugins: [
    vue(),
    cesium(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      resolvers: [ElementPlusResolver()],
      dts: "src/types/auto-imports.d.ts", // 指定自动导入函数TS类型声明文件路径,
      dirs: ["src/components"],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: "src/types/components.d.ts",
      dirs: ["src/components"],
    }),
  ],
});
