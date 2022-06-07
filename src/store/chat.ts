import { computed, watch, ref, reactive } from "vue"
import { defineStore } from "pinia"
import cloneDeep from "clone-deep"

import { useUserStore } from "@/store/index"
const userStore = useUserStore()
interface IChatPerson {
  originalChatPersons: Customer[]
  chatPersons: Customer[]
  chatingPerson: Customer | null
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

    // watch(
    //   () => chat.originalChatPersons,
    //   (val) => {
    //     chat.chatPersons = processRawChatData(val)
    //     // 当前聊天的人不存在就默认取聊天列表的第一位
    //     if (!chat.chatingPerson) {
    //       chat.chatingPerson = chat.chatPersons[0]
    //     }
    //   },
    //   {
    //     deep: true,
    //   }
    // )

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

    // 根据userId归类客户，客服消息
    function assortByUseId(userData: Message[]): Message[] {
      const loginUserId = userStore.user.userInfo.userId
      const chatingPerson = chat.chatingPerson
      return userData.map((o) => {
        if (o.userId === loginUserId) {
          Object.assign(o, userStore.user.userInfo)
          o.position = "right"
        } else {
          o.position = "left"
          Object.assign(o, chatingPerson)
        }
        return o
      })
    }

    function setChatPersons(val: Customer[]) {
      // chat.originalChatPersons = val
      chat.chatPersons = processRawChatData(val)
      if (!chat.chatingPerson) {
        chat.chatingPerson = chat.chatPersons[0]
      }
    }

    function addChatPerson(val: Customer) {
      // 数据量少的时候性能差距不大，第二种方式更简洁一些
      // chat.chatPersons = chat.chatPersons.concat(processRawChatData([val]))
      chat.chatPersons = [...chat.chatPersons, ...processRawChatData([val])]
    }

    // 如果是当前激活的聊天对象发来的消息，那么直接渲染上屏
    // 如果不是 除上屏外（不可见）还需将未读标志位加一
    function updateChatMessage(val: Message) {
      const a = chat.chatPersons.map((o) => {
        if (o.userId === val.userId || o.userId === val.friendId) {
          o.messages.push(val)
          o.lastMessage = val
          if (
            chat.chatingPerson &&
            chat.chatingPerson.userId !== val.userId &&
            chat.chatingPerson.userId !== val.friendId
          ) {
            ;(o.unReadCount as number)++
          }
        }
        return o
      })
      chat.chatPersons = a
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
