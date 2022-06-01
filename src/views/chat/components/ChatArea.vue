<template>
  <div class="chat-area-container">
    <messages-container></messages-container>
  </div>
</template>

<script setup lang="ts">
import MessagesContainer from './MessagesContainer.vue'
</script>

<style lang="scss" scoped>
.chat-area-container {
  height: 100%;
  flex: 1 1 auto;
  background-color: #f4f4f8;
}
</style>