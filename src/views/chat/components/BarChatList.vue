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
          <n-avatar
            round
            :size="42"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          />

          <div class="chat-person_desc">
            <div class="chat-person_nick-name">
              瞎宝宝宝宝宝宝宝宝宝宝宝宝宝
            </div>
            <div class="chat-person_last-message">最后一条消息</div>
          </div>
        </div>
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@vicons/ionicons5";
import { ref } from "@vue/reactivity";
import { NSpace, NAvatar, NBadge, NInput, NIcon, NScrollbar } from "naive-ui";
let activedChatPerson = ref(1);
function handleClickChatPerson(item) {
  console.log(item, "点击");
  activedChatPerson.value = item;
}
</script>

<style lang="scss" scoped>
.bar-chat-list-container {
  height: 100%;
  flex: 0 0 340px;
  overflow: hidden;
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
  .chat-person_desc {
    margin-left: 14px;

    .chat-person_nick-name {
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: keep-all;
      white-space: nowrap;
      width: 80%;
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
    .chat-person_last-message {
      color: #999;
    }
  }
}
</style>