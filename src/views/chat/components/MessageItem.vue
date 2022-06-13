<template>
  <div
    v-if="props.data.position === 'left'"
    class="message-msg left"
    @click="handleMessageClick"
  >
    <!-- <n-avatar shape="square" :size="48" :src="props.data.avatar"></n-avatar> -->
    <n-icon size="48">
      <i v-html="getAvatar(props.data.chatUserId)"></i>
    </n-icon>
    <!-- <n-avatar :size="48" src="https://ame.cool/img/logo.png"></n-avatar> -->
    <div class="main">
      <div class="time">
        <span class="username">{{ props.data.username }}</span>
        <span>{{ getFormatTime(props.data.time) }}</span>
      </div>
      <div class="content">
        <n-image
          v-if="props.data.messageType === 'image'"
          :src="imgUrl + props.data.content"
        ></n-image>
        <div class="text" v-else>
          {{ props.data.content }}
        </div>
      </div>
    </div>
  </div>
  <div v-if="props.data.position === 'center'"></div>

  <!-- 右侧一定是当前的登录人，所以头像等信息从userInfo中取 -->
  <div
    v-if="props.data.position === 'right'"
    class="message-msg right"
    @click="handleMessageClick"
  >
    <div class="main">
      <div class="time">
        <span>{{ getFormatTime(props.data.time) }}</span>
        <span class="username">{{ props.data.username }}</span>
      </div>
      <div class="content">
        <div class="image" v-if="props.data.messageType === 'image'">
          <n-image :src="imgUrl + props.data.content" />
        </div>
        <div class="text" v-else>
          {{ props.data.content }}
        </div>
      </div>
    </div>
    <!-- <n-avatar shape="square" :size="48" :src="imgUrl + props.data.avatar"></n-avatar> -->
    <n-avatar :size="48" src="https://ame.cool/img/logo.png"></n-avatar>
  </div>
</template>

<script setup lang="ts">
import { reactive, shallowReactive, markRaw, defineProps, PropType } from "vue"
import { NIcon, NAvatar, NBadge, NImage } from "naive-ui"
import multiavatar from "@multiavatar/multiavatar/esm"
import moment from "dayjs"
const props = defineProps({
  data: {
    type: Object as PropType<Message>,
    default: () => [],
    required: true,
  },
})
const imgUrl = ""
function handleMessageClick() {
  console.log(props.data)
}
function getAvatar(name: any): string {
  return multiavatar(name)
}
function getFormatTime(time: number) {
  return moment(time).format("YYYY-MM-DD HH:mm:ss")
}
</script>

<style scoped lang="scss">
.message-item-container {
  padding-top: 8px;
  padding-bottom: 8px;
}

.message-msg {
  color: #999;
  display: flex;
  margin-top: 18px;

  &:nth-last-child(1) {
    margin-bottom: 14px;
  }

  :deep .el-avatar {
    background: #f2f5f780;
    flex: 0 0 48px;
  }

  .main {
    margin-left: 12px;
    position: relative;
    width: 50%;

    .username {
      padding: 2px 8px 2px 0px;
      border-radius: 8px;
      margin-right: 4px;
    }

    .content {
      position: relative;
      border-radius: 4px;
      margin-top: 4px;

      &:before {
        content: "";
        position: absolute;
        right: 100%;
        top: 3px;
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
    color: #fff;
    padding: 8px;
    text-align: left;
    border-radius: 4px;
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

    .text {
      color: #000;
      background-color: #fff;
    }

    .content {
      &:before {
        border-right-color: #fff;
      }
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

      .text {
        background-color: #409eff;
      }

      .content {
        &:before {
          content: "";
          position: absolute;
          left: 100%;
          right: 0;
          transform: rotateZ(180deg);
          border-right-color: #409eff;
        }
      }
    }
  }
}
</style>
