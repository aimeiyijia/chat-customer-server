<template>
  <div class="chat-server-container">
    <bar-func></bar-func>
    <bar-chat-list></bar-chat-list>
    <chat-area></chat-area>
  </div>
</template>

<script setup lang="ts">
import { toRaw, onMounted } from "vue"
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

  console.log(toRaw(userStore.user.userInfo), "用户信息")
  // 获取客户原来的咨询信息
  socket.emit("ServerChatData", toRaw(userStore.user.userInfo))
}

function setSocketListener() {
  // 登录后获取所有的聊天列表
  socket.on("ServerChatData", (data: any) => {
    console.log(data, "历史接待数据")
    const friendData = data.data.friendData
    chatStore.setChatPersons(friendData)

    friendData.forEach((o: Customer) => {
      // 不在线不主动接待
      if (o.isOnline !== "on") return
      socket.emit("ReceptionCustomer", {
        chatUserId: userStore.user.userInfo.chatUserId,
        chatUserFriendId: o.chatUserId,
      })
    })
  })
  // 监听客户分配客服事件，便于重新渲染聊天列表
  socket.on("AssignServer", (data: any) => {
    console.log(data, "分配客服")
    const newCustomer = data.data
    chatStore.addChatPerson(newCustomer)

    socket.emit("ReceptionCustomer", {
      chatUserId: userStore.user.userInfo.chatUserId,
      chatUserFriendId: newCustomer.chatUserId,
    })
  })
  // 顾客发来的消息
  socket.on("CustomerMessage", (data: any) => {
    console.log(data, "收到消息")
    chatStore.updateChatMessage(data.data)
  })

  socket.on("ChangeMessageStatus", (data: any) => {
    console.log(data, "已读")
    chatStore.setUnreadToRead(data.data)
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
