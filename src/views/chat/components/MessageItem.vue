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
      <div class="content-image" v-if="props.data.messageType === 'image'">
        <div class="image">
          <n-image
            object-fit="contain"
            style="height: 100%"
            :src="imgUrl + props.data.imageContent!.ftpPath"
          />
        </div>
      </div>
      <div class="content" v-else>
        <div class="text">
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
      <div class="content-image" v-if="props.data.messageType === 'image'">
        <div class="image">
          <n-image
            object-fit="contain"
            :src="imgUrl + props.data.imageContent!.ftpPath"
          />
        </div>
      </div>
      <div class="content" v-if="props.data.messageType === 'text'">
        <div class="text">
          {{ props.data.content }}
        </div>
      </div>
      <div class="content" v-if="props.data.messageType === 'auto'">
        <div class="text">
          <div class="list">
            <!-- <div class="list_title">
              {{ JSON.parse(props.data.content).name }}
            </div> -->
            <div
              class="list_item"
              v-for="item in JSON.parse(props.data.content).links"
            >
              <a class="text url" :href="item.link" target="_blank">
                {{ item.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="content" v-if="props.data.messageType === 'url'">
        <a
          class="text url"
          :href="JSON.parse(props.data.content).link"
          target="_blank"
        >
          {{ JSON.parse(props.data.content).name }}
        </a>
      </div>
    </div>
    <!-- <n-avatar shape="square" :size="48" :src="imgUrl + props.data.avatar"></n-avatar> -->
    <n-avatar :size="48" src="https://ame.cool/img/logo.png"></n-avatar>
  </div>
</template>

<script setup lang="ts">
import { reactive, shallowReactive, markRaw, defineProps, PropType } from "vue"
import { NIcon, NAvatar, NBadge, NImage, NList, NListItem } from "naive-ui"
import multiavatar from "@multiavatar/multiavatar/esm"
import moment from "dayjs"
const props = defineProps({
  data: {
    type: Object as PropType<Message>,
    default: () => [],
    required: true,
  },
})
const imgUrl = "http://192.168.0.181:90/download"
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
    .content-image,
    .content {
      position: relative;
      border-radius: 4px;
      margin-top: 4px;
    }
    .content {
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
    white-space: break-spaces;
  }

  .text {
    background-color: #f2f5f7;
    color: #fff;
    padding: 4px 8px;
    text-align: left;
    border-radius: 4px;
  }

  .image {
    background-color: #f2f5f7;
    /* height: 240px; */
    /* width: 350px; */
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;

    .n-image {
      width: 100%;
      height: 100%;
      :deep(img) {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
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
