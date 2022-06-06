import { computed, watch, ref, reactive } from "vue"
import { defineStore } from "pinia"
import cloneDeep from "clone-deep"

interface IChatPerson {
  originalChatPersons: Customer[]
  chatPersons: Customer[]
  chatingPerson: Customer | null
}

const defaultChatingPerson = {
  userId: "",
  username: "",
  role: "customer",
  messages: [],
}

export const useChatStore = defineStore(
  "chat",
  () => {
    let chat = reactive<IChatPerson>({
      // 原始的聊天列表
      originalChatPersons: [],
      chatPersons: [],
      chatingPerson: null,
    })

    watch(
      () => chat.originalChatPersons,
      (val) => {
        chat.chatPersons = processRawChatData(val)
        // 当前聊天的人不存在就默认取聊天列表的第一位
        if (!chat.chatingPerson) {
          chat.chatingPerson = chat.chatPersons[0]
        }
      },
      {
        deep: true,
      }
    )

    function processRawChatData(chatData: Customer[]): Customer[] {
      return cloneDeep(chatData).map((o: Customer): Customer => {
        return {
          ...o,
          messages: o.messages ? o.messages : [],
          lastMessage: o.messages ? o.messages[o.messages.length - 1] : null,
          unReadCount: 0,
        }
      })
    }

    function setChatPersons(val: Customer[]) {
      chat.originalChatPersons = val
    }

    function addChatPerson(val: Customer) {
      chat.originalChatPersons.push(val)
    }

    function clearChatPerson() {
      chat.originalChatPersons = []
    }

    function setChatingPerson(val: Customer) {
      chat.chatingPerson = val
    }

    function clearChatingPerson() {
      chat.chatingPerson = null
    }
    // 如果是当前激活的聊天对象发来的消息，那么直接渲染上屏
    // 如果不是 除上屏外（不可见）还需将未读标志位加一
    function updateChatMessage(val: Message) {
      const a = chat.chatPersons.map((o) => {
        if (o.userId === val.userId) {
          o.messages.push(val)
          if (chat.chatingPerson && chat.chatingPerson.userId !== val.userId) {
            ;(o.unReadCount as number)++
          }
        }
        return o
      })
      chat.chatPersons = a
    }

    return {
      chat,
      setChatPersons,
      addChatPerson,
      clearChatPerson,
      setChatingPerson,
      clearChatingPerson,
      updateChatMessage,
    }
  },
  {
    persist: true,
  }
)
