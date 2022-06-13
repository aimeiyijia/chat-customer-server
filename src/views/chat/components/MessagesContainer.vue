<template>
  <div class="messages-container">
    <n-scrollbar style="height: 100%" ref="scrollbarRef">
      <message-item
        v-for="item in messageState.messageList"
        :key="item.time"
        :data="item"
      ></message-item>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  onMounted,
  nextTick,
} from "vue"
import { NScrollbar } from "naive-ui"
import MessageItem from "./MessageItem.vue"
import { useUserStore } from "@/store/index"
import { useChatStore } from "@/store/chat"
const userStore = useUserStore()
const chatStore = useChatStore()

const scrollbarRef = ref()

const messageState = reactive<{ messageList: Message[] | [] }>({
  messageList: [],
})

watchEffect(() => {
  let chatingPerson = chatStore.chat.chatingPerson
  console.log("当前接待的客户变化", chatingPerson)
  let chatPersons = chatStore.chat.chatPersons
  const needRender = chatPersons.find(
    (o) => o.chatUserId === chatingPerson!.chatUserId
  )
  if (needRender && needRender.messages) {
    console.log(needRender.messages, "需要被渲染的消息")
    messageState.messageList = assortByUseId(needRender.messages)
  } else {
    messageState.messageList = []
  }
  console.log("当前接待的客户变化1234567", chatingPerson)
  setScrollToBottom()
})

// 根据chatUserId归类客户，客服消息
function assortByUseId(messageData: Message[]): Message[] {
  const loginchatUserId = userStore.user.userInfo.chatUserId
  const chatingPerson = chatStore.chat.chatingPerson
  return messageData.map((o) => {
    if (o.chatUserId === loginchatUserId) {
      Object.assign(o, userStore.user.userInfo)
      o.position = "right"
    } else {
      o.position = "left"
      Object.assign(o, chatingPerson)
    }
    return o
  })
}

function setScrollToBottom() {
  nextTick(function () {
    const scrollToDistance = getComputedStyle(
      scrollbarRef.value.$refs.scrollbarInstRef.$refs.contentRef
    ).height
    // console.log(Number(scrollToDistance.replace("px", "")))
    scrollbarRef.value.scrollTo({
      top: Number(scrollToDistance.replace("px", "")),
      // behavior: "smooth",
    })
  })
}
</script>

<style lang="scss" scoped>
.messages-container {
  height: calc(100% - 250px);
  overflow: hidden;
}
</style>
