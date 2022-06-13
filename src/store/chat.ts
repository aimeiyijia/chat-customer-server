import { computed, watch, ref, reactive } from "vue"
import { defineStore } from "pinia"
import cloneDeep from "clone-deep"
import omit from "object.omit"

import { useUserStore } from "@/store/index"
const userStore = useUserStore()
interface IChatPerson {
  chatPersons: Customer[]
  chatingPerson: Omit<Customer, "messages" | "lastMessage"> | null
}

export const useChatStore = defineStore(
  "chat",
  () => {
    let chat = reactive<IChatPerson>({
      chatPersons: [],
      chatingPerson: null,
    })

    function processRawChatData(chatData: Customer[]): Customer[] {
      return cloneDeep(chatData).map((o: Customer): Customer => {
        const messsages = o.messages ? o.messages : []
        return {
          ...o,
          messages: messsages,
          unReadCount: 0,
        }
      })
    }

    function setChatPersons(val: Customer[]) {
      chat.chatPersons = processRawChatData(val)
      if (!chat.chatingPerson) {
        chat.chatingPerson = chat.chatPersons[0]
      }
      console.log("人员初始化", chat.chatPersons)
    }

    function addChatPerson(val: Customer) {
      // 数据量少的时候性能差距不大，第二种方式更简洁一些
      // chat.chatPersons = chat.chatPersons.concat(processRawChatData([val]))
      chat.chatPersons = [...chat.chatPersons, ...processRawChatData([val])]
      console.log("人员新增")
    }

    // 如果是当前激活的聊天对象发来的消息，那么直接渲染上屏
    // 如果不是 除上屏外（不可见）还需将未读标志位加一
    function updateChatMessage(val: Message) {
      const assortVal = val
      const a = chat.chatPersons.map((o) => {
        if (
          o.chatUserId === assortVal.chatUserId ||
          o.chatUserId === assortVal.chatUserFriendId
        ) {
          o.messages.push(assortVal)
          if (
            chat.chatingPerson &&
            chat.chatingPerson.chatUserId !== assortVal.chatUserId &&
            chat.chatingPerson.chatUserId !== assortVal.chatUserFriendId
          ) {
            ;(o.unReadCount as number)++
          }
        }
        return o
      })
      chat.chatPersons = a
      console.log("新人")
    }

    function clearChatPerson() {
      chat.chatPersons = []
    }

    function setChatingPerson(val: Customer) {
      console.log("设置聊天的人", omit(val, ["messages", "lastMessage"]))
      chat.chatingPerson = omit(val, ["messages", "lastMessage"])
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
