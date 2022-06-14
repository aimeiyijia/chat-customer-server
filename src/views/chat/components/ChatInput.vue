<template>
  <div class="chat-input-container">
    <div class="chat-input_opera">
      <n-upload
        :headers="{
          'naive-info': 'hello!',
        }"
        :data="{
          'naive-data': 'cool! naive!',
        }"
        accept="image/*"
        :multiple="true"
        :max="9"
        :show-file-list="false"
        :custom-request="customRequest"
      >
        <n-icon size="24" color="#606266" :component="FolderOutline" />
      </n-upload>
      <n-modal
        v-model:show="showFileModal"
        preset="dialog"
        class="send-before-confirm"
        positive-text="确认"
        negative-text="取消发送"
        :close-on-esc="false"
        :mask-closable="false"
      >
        <template #header>
          <div>发送前的操作</div>
        </template>
        <div class="file-list-in-dialog">
          <n-space :size="16">
            <div
              class="single-file"
              v-for="item in showFiles"
              @mouseenter="handleShowBadge(item)"
              @mouseleave="handleHideBadge(item)"
            >
              <n-badge processing type="info" :show="item.show">
                <template #value>
                  <n-icon size="18" :component="ColorWandOutline" />
                  <n-icon size="18" :component="TrashOutline" />
                </template>
                <n-image :src="item.src" />
              </n-badge>
            </div>
          </n-space>
        </div>
      </n-modal>
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
    <n-modal
      v-model:show="showFileEditModal"
      preset="dialog"
      class="send-before-confirm"
      title="图片编辑"
      positive-text="确认"
      negative-text="取消"
      :close-on-esc="false"
      :mask-closable="false"
    >
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw, reactive } from "vue"
import {
  FolderOutline,
  CloseCircleOutline,
  TrashOutline,
  ColorWandOutline,
} from "@vicons/ionicons5"
import {
  NInput,
  NButton,
  NIcon,
  NUpload,
  NModal,
  NImage,
  NSpace,
  NBadge,
  useMessage,
  UploadCustomRequestOptions,
} from "naive-ui"
import socketIo from "@/socket"
import { useUserStore } from "@/store/index"
import { useChatStore } from "@/store/chat"
const userStore = useUserStore()
const chatStore = useChatStore()
const emits = defineEmits(["send"])
let message = ref("")
let showFileModal = ref(false)

type ShowFiles = {
  type: string
  src: string
  show: boolean
}
let showFiles = reactive<ShowFiles[]>([])
let showFileEditModal = reactive<Boolean>(true)

const messageUI = useMessage()
const customRequest = ({
  file,
  data,
  headers,
  withCredentials,
  action,
  onFinish,
  onError,
  onProgress,
}: UploadCustomRequestOptions) => {
  const formData = new FormData()
  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(
        key,
        data[key as keyof UploadCustomRequestOptions["data"]]
      )
    })
  }
  showFileModal.value = true
  console.log(file, "上传的文件")
  const blobFile = new Blob([file.file], { type: file.type })
  const imgUrl = window.URL.createObjectURL(blobFile)
  console.log(imgUrl)
  showFiles.push({
    type: "img",
    src: imgUrl,
    show: false,
  })
  formData.append(file.name, file.file as File)
}

function handleShowBadge(hoverItem: ShowFiles) {
  hoverItem.show = true
}
function handleHideBadge(hoverItem: ShowFiles) {
  hoverItem.show = false
}
// 发送消息
function handleSend() {
  emits("send", message.value)
  const { userInfo } = userStore.user
  const userMessage = {
    chatUserId: userInfo.chatUserId,
    chatUserFriendId: chatStore.chat.chatingPerson!.chatUserId,
    sendRole: "server",
    content: message.value,
    messageType: "text",
    time: new Date().valueOf(),
    token: userStore.user.token,
  }
  console.log(userMessage, "消息")

  console.log(socketIo, "hahha")

  socketIo._socket.emit("CustomerMessage", userMessage)
}
</script>

<style scoped lang="scss">
.chat-input-container {
  border-top: 1px solid #dadbdf;
  padding: 8px 12px;
  .chat-input_opera {
    padding-left: 10px;
    .n-icon {
      cursor: pointer;
    }
    .n-icon + .n-icon {
      margin-left: 12px;
    }
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
