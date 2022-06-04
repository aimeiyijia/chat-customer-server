<script setup lang="ts">
import ChatContent from "./views/chat/index.vue"
import { NConfigProvider, GlobalThemeOverrides } from "naive-ui"

const themeOverrides: GlobalThemeOverrides = {
  common: {
    baseColor: "#409EFF",
    primaryColor: "#409EFF",
    primaryColorHover: "#409EFF",
    primaryColorPressed: "#409EFF",
    primaryColorSuppl: "#409EFF",
  },
}
</script>

<template>
  <n-config-provider class="app-container" :theme-overrides="themeOverrides">
  <transition name="fade">
    <router-view></router-view>
  </transition>
  </n-config-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
