import { computed, watch, ref, reactive } from "vue"
import { defineStore } from "pinia"
import cloneDeep from "clone-deep"

import { useUserStore } from "@/store/index"
const userStore = useUserStore()
interface IChatPerson {
  chatPersons: Customer[]
  chatingPerson: Customer | null
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
        const messsages = o.messages ? assortByUseId(o.messages) : []
        return {
          ...o,
          messages: messsages,
          lastMessage: messsages[messsages.length - 1],
          unReadCount: 0,
        }
      })
    }

    // 根据chatUserId归类客户，客服消息
    function assortByUseId(messageData: Message[]): Message[] {
      const loginchatUserId = userStore.user.userInfo.chatUserId
      const chatingPerson = chat.chatingPerson
      return messageData.map((o) => {
        if (o.chatUserId === loginchatUserId) {
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
      chat.chatPersons = processRawChatData(val)
      if (!chat.chatingPerson) {
        chat.chatingPerson = chat.chatPersons[0]
      }
      console.log("人员初始化")
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
      const assortVal = assortByUseId([val])[0]
      const a = chat.chatPersons.map((o) => {
        if (
          o.chatUserId === assortVal.chatUserId ||
          o.chatUserId === assortVal.chatUserFriendId
        ) {
          o.messages.push(assortVal)
          o.lastMessage = assortVal
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
      console.log("设置聊天的人")
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
