<template>
  <div class="chat-input-container">
    <div class="chat-input_opera">
      <n-icon
        size="24"
        v-for="icon in operaIcons"
        color="#606266"
        :component="icon.name"
        @click=""
      />
    </div>
    <n-input
      v-model:value="message"
      type="textarea"
      :autosize="{ minRows: 4, maxRows: 4 }"
      placeholder="请输入需要发送的内容"
    />
    <div class="input_send-btn">
      <n-button secondary type="primary" @click="handleSend">发 送</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from "vue"
import { FolderOutline } from "@vicons/ionicons5"
import { NInput, NButton, NIcon } from "naive-ui"
const emits = defineEmits(["send"])
let message = ref("")
const operaIcons = [{ name: FolderOutline }]
function handleSend() {
  emits("send", message.value)
}
</script>

<style scoped lang="scss">
.chat-input-container {
  border-top: 1px solid #dadbdf;
  padding: 8px 12px;
  .chat-input_opera {
    padding-left: 10px;
  }
  ::v-deep .n-input__border,
  ::v-deep .n-input__state-border {
    display: none;
  }
  .n-input--textarea {
    --n-color: transparent !important;
    --n-caret-color: #000 !important;
    --n-border-hover: transparent !important;
    --n-border-focus: transparent !important;
    --n-color-focus: transparent !important;
  }
  .input_send-btn {
    text-align: right;
  }
}
</style>
