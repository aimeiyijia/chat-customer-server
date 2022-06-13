import { ref, reactive } from "vue"
import { defineStore } from "pinia"
import cookie from "js-cookie"
const defaultUserInfo = {
  chatUserId: "",
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
      cookie.set("token", tokenVal, { expires: 3 })
    }
    // 清空token
    function clearToken() {
      user.token = ""
      cookie.set("token", "")
    }

    function setUserInfo(val: User) {
      user.userInfo = val
      cookie.set("user", val, { expires: 3650 })
    }
    function clearUserInfo() {
      user.userInfo = defaultUserInfo
      cookie.set("user", "")
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
