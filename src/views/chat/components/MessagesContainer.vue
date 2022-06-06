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
import { reactive, computed, watch, watchEffect } from "vue"
import { NScrollbar } from "naive-ui"
import MessageItem from "./MessageItem.vue"
import { useUserStore } from "@/store/index"
import { useChatStore } from "@/store/chat"
const userStore = useUserStore()
const chatStore = useChatStore()

const messageSate = reactive<{ messageList: Message[] | [] }>({
  messageList: [],
})

// watch(
//   () => chatStore.chat,
//   (newVal) => {
//     console.log(newVal, "567890")
//     const { chatingPerson, chatPersons } = newVal
//     const needRender = chatPersons.find(
//       (o) => o.userId === chatingPerson.userId
//     )
//     console.log(needRender, "123")
//     if (needRender && needRender.messages) {
//       messageSate.messageList = assortByUseId(needRender.messages as Message[])
//     } else {
//       messageSate.messageList = []
//     }
//   },
//   {
//     deep: true,
//   }
// )
watchEffect(() => {
  let chatingPerson = chatStore.chat.chatingPerson
  let chatPersons = chatStore.chat.chatPersons
// const { chatingPerson, chatPersons } = newVal
    const needRender = chatPersons.find(
      (o) => o.userId === chatingPerson.userId
    )
    console.log(needRender, "123")
    if (needRender && needRender.messages) {
      messageSate.messageList = assortByUseId(needRender.messages as Message[])
    } else {
      messageSate.messageList = []
    }
})
// watch(
//   () => [chatStore.chat.chatPersons, chatStore.chat.chatingPerson],
//   ([chatPersons, chatingPerson]) => {
//     console.log(chatPersons, "1")
//     console.log(chatingPerson, "2")
//     const needRender = chatPersons.find(
//       (o) => o.userId === chatingPerson.userId
//     )
//     console.log(needRender, "123")
//     if (needRender && needRender.messages) {
//       messageSate.messageList = assortByUseId(needRender.messages as Message[])
//     } else {
//       messageSate.messageList = []
//     }
//   },
//   {
//     deep: true,
//   }
// )

function assortByUseId(userData: Message[]): Message[] {
  const loginUserId = userStore.user.userInfo.userId
  const chatingPerson = chatStore.chat.chatingPerson
  return userData.map((o) => {
    if (o.userId === loginUserId) {
      Object.assign(o, userStore.user.userInfo)
      o.position = "right"
    } else {
      o.position = "left"
      Object.assign(o, chatingPerson)
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
