<template>
  <div class="messages-container">
    <n-scrollbar style="height: 100%">
      <message-item
        v-for="item in messageSate.messageList"
        :key="item.time"
        :data="item"
      ></message-item>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from "vue"
import { NScrollbar } from "naive-ui"
import MessageItem from "./MessageItem.vue"
import { useUserStore } from "@/store/index"
import { useChatStore } from "@/store/chat"
const userStore = useUserStore()
const chatStore = useChatStore()

const messageSate = reactive<{ messageList: Message[] | [] }>({
  messageList: [],
})

const chatingPerson = computed(() => {
  return chatStore.chat.chatingPerson
})

// let messageList: Message[] | [] = reactive([])

watch(chatingPerson, (newVal) => {
  if (newVal.messages) {
    messageSate.messageList = assortByUseId(newVal.messages as Message[])
  } else {
    messageSate.messageList = []
  }
})

function assortByUseId(userData: Message[]): Message[] {
  const loginUserId = userStore.user.userInfo.userId
  return userData.map((o) => {
    if (o.userId === loginUserId) {
      Object.assign(o, userStore.user.userInfo)
      o.position = "right"
    } else {
      o.position = "left"
      Object.assign(o, chatingPerson.value)
    }

    return o
  })
}
</script>

<style lang="scss" scoped>
.messages-container {
  height: calc(100% - 248px);
}
</style>
