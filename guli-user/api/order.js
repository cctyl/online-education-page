import request from '@/utils/request'

export default {


  //查询所有课程一级 二级 分类
  getOrderId(courseId) {
    return request({

      url: `/orderservice/order/create/${courseId}`,
      method:'post'

    })
  },

  // 根据订单id查询订单信息
  getOrderInfo(orderId) {
    return request({

      url: `/orderservice/order/${orderId}`,
      method:'get'

    })
  },



}
