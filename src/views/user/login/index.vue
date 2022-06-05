<template>
  <div class="page">
    <div class="container">
      <div class="left">
        <div class="login" @click="handleChangeLoginType">
          <n-badge :value="finalLoginType" color="#409EFF"> Server </n-badge>
        </div>
        <div class="eula">
          <span>全渠道整合对话</span>
          <br />
          <span>全时段自动接待</span>
          <br />
          <span>访客信息获取</span>
        </div>
      </div>
      <div class="right">
        <svg viewBox="0 0 320 300">
          <defs>
            <linearGradient
              id="linearGradient"
              x1="13"
              y1="193.49992"
              x2="307"
              y2="193.49992"
              gradientUnits="userSpaceOnUse"
            >
              <stop style="stop-color: #409eff" offset="0" id="stop876" />
              <stop style="stop-color: #409eff" offset="1" id="stop878" />
            </linearGradient>
          </defs>
          <path
            d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143"
          />
        </svg>
        <div class="form">
          <label for="username">用户名</label>
          <input
            type="text"
            id="username"
            placeholder="请输入用户名"
            v-model="loginForm.username"
          />
          <label for="password">密码</label>
          <input
            type="password"
            id="password"
            placeholder="请输入密码"
            v-model="loginForm.password"
          />
          <input
            type="submit"
            id="submit"
            value="Submit"
            @click="handleLogin"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from "vue"
import { AddOutline } from "@vicons/ionicons5"
import { NIcon, NBadge } from "naive-ui"
import anime, { AnimeInstance } from "animejs"
import { useUserStore } from "@/store/index"
import { useRouter } from "vue-router"
import { processReturn } from "@/http/utils"
import { login } from "@/api"
const router = useRouter()
const userStore = useUserStore()
onMounted(() => {
  nextTick(function () {
    let current: AnimeInstance
    document
      .querySelector("#username")!
      .addEventListener("focus", function (e) {
        if (current) current.pause()
        current = anime({
          targets: "path",
          strokeDashoffset: {
            value: 0,
            duration: 700,
            easing: "easeOutQuart",
          },
          strokeDasharray: {
            value: "240 1386",
            duration: 700,
            easing: "easeOutQuart",
          },
        })
      })
    document
      .querySelector("#password")!
      .addEventListener("focus", function (e) {
        if (current) current.pause()
        current = anime({
          targets: "path",
          strokeDashoffset: {
            value: -336,
            duration: 700,
            easing: "easeOutQuart",
          },
          strokeDasharray: {
            value: "240 1386",
            duration: 700,
            easing: "easeOutQuart",
          },
        })
      })
    document.querySelector("#submit")!.addEventListener("focus", function (e) {
      if (current) current.pause()
      current = anime({
        targets: "path",
        strokeDashoffset: {
          value: -730,
          duration: 700,
          easing: "easeOutQuart",
        },
        strokeDasharray: {
          value: "530 1386",
          duration: 700,
          easing: "easeOutQuart",
        },
      })
    })
  })
})

let loginType = ref("login")
function handleChangeLoginType() {
  if (loginType.value === "login") {
    loginType.value = "register"
  } else {
    loginType.value = "login"
  }
}
const finalLoginType = computed(() => {
  return loginType.value === "login" ? "⇋ 登录" : "⇋ 注册"
})

let loginForm = {
  username: "我是客服",
  password: "1",
  platform: "server",
}

async function handleLogin() {
  const res = await processReturn(login(loginForm))
  console.log(res, "返回值")
  if (res) {
    const { token, user } = res
    userStore.setToken(token)
    userStore.setUserInfo(user)
    console.log(userStore.user, "状态")
    router.push({ name: "Chat" })
  }
}
</script>

<style scoped lang="scss">
::placeholder {
  font-size: 0.7em;
}
::selection {
  background: #2d2f36;
}
::-webkit-selection {
  background: #2d2f36;
}
::-moz-selection {
  background: #2d2f36;
}

.page {
  background: #e2e2e5;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: absolute;
  place-content: center;
  width: 100%;
}
@media (max-width: 767px) {
  .page {
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
}
.container {
  display: flex;
  height: 320px;
  margin: 0 auto;
  width: 640px;
}
@media (max-width: 767px) {
  .container {
    flex-direction: column;
    height: 630px;
    width: 320px;
  }
}
.left {
  background: white;
  height: calc(100% - 40px);
  top: 20px;
  position: relative;
  width: 50%;
}
@media (max-width: 767px) {
  .left {
    height: 100%;
    left: 20px;
    width: calc(100% - 40px);
    max-height: 270px;
  }
}
.login {
  font-size: 50px;
  font-weight: 900;
  margin: 38px 40px 40px;
  cursor: pointer;
}
.eula {
  color: #999;
  font-size: 14px;
  line-height: 1.5;
  margin: 40px;
  span {
    display: inline-block;
    margin: 4px 0;
  }
}
.right {
  background: #474a59;
  box-shadow: 0px 0px 40px 16px rgba(0, 0, 0, 0.22);
  color: #f1f1f2;
  position: relative;
  width: 50%;
}
@media (max-width: 767px) {
  .right {
    flex-shrink: 0;
    height: 100%;
    width: 100%;
    max-height: 350px;
  }
}
svg {
  position: absolute;
  width: 320px;
}
path {
  fill: none;
  stroke: url(#linearGradient);
  stroke-width: 4;
  stroke-dasharray: 240 1386;
}
.form {
  margin: 40px;
  position: absolute;
}
label {
  color: #c2c2c5;
  display: block;
  font-size: 14px;
  height: 16px;
  margin-top: 20px;
  margin-bottom: 5px;
}
input {
  background: transparent;
  border: 0;
  color: #f2f2f2;
  font-size: 18px;
  height: 30px;
  line-height: 30px;
  outline: none !important;
  width: 100%;
}
input::-moz-focus-inner {
  border: 0;
}

#username,
#password {
  font-size: 14px;
}
#submit {
  color: #707075;
  margin-top: 40px;
  transition: color 300ms;
}
#submit:focus {
  color: #f2f2f2;
}
#submit:active {
  color: #d0d0d2;
}
</style>
