import { computed, watch, ref, reactive } from "vue"
import { defineStore } from "pinia"
import cloneDeep from "clone-deep"

interface IChatPerson {
  originalChatPersons: Customer[]
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
    })

    const chatingPerson = ref<Customer>(defaultChatingPerson)

    const chatPersons = computed(() => {
      return processRawChatData(chat.originalChatPersons)
    })

    watch(
      chatPersons,
      (val) => {
        console.log(val, "更新哈哈哈")
        chatingPerson.value = val[0]
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
      chatingPerson.value = val
    }

    function clearChatingPerson() {
      chatingPerson.value = defaultChatingPerson
    }

    return {
      chat,
      chatPersons,
      chatingPerson,
      setChatPersons,
      addChatPerson,
      clearChatPerson,
      setChatingPerson,
      clearChatingPerson,
    }
  },
  {
    persist: true,
  }
)
