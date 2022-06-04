import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

const Host = "http://192.168.3.73:3000"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // 路径别名
    },
    extensions: [".js", ".json", ".ts"], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  server: {
    proxy: {
      "/api": {
        target: Host,
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "socket.io": {
        target: Host,
        ws: true,
        changeOrigin: true,
      },
    },
  },
  plugins: [vue()],
})
