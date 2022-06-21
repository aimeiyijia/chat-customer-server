<template>
  <div class="bar-chat-list-container">
    <div class="chat-person_search">
      <n-input placeholder="搜索">
        <template #prefix>
          <n-icon :component="Search" />
        </template>
      </n-input>
    </div>

    <div class="chat-person_container">
      <n-scrollbar style="height: calc(100% - 54px)">
        <!-- <n-badge dot> </n-badge> -->
        <div
          class="chat-person_item"
          v-for="item in chatPersonList"
          :key="item.chatUserId"
          :class="[item.chatUserId === chatingPerson!.chatUserId ? 'actived' : '']"
          @click="handleClickChatPerson(item)"
        >
          <n-icon size="42">
            <n-badge dot :type="item.isOnline === 'on' ? 'info' : 'error'">
              <i v-html="getAvatar(item.chatUserId)"></i>
            </n-badge>
          </n-icon>

          <div class="chat-person_desc">
            <div class="top">
              <div class="chat-person_nick-name">
                {{ item.username }}
              </div>
              <span class="chat-person_message-time">22:50</span>
            </div>
            <div class="bottom">
              <div class="chat-person_last-message">
                {{ item.lastMessage ? renderContent(item.lastMessage) : "无" }}
              </div>
              <!-- <n-badge color="#F56C6C" :value="item.unReadCount" :max="99" /> -->
              <n-badge color="#F56C6C" :value="item.noReadCount" :max="99" />
            </div>
          </div>
        </div>
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@vicons/ionicons5"
import { ref, computed, watch } from "vue"
import { NSpace, NAvatar, NBadge, NInput, NIcon, NScrollbar } from "naive-ui"
import multiavatar from "@multiavatar/multiavatar/esm"
import { useChatStore } from "@/store/chat"
import { useUserStore } from "@/store/index"
import socketIo from "@/socket"

const userStore = useUserStore()
const chatStore = useChatStore()
const chatPersonList = computed(() => {
  return chatStore.chat.chatPersons
})

const chatingPerson = computed(() => {
  console.log("接待的人变化")
  return chatStore.chat.chatingPerson
})

watch(
  () => chatingPerson.value,
  (val) => {
    console.log(val, "设为已读")
    const { userInfo, token } = userStore.user
    socketIo._socket.emit("ChangeMessageStatus", {
      chatUserId: userInfo!.chatUserId,
      chatUserFriendId: (val as Customer).chatUserId,
      token,
    })
  }
)

function getAvatar(name: string): string {
  return multiavatar(name)
}
function handleClickChatPerson(item: Customer) {
  if (chatingPerson.value && chatingPerson.value.chatUserId === item.chatUserId)
    return
  chatStore.setChatingPerson(item)
  const { userInfo, token } = userStore.user

  socketIo._socket.emit("ReceptionCustomer", {
    chatUserId: userInfo!.chatUserId,
    chatUserFriendId: item.chatUserId,
    token,
  })
}

function renderContent(lastMessage: Message) {
  switch (lastMessage.messageType) {
    case "text":
      return lastMessage.content
    case "image":
      return `[图片]`
    case "auto":
      return `[机器人自动回复]`
    case "url":
      return `[机器人自动回复]`

    default:
      return "无"
  }
}
</script>

<style lang="scss" scoped>
.bar-chat-list-container {
  height: 100%;
  flex: 0 0 320px;
  overflow: hidden;
  background-color: #fff;
  // border-right: 1px solid #dadbdf;
}
.chat-person_search {
  padding: 10px 12px;
  border-right: 1px solid #dadbdf8a;
}
.chat-person_container {
  height: 100%;
}
.chat-person_item {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 14px 12px;
  cursor: default;
  &:hover {
    background-color: #eee;
  }
  &.actived {
    background-color: #e4e4e4;
  }
  :deep(.n-badge-sup) {
    left: 86%;
    top: 0;
  }

  :deep(.n-avatar) {
    flex: 0 0 auto;
  }

  .chat-person_desc {
    width: calc(100% - 58px);
    padding: 0 14px;
    .top,
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .bottom {
      height: 22px;
    }
    .chat-person_nick-name,
    .chat-person_last-message {
      width: 204px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: keep-all;
      white-space: nowrap;
    }
    .chat-person_nick-name {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    .chat-person_message-time {
      color: #828282;
    }

    .chat-person_last-message {
      color: #999;
    }
  }
}
</style>
