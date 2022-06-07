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
  // 登录后获取所有的聊天列表
  socket.on("ServerChatData", (data: any) => {
    const friendData = data.data.friendData
    chatStore.setChatPersons(friendData)

    friendData.forEach((o) => {
      socket.emit("ReceptionCustomer", {
        userId: userStore.user.userInfo.userId,
        friendId: o.userId,
      })
    })
  })
  // 监听客户分配客服事件，便于重新渲染聊天列表
  socket.on("AssignServer", (data: any) => {
    const newCustomer = data.data
    chatStore.addChatPerson(newCustomer)

    this.socket.emit("ReceptionCustomer", {
      userId: userStore.user.userInfo.userId,
      friendId: newCustomer.userId,
    })
  })
  // 顾客发来的消息
  socket.on("CustomerMessage", (data: any) => {
    console.log(data, "收到消息")
    chatStore.updateChatMessage(data.data)
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
