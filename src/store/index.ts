import { ref, reactive } from "vue"
import { defineStore } from "pinia"
type UserStore = {
  token: string
  userInfo: User | null
}
export const useUserStore = defineStore(
  "user",
  () => {
    let user = reactive<UserStore>({
      token: "",
      userInfo: null,
    })
    // 设置token
    function setToken(tokenVal: string) {
      user.token = tokenVal
    }
    // 清空token
    function clearToken() {
      user.token = ""
    }

    function setUserInfo(val: User) {
      user.userInfo = val
    }
    function clearUserInfo() {
      user.userInfo = null
    }

    return {
      user,
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
