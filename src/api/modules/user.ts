import fetch from '@/http';

/**
 * 客服注册
 * @param params
 */
 export const httpRegister = (params: any) => {
  return fetch.post(`/broke/chatUser/register`, {
    ...params,
  });
};
/**
 * 客户，客服登录
 * @param params
 */
 export const httpLogin = (params: any) => {
  return fetch.post(`/broke/chatUser/login`, {
    ...params,
  });
};


/**
 * 更新用户名
 * @param params
 */
export const patchUserName = (params: User) => {
  return fetch.patch(`/user/username`, {
    ...params,
  });
};

/**
 * 更新用户密码
 * @param user
 * @param password
 *
 */
export const patchPassword = (user: User, password: string) => {
  return fetch.patch(`/user/password?password=${password}`, {
    ...user,
  });
};

/**
 * 用户名模糊搜索用户
 * @param username
 */
export function getUsersByName(username: string) {
  return fetch.get(`/user/findByName?username=${username}`);
}

/**
 * 用户头像上传
 * @param params
 */
export function setUserAvatar(params: FormData) {
  return fetch.post(`/user/avatar`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * 删除用户
 * @param params
 */
export function deleteUser(params: any) {
  return fetch.delete(`/user`, { params: params });
}
