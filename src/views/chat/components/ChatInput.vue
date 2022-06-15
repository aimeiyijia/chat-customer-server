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
        @positive-click="handleAfterRead"
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
import to from "await-to-js"
import base64 from "base-64"
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
import { httpUploadFile } from "@/api"
import { uuid, getFileType } from "@/utils"
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
  file: File
}
let showFiles = reactive<ShowFiles[]>([])
let showFileEditModal = ref(false)

function handleShowBadge(hoverItem: ShowFiles) {
  hoverItem.show = true
}
function handleHideBadge(hoverItem: ShowFiles) {
  hoverItem.show = false
}

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
  showFileModal.value = true
  console.log(file, "上传的文件")
  const blobFile = new Blob([file.file as File], { type: file.type as string })
  const imgUrl = window.URL.createObjectURL(blobFile)
  console.log(imgUrl)
  showFiles.push({
    type: "img",
    src: imgUrl,
    show: false,
    file: file.file as File,
  })
}

type UploadFile = {
  filename: string
  ftpPath: string
  name: string
  type: string
}
let needUploadFilesNum = 0
let successFiles: UploadFile[] = []
let failFiles: ShowFiles[] = []
async function handleAfterRead() {
  needUploadFilesNum = showFiles.length
  for (let singleFile of showFiles) {
    console.log(singleFile, "上传的文件")
    const res = await uploadFilePromise(singleFile.file)
    if (res) {
      successFiles = successFiles.concat(res)
    } else {
      failFiles.push(singleFile)
    }
  }

  const completeFilesLeg = failFiles.length + successFiles.length
  console.log(needUploadFilesNum, "需要被上传的文件")
  console.log(completeFilesLeg, "已完成的数量")
  if (completeFilesLeg === needUploadFilesNum) {
    console.log(failFiles, "上传失败的文件")
    console.log(successFiles, "成功上传的文件")
    successFiles.forEach((o) => {
      sendMessage("image", JSON.stringify(o))
    })
    // 上传成功，上传失败仅针对一次上传而言
    successFiles = []
    failFiles = []
  }
}
async function uploadFilePromise(singleFile: File) {
  const formData = new FormData()
  var params = {
    appID: "admin",
    uploadID: "",
    ftpDirPath: "/chat/" + uuid(),
  }
  formData.append("data", base64.encode(JSON.stringify(params)))
  formData.append("files", singleFile)
  const res = await httpUploadFile(formData)
  const resData = res.data
  if (resData.code === "0") {
    const file = {
      ...resData.files[0],
      ...getFileType({ fileName: resData.files[0].filename }),
    }
    console.log(file, "上传")
    return file
  }
}
function handleDelFile() {}

// 发送消息
function handleSend() {
  sendMessage("text", message.value)
}

function sendMessage(type: string, content: string) {
  const { userInfo } = userStore.user
  const userMessage = {
    chatUserId: userInfo.chatUserId,
    chatUserFriendId: chatStore.chat.chatingPerson!.chatUserId,
    sendRole: "server",
    content: content,
    messageType: type,
    time: new Date().valueOf(),
    token: userStore.user.token,
  }
  console.log(userMessage, "消息")

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
