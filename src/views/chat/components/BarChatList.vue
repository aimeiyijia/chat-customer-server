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
          v-for="item in [1, 2, 3, 4]"
          :key="item"
          :class="[item === activedChatPerson ? 'actived' : '']"
          @click="handleClickChatPerson(item)"
        >
          <n-icon size="42">
            <i v-html="getAvatar(item)"></i>
          </n-icon>

          <div class="chat-person_desc">
            <div class="top">
              <div class="chat-person_nick-name">
                瞎宝宝宝宝宝宝宝宝宝宝宝宝宝
              </div>
              <span class="chat-person_message-time">22:50</span>
            </div>
            <div class="bottom chat-person_last-message">最后一条消息</div>
          </div>
        </div>
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@vicons/ionicons5"
import { ref } from "@vue/reactivity"
import { NSpace, NAvatar, NBadge, NInput, NIcon, NScrollbar } from "naive-ui"
import multiavatar from "@multiavatar/multiavatar/esm"

let activedChatPerson = ref(1)
function getAvatar(name: any): string {
  return multiavatar(name)
}
function handleClickChatPerson(item: any) {
  activedChatPerson.value = item
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
    background-color: #e5e5e5;
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
    .top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .chat-person_nick-name {
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: keep-all;
      white-space: nowrap;
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
