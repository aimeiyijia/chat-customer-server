import { computed, watch, ref, reactive } from "vue"
import { defineStore } from "pinia"
import cloneDeep from "clone-deep"
import omit from "object.omit"

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
        const lastMessage = o.lastMessage
          ? o.lastMessage
          : messsages[messsages.length - 1]
        return {
          ...o,
          messages: messsages,
          noReadCount: o.noReadCount ? o.noReadCount : 0,
          lastMessage,
        }
      })
    }

    function setChatPersons(val: Customer[]) {
      chat.chatPersons = processRawChatData(val)
      if (!chat.chatingPerson) {
        setChatingPerson(chat.chatPersons[0])
      }
      console.log("人员初始化", chat.chatPersons)
    }

    function addChatPerson(val: Customer) {
      // 数据量少的时候性能差距不大，第二种方式更简洁一些
      // chat.chatPersons = chat.chatPersons.concat(processRawChatData([val]))
      chat.chatPersons = [...chat.chatPersons, ...processRawChatData([val])]
      // 此时没有当前接待的人，说明客服是第一次分配到客户
      // 那么就将第一次分配的客户设为当前接待人
      if (!chat.chatingPerson) {
        setChatingPerson(chat.chatPersons[0])
      }
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
          o.lastMessage = assortVal
          o.messages.push(assortVal)
          if (
            chat.chatingPerson &&
            chat.chatingPerson.chatUserId !== assortVal.chatUserId &&
            chat.chatingPerson.chatUserId !== assortVal.chatUserFriendId
          ) {
            o.noReadCount++
          }
        }
        return o
      })
      console.log(a, "新消息被加入")
      chat.chatPersons = a
    }

    function setUnreadToRead(user: User) {
      console.log(user, "123456")
      chat.chatPersons.forEach((o) => {
        if (o.chatUserId === user.chatUserId) {
          console.log(user, "设为已读的人")
          o.noReadCount = 0
        }
      })
    }

    function clearChatPerson() {
      chat.chatPersons = []
    }

    function setChatingPerson(val: Customer) {
      // 去掉messages, lastMessage是为了减轻localStorge存储压力
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
      setUnreadToRead,
    }
  },
  {
    persist: true,
  }
)
