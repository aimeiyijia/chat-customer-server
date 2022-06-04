import Vue from "vue"
import to from "await-to-js"
import { AxiosResponse } from "axios"

// 处理所有后端返回的数据
export async function processReturn(reqFn: any): Promise<any> {
  const [err, res] = await to<AxiosResponse>(reqFn)
  // code 0:成功 1:错误 2:后端报错
  const { code, msg, data } = res!.data
  if (code) {
    window.$message.error(msg)
    return
  }
  if (msg) {
    window.$message.success(msg)
  }
  if (err) {
    console.log(err, "接口请求出错")
  }
  return data
}
