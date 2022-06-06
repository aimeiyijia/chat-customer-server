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
        <div
          class="chat-person_item"
          v-for="item in chatPersonList"
          :key="item.userId"
          :class="[item.userId === chatingPerson.userId ? 'actived' : '']"
          @click="handleClickChatPerson(item)"
        >
          <n-icon size="42">
            <i v-html="getAvatar(item.userId)"></i>
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
                {{ item.lastMessage ? item.lastMessage.content : "" }}
              </div>
              <n-badge color="#F56C6C" :value="20" :max="99" />
            </div>
          </div>
        </div>
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@vicons/ionicons5"
import { ref, computed } from "vue"
import { NSpace, NAvatar, NBadge, NInput, NIcon, NScrollbar } from "naive-ui"
import multiavatar from "@multiavatar/multiavatar/esm"
import { useChatStore } from "@/store/chat"

const chatStore = useChatStore()
const chatPersonList = computed(() => {
  return chatStore.chatPersons
})

const chatingPerson = computed(() => {
  return chatStore.chat.chatingPerson
})

function getAvatar(name: any): string {
  return multiavatar(name)
}
function handleClickChatPerson(item: Customer) {
  chatStore.setChatingPerson(item)
}
</script>

<style lang="scss" scoped>
.bar-chat-list-container {
  height: 100%;
  flex: 0 0 320px;
  overflow: hidden;
  border-right: 1px solid #dadbdf;
}
.chat-person_search {
  padding: 10px 12px;
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
    background-color: #dadada;
  }
  :deep .n-badge-sup {
    left: 86%;
    top: -0.7em;
  }
  ::v-deep .n-avatar {
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
