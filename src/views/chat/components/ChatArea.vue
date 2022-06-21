<template>
  <div class="chat-area-container">
    <chat-person-info></chat-person-info>
    <messages-container></messages-container>
    <chat-input></chat-input>
  </div>
</template>

<script setup lang="ts">
import MessagesContainer from "./MessagesContainer.vue"
import ChatPersonInfo from "./ChatPersonInfo.vue"
import ChatInput from "./ChatInput.vue"
</script>

<style lang="scss" scoped>
.chat-area-container {
  height: 100%;
  flex: 1 1 auto;
  background-color: #f4f4f8;
}
</style>
