<template>
  <div class="messages-container">
    <n-scrollbar style="height: 100%">
      <message-item
        v-for="item in messageState.messageList"
        :key="item.time"
        :data="item"
      ></message-item>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch, watchEffect } from "vue"
import { NScrollbar } from "naive-ui"
import MessageItem from "./MessageItem.vue"
import { useUserStore } from "@/store/index"
import { useChatStore } from "@/store/chat"
const userStore = useUserStore()
const chatStore = useChatStore()

const messageState = reactive<{ messageList: Message[] | [] }>({
  messageList: [],
})

watchEffect(() => {
  let chatingPerson = chatStore.chat.chatingPerson
  let chatPersons = chatStore.chat.chatPersons
  const needRender = chatPersons.find((o) => o.userId === chatingPerson.userId)
  if (needRender && needRender.messages) {
    messageState.messageList = needRender.messages
  } else {
    messageState.messageList = []
  }
})
</script>

<style lang="scss" scoped>
.messages-container {
  height: calc(100% - 250px);
  overflow: hidden;
}
</style>
