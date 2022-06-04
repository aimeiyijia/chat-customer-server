import { ref, reactive } from "vue"
import { defineStore } from "pinia"
import cookie from "js-cookie"
const defaultUserInfo = {
  userId: "",
  username: "",
  avatar: "",
  role: "",
  tag: "",
  createTime: 0,
}
export const useUserStore = defineStore(
  "user",
  () => {
    let token = ref("")
    let userInfo = reactive<User>(defaultUserInfo)
    // 设置token
    function setToken(tokenVal: string) {
      token.value = tokenVal
    }
    // 清空token
    function clearToken() {
      token.value = ""
    }

    function setUserInfo(user: User) {
      userInfo = user
    }
    function clearUserInfo() {
      userInfo = defaultUserInfo
    }

    return {
      token,
      userInfo,
      setToken,
      clearToken,
      setUserInfo,
      clearUserInfo,
    }
  },
  {
    persist: true,
  }
)
