// 所有好友的好友信息
interface FriendGather {
  [chatUserId: string]: Customer
}

interface Customer {
  chatUserId: string
  username: string
  avatar?: string
  role: string
  tag?: string
  messages: Message[] | any[]
  createTime?: number
  lastMessage?: Message | null
  unReadCount?: number
}

// 用户与好友关联表
interface UserMap {
  chatUserFriendId: string
  chatUserId: string
}

// 好友消息
interface Message {
  chatUserId: string
  chatUserFriendId: string
  content: string
  messageType: MessageType
  time: number
  position: string
  type?: string
  avatar: string, 
  username: string
}

interface SendMessage {
  type: string
  message: string | File
  width?: number
  height?: number
  messageType: MessageType[0] | MessageType[1]
}

// 消息类型
declare enum MessageType {
  text = "text",
  image = "image",
}

// 图片尺寸
interface ImageSize {
  width: number
  height: number
}

// 服务端返回值格式
interface ServerRes {
  code: number
  msg: string
  data: any
}

// 所有群的在线用户合集
interface ActiveGroupUser {
  [key: string]: {
    [key: string]: User
  }
}

// 未读消息对象
interface UnReadGather {
  [key: string]: number
}

// 获取群分页消息参数
interface PagingParams {
  groupId?: string
  chatUserId?: string
  chatUserFriendId?: string
  current: number
  pageSize: number
}

// 群分页消息返回值
interface PagingResponse {
  messageArr: GroupMessage[]
  userArr: User[]
}
