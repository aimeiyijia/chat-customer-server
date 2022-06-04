<script setup lang="ts">
import {
  NConfigProvider,
  GlobalThemeOverrides,
  NMessageProvider,
} from "naive-ui"
import Layout from "@/views/layout/index.vue"
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
    <n-message-provider>
      <layout></layout>
    </n-message-provider>
  </n-config-provider>
</template>

<style></style>
