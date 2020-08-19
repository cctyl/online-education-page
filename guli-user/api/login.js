import request from '@/utils/request'

export default {

  //用户登陆
  userLogin(user) {
    return request({

      url: `/educenter/member/login`,
      method: 'post',
      data: user
    })
  },

//根据token获取用户信息
  getUserInfoByToken() {

    return request({

      url: `/educenter/member/info`,
      method: 'get',

    })
  }


}
