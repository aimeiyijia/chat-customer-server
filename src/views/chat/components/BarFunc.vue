<template>
  <div class="bar-func-container">
    <div class="func_avatar">
      <n-image
        width="40"
        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
      />
    </div>
    <div class="func_chat">
      <n-icon
        size="30"
        v-for="icon in chatIcons"
        :key="icon.name"
        :component="icon.name"
        :color="icon.activated ? '#36ad6a' : '#ffffff'"
        @click="handleSetIconActive(icon.type)"
      ></n-icon>
    </div>
    <div class="func_opera">
      <n-icon size="30" color="#ffffff">
        <cog-sharp />
      </n-icon>
    </div>
  </div>
</template>

<script setup>
import { reactive, shallowReactive, markRaw } from "vue";
import { NIcon, NImage } from "naive-ui";
import {
  CogSharp,
  ChatbubblesOutline,
  DocumentAttachOutline,
} from "@vicons/ionicons5";

const chatIcons = reactive([
  { name: markRaw(ChatbubblesOutline), type: "chat", activated: true },
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
  flex: 0 0 60px;
  background-color: #2e2e2e;
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
    flex-shrink: 1;
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
    .n-icon + .n-icon {
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