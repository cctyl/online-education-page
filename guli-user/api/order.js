import request from '@/utils/request'

export default {


  //根据课程id生成课程的购买订单
  createOrder(courseId) {
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


  //获取微信支付的二维码
  getWxPayQrCode(orderNo) {
    return request({
      url: `/orderservice/pay/wx/qr/${orderNo}`,
      method:'get'

    })
  },

  //获取订单状态，是否支付成功
  getOrderStatus(orderNo) {
    return request({
      url: `/orderservice/pay/status/${orderNo}`,
      method:'get'

    })
  },

}
