<template>
  <div class="message-container">
    <div
      class="message-item"
      :class="[msg.userId === userInfo.userId ? 'right' : 'left']"
      v-for="msg in item.messages"
      :key="msg.date"
    >
      <template v-if="msg.position === 'left'">
        <n-avatar
          shape="square"
          :size="48"
          :src="imgUrl + item.avatar"
        ></n-avatar>
        <div class="main">
          <div class="time">
            <span class="username">{{ item.username }}</span>
            <span>{{ formatTime(msg.time) }}</span>
          </div>
          <div class="content">
            <div class="image" fit="contain" v-if="msg.messageType === 'image'">
              <n-image
                :src="imgUrl + msg.content"
                :preview-src-list="[imgUrl + msg.content]"
              ></n-image>
            </div>
            <div class="text" v-else>
              {{ msg.content }}
            </div>
          </div>
        </div>
      </template>
      <template v-if="msg.position === 'center'"></template>
      <!-- 右侧一定是当前的登录人，所以头像等信息从userInfo中取 -->
      <template v-if="msg.position === 'left'">
        <div class="main">
          <div class="time">
            <span>{{ formatTime(msg.time) }}</span>
            <span class="username">{{ userInfo.username }}</span>
          </div>
          <div class="content">
            <div class="image" v-if="msg.messageType === 'image'">
              <n-image
                :src="imgUrl + msg.content"
                :preview-src-list="[imgUrl + msg.content]"
              />
            </div>
            <div class="text" v-else>
              {{ msg.content }}
            </div>
          </div>
        </div>
        <n-avatar
          shape="square"
          :size="48"
          :src="imgUrl + userInfo.avatar"
        ></n-avatar>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, shallowReactive, markRaw } from "vue";
import { NIcon, NAvatar, NBadge, NImage } from "naive-ui";
const messages = [];
</script>

<style scoped lang="scss">
.message-container {
  width: 100%;
  height: calc(100% - 190px);
  overflow: auto;
  border-bottom: 2px solid #d6dadf;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
}
.message-item {
  color: #303133;
  display: flex;
  margin-top: 24px;
  &:nth-child(1) {
    margin-top: 0;
  }
  ::v-deep .el-avatar {
    background: #f2f5f780;
    flex: 0 0 48px;
  }
  .main {
    margin-left: 12px;
    position: relative;

    .username {
      padding: 2px 8px;
      border-radius: 8px;
      margin-right: 4px;
      color: #409eff;
    }

    .content {
      // background-color: #f2f5f7;
      // padding: 12px;
      border-radius: 4px;
      margin-top: 4px;
      &:before {
        content: "";
        position: absolute;
        right: 100%;
        top: 26px;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-right: 6px solid #f2f5f7;
        border-bottom: 5px solid transparent;
      }
    }
  }
  .text,
  .image {
    max-width: 600px;
    display: inline-block;
    overflow: hidden;
    word-break: break-word;
  }
  .text {
    background-color: #f2f5f7;
    padding: 12px;
    text-align: left;
  }
  .image {
    background-color: #f2f5f7;
    height: 240px;
    width: 350px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.left {
    margin-left: 20px;
    .username {
      margin-right: 4px;
    }
  }
  &.right {
    margin-right: 20px;
    text-align: right;
    justify-content: right;
    .main {
      margin-right: 12px;
      .username {
        margin-left: 4px;
      }
      .content {
        &:before {
          content: "";
          position: absolute;
          left: 100%;
          right: 0;
          transform: rotateZ(180deg);
        }
      }
    }
  }
}
</style>
