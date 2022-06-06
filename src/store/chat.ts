import { computed, watch, ref, reactive } from "vue"
import { defineStore } from "pinia"
import cloneDeep from "clone-deep"

interface IChatPerson {
  originalChatPersons: Customer[]
  chatingPerson: Customer
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
      chatingPerson: defaultChatingPerson,
    })

    // const chatingPerson = ref<Customer>(defaultChatingPerson)

    const chatPersons = computed(() => {
      return processRawChatData(chat.originalChatPersons)
    })

    watch(
      chatPersons,
      (val) => {
        console.log(val, "更新哈哈哈")
        chat.chatingPerson = val[0]
      },
      {
        immediate: true,
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

    function updateChatUnread() {}

    function clearChatPerson() {
      chat.originalChatPersons = []
    }

    function setChatingPerson(val: Customer) {
      chat.chatingPerson = val
    }

    function clearChatingPerson() {
      chat.chatingPerson = defaultChatingPerson
    }

    function updateMessage(val: Message) {}

    return {
      chat,
      chatPersons,
      setChatPersons,
      addChatPerson,
      clearChatPerson,
      setChatingPerson,
      clearChatingPerson,
      updateMessage,
    }
  },
  {
    persist: true,
  }
)
