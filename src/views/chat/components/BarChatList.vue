<template>
  <div class="bar-chat-list-container">
    <div class="chat-person_container" v-for="item in 5" :key="item">
      <n-avatar
        :size="42"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
      <div class="chat-person_desc">
        <div class="chat-person_nick-name">瞎宝宝宝宝宝宝宝宝宝宝宝宝宝</div>
        <div class="chat-person_last-message">最后一条消息</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NSpace, NAvatar, NBadge } from "naive-ui";
</script>

<style lang="scss" scoped>
.bar-chat-list-container {
  // background-color: #e8e7e7;
  height: 100%;
  flex: 0 0 200px;
}
.chat-person_container {
  background-color: #e6e7e9;
  display: flex;
  align-items: center;
  padding: 10px 12px;
  cursor: default;
  &:hover {
    background-color: #cdcdcd;
    transition: all 0.2s;
  }
  .chat-person_desc {
    margin-left: 12px;

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