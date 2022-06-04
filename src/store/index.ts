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
type UserStore = {
  token: string
  userInfo: User
}
export const useUserStore = defineStore(
  "user",
  () => {
    let user = reactive<UserStore>({
      token: "",
      userInfo: defaultUserInfo,
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
      user.userInfo = defaultUserInfo
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
