// 获取uuid
export function uuid() {
  const s: string[] = []
  const hexDigits = "0123456789abcdef"
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = "4" // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr(((s[19] as any) & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-"

  const uuid = s.join("")
  return uuid
}

// 获取到文件类型
export const getFileType = (file: { fileName: string }) => {
  if (file && file.fileName) {
    const lastPointeIndex = file.fileName.lastIndexOf(".")
    const len = file.fileName.length
    const name = file.fileName.substring(0, lastPointeIndex)
    const type = file.fileName.substring(lastPointeIndex + 1, len)
    return {
      name,
      type,
    }
  }
  return ""
}
