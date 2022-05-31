<template>
  <div class="chat-server-container">
    <bar-func></bar-func>
    <bar-chat-list></bar-chat-list>
    <chat-area></chat-area>
  </div>
</template>

<script setup lang="ts">
import BarFunc from "./components/BarFunc.vue";
import BarChatList from "./components/BarChatList.vue";
import ChatArea from "./components/ChatArea.vue";
</script>

<style lang="scss" scoped>
.chat-server-container {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 80%;
  min-width: 600px;
  height: 90%;
  
  box-shadow: 0px 0px 4px #0000004d;
}
</style>