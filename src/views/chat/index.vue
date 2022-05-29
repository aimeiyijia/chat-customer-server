<template>
  <div class="chat-server-container">
    <bar-func></bar-func>
  </div>
</template>

<script setup lang="ts">
import BarFunc from "./components/BarFunc.vue";
</script>

<style lang="scss" scoped>
.chat-server-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>