<template>
  <div class="chat-server-container">
    <bar-func></bar-func>
    <bar-chat-list></bar-chat-list>
    <chat-area></chat-area>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import socketIo from "@/socket"
import BarFunc from "./components/BarFunc.vue"
import BarChatList from "./components/BarChatList.vue"
import ChatArea from "./components/ChatArea.vue"
import { useUserStore } from "@/store/index"
import { useChatStore } from "@/store/chat"
import cloneDeep from "clone-deep"
const userStore = useUserStore()
const chatStore = useChatStore()
let socket: SocketIOClient.Socket
onMounted(() => {
  createSocketConnect()
})
function createSocketConnect() {
  socket = socketIo.connectSocket()
  setSocketListener()

  // 获取客户原来的咨询信息
  socket.emit("ServerChatData", userStore.user.userInfo)
}

function setSocketListener() {
  socket.on("ServerChatData", (data: any) => {
    chatStore.setChatPersons(data.data.friendData)
  })
}
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
