<template>
  <div class="chat-person-info-container">
    <div class="info_name">霞霞下下下虾虾</div>
    <n-icon class="opera" size="30" color="#000" :component="EllipsisHorizontalSharp">
    </n-icon>
  </div>
</template>

<script setup>
import { EllipsisHorizontalSharp } from "@vicons/ionicons5";
import { NIcon } from "naive-ui";
</script>

<style lang="scss" scoped>
.chat-person-info-container {
  height: 54px;
  background-color: #f8f9fe;
  border-bottom: 1px solid #dadbdf;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .opera {
    cursor: pointer;
  }
}
</style>