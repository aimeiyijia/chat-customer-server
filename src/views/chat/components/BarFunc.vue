<template>
  <div class="bar-func-container">
    <div class="func_avatar">
      <n-avatar
        color="#000"
        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
        fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
    </div>
    <div class="func_chat">
      <n-badge
      color="#fb7299"
        :value="icon.count"
        :max="99"
        v-for="icon in chatIcons"
        :key="icon.name"
      >
        <n-icon
          size="28"
          :component="icon.name"
          :color="icon.activated ? '#80b9f2' : '#5c5c5c'"
          @click="handleSetIconActive(icon.type)"
        />
      </n-badge>
    </div>
    <div class="func_opera">
      <n-icon size="30" color="#5c5c5c">
        <cog-sharp />
      </n-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, shallowReactive, markRaw } from "vue";
import { NIcon, NAvatar, NBadge, NImage } from "naive-ui";
import {
  CogSharp,
  ChatbubblesOutline,
  DocumentAttachOutline,
} from "@vicons/ionicons5";

const chatIcons = reactive([
  {
    name: markRaw(ChatbubblesOutline),
    type: "chat",
    count: 123,
    activated: true,
  },
  { name: markRaw(DocumentAttachOutline), type: "doc", activated: false },
]);
function handleSetIconActive(type) {
  for (const icon of chatIcons) {
    console.log(icon);
    icon.activated = false;
    if (icon.type === type) {
      icon.activated = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.bar-func-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 0 0 80px;
  background-color: #fff;
  border-right: 1px solid #e0e1e6;
  .func_avatar,
  .func_chat,
  .func_opera {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .func_chat {
    flex-grow: 1;
    justify-content: flex-start;
    display: flex;
    flex-direction: column;

    .n-badge + .n-badge {
      margin-top: 18px;
    }
  }
  .func_avatar {
    flex: 0 0 100px;
  }
  .func_opera {
    flex: 0 0 64px;
  }
}
</style>