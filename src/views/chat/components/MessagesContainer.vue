<template>
  <div class="messages-container">
    <message-item
      v-for="item in messageList"
      :key="item.time"
      :data="item"
    ></message-item>
  </div>
</template>

<script setup lang="ts">
import MessageItem from "./MessageItem.vue";

type Message = {
  position: string;
  avatar: string;
  username: string;
  time: string;
  content: string;
  messageType: string;
};
const messageList: Message[] | [] = [
  {
    position: "left",
    avatar: "",
    username: "用户名称",
    time: "2022-5-31 20:38:59",
    content: "用户发送的消息",
    messageType: "text",
  },
  {
    position: "right",
    avatar: "",
    username: "用户名称",
    time: "2022-5-31 20:38:59",
    content: "客服发送的消息",
    messageType: "text",
  },
  {
    position: "right",
    avatar: "",
    username: "用户名称",
    time: "2022-5-31 20:38:59",
    content: "客服发送的消息",
    messageType: "text",
  },
  {
    position: "right",
    avatar: "",
    username: "用户名称",
    time: "2022-5-31 20:38:59",
    content: "客服发送的消息",
    messageType: "text",
  },
];
</script>

<style lang="scss" scoped>
.messages-container {
}
</style>