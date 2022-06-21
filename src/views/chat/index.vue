<template>
  <div class="chat-server-container">
    <bar-func></bar-func>
    <bar-chat-list></bar-chat-list>
    <chat-area></chat-area>
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw, onMounted } from "vue"
import socketIo from "@/socket"
import BarFunc from "./components/BarFunc.vue"
import BarChatList from "./components/BarChatList.vue"
import ChatArea from "./components/ChatArea.vue"
import { useRouter } from "vue-router"

import { useNotification } from "naive-ui"

import { useUserStore } from "@/store/index"
import { useChatStore } from "@/store/chat"

const notification = useNotification()

const router = useRouter()
const userStore = useUserStore()
const chatStore = useChatStore()
let socket: SocketIOClient.Socket

let isHasNoticePermission = ref(false)
let isCurTabFocus = ref(true)

onMounted(() => {
  createSocketConnect()
  getNotificationPermission()
  addWindowlisteners()
})

// 获取浏览器通知权限
function getNotificationPermission() {
  if (window.Notification) {
    if (Notification.permission === "granted") {
      isHasNoticePermission.value = true
    } else {
      Notification.requestPermission(function (status) {
        if (Notification.permission !== status) {
          isHasNoticePermission.value = true
        }
      })
    }
  }
}
// 监听浏览器窗口是否聚焦
function addWindowlisteners() {
  window.onfocus = function (event) {
    console.log("聚焦--------", event)
    isCurTabFocus.value = true
  }

  window.onblur = function (event) {
    console.log("失焦--------", event)
    isCurTabFocus.value = false
  }
}

function openNotification(msg: string) {
  // 有通知权限，并且当前窗口不处在激活态时才能发起通知
  if (isHasNoticePermission.value && !isCurTabFocus.value) {
    new Notification("破产客服系统通知", {
      icon: "https://cdn2.iconfinder.com/data/icons/mixed-rounded-flat-icon/512/megaphone-64.png",
      body: msg,
    })
  }
}

function createSocketConnect() {
  socket = socketIo.connectSocket()
  setSocketListener()

  console.log(toRaw(userStore.user.userInfo), "用户信息")
  // 获取客户原来的咨询信息
  socket.emit("ServerChatData", {
    ...toRaw(userStore.user.userInfo),
    token: userStore.user.token,
  })
}

function setSocketListener() {
  // 登录后获取所有的聊天列表
  socket.on("ServerChatData", (data: any) => {
    console.log(data, "历史接待数据")
    if (data.code === 401) {
      console.log("登录超期")
      router.push({ name: "Login" })
      userStore.clearToken()
      userStore.clearUserInfo()
      chatStore.clearChatPerson()
      chatStore.clearChatingPerson()
      return
    }
    if (!data.data || !data.data.friendData) {
      chatStore.clearChatPerson()
      chatStore.clearChatingPerson()
      return
    }
    const friendData = data.data.friendData
    chatStore.setChatPersons(friendData)

    friendData.forEach((o: Customer) => {
      // 不在线不主动接待
      if (o.isOnline !== "on") return
      socket.emit("ReceptionCustomer", {
        chatUserId: userStore.user.userInfo!.chatUserId,
        chatUserFriendId: o.chatUserId,
        token: userStore.user.token,
      })
    })
  })
  // 监听客户分配客服事件，便于重新渲染聊天列表
  socket.on("AssignServer", (data: any) => {
    console.log(data, "分配客服")
    const newCustomer = data.data
    // existFlag为true是新分配客户
    if (newCustomer.existFlag) {
      chatStore.addChatPerson(newCustomer)
      notification.info({
        duration: 3000,
        content: "有新客户咨询问题",
        meta: `用户名：${newCustomer.username}`,
      })
      openNotification("有新客户咨询问题")
    }

    socket.emit("ReceptionCustomer", {
      chatUserId: userStore.user.userInfo!.chatUserId,
      chatUserFriendId: newCustomer.chatUserId,
      token: userStore.user.token,
    })
  })
  // 顾客发来的消息
  socket.on("CustomerMessage", (data: any) => {
    console.log(data, "收到消息")
    chatStore.updateChatMessage(data.data)
    openNotification("收到了新消息")

    // 如果正好是当前接待客户发来的消息，则将消息直接置为已读
    if (data.data.chatUserId === chatStore.chat.chatingPerson!.chatUserId) {
      socketIo._socket.emit("ChangeMessageStatus", {
        chatUserId: userStore.user.userInfo!.chatUserId,
        chatUserFriendId: data.data.chatUserId,
        token: userStore.user.token,
      })
    }
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
