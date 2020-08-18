import request from '@/utils/request'

export default {

  //用户注册
  userRegister(user) {
    return request({

      url: `/educenter/member/register`,
      method: 'post',
      data: user
    })

  },


  //获取验证码
  getCode(phone) {
    return request({

      url: `/edumsm/msm/send/${phone}`,
      method: 'get',

    })

  },


}
