<template>
  <div class="bar-func-container">
    <div class="func_avatar">
      <n-avatar
        color="#000"
        :size="48"
        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
        fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
    </div>
    <div class="func_chat">
      <n-badge
        color="#F56C6C"
        :value="icon.count"
        :max="99"
        v-for="icon in chatIcons"
      >
        <n-icon
          size="28"
          :component="icon.name"
          :color="icon.activated ? '#409EFF' : '#ffffffe6'"
          @click="handleSetIconActive(icon.type)"
        />
      </n-badge>
    </div>
    <div class="func_opera">
      <n-icon size="30" color="#ffffffe6">
        <cog-sharp />
      </n-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, markRaw } from "vue"
import { NIcon, NAvatar, NBadge, NImage } from "naive-ui"
import {
  CogSharp,
  ChatbubblesOutline,
  DocumentAttachOutline,
} from "@vicons/ionicons5"
import { useChatStore } from "@/store/chat"
const chatStore = useChatStore()

let unTotalRead = ref(0)
watch(
  () => chatStore.chat.chatPersons,
  (val) => {
    unTotalRead.value = 0
    val.forEach((o) => {
      unTotalRead.value =
        unTotalRead.value + (o.noReadCount ? o.noReadCount : 0)
    })
    console.log(unTotalRead, "所有的未读消息")
  },
  {
    deep: true,
    immediate: true,
  }
)

const chatIcons = reactive([
  {
    name: markRaw(ChatbubblesOutline),
    type: "chat",
    count: unTotalRead,
    activated: true,
  },
  { name: markRaw(DocumentAttachOutline), type: "doc", activated: false },
])
function handleSetIconActive(type: string) {
  for (const icon of chatIcons) {
    console.log(icon)
    icon.activated = false
    if (icon.type === type) {
      icon.activated = true
    }
  }
}
</script>

<style lang="scss" scoped>
.bar-func-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 0 0 70px;
  background-color: #000;
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
    margin-top: 16px;

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
