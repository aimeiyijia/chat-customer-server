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
        <div class="chat-person_item" v-for="item in 20" :key="item">
          <n-badge :value="100" :max="99" processing>
            <n-avatar
              :size="42"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            />
            <!-- <template #value>
              <n-icon :component="LockClosedOutline" />
            </template> -->
          </n-badge>

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
import { NSpace, NAvatar, NBadge, NInput, NIcon, NScrollbar } from "naive-ui";
</script>

<style lang="scss" scoped>
.bar-chat-list-container {
  height: 100%;
  flex: 0 0 324px;
  overflow: hidden;
}
.chat-person_search {
  padding: 10px 12px;
}
.chat-person_container {
  height: 100%;
}
.chat-person_item {
  background-color: #fdfdfd;
  display: flex;
  align-items: center;
  padding: 14px 12px;
  cursor: default;
  &:hover {
    background-color: #eeeeee;
  }
  ::v-deep .n-badge-sup {
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
    }
    .chat-person_last-message {
      color: #3e3e3e;
    }
  }
}
</style>