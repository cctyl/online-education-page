<template>
  <div class="cart py-container">
    <!--主内容-->
    <div class="checkout py-container  pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt"><span class="success-icon"></span><span class="success-info">订单提交成功，请您及时付款！订单号：{{payInfo.out_trade_no}}</span>
        </h4>
        <span class="fr"><em class="sui-lead">应付金额：</em><em class="orange money">￥{{payInfo.total_fee}}</em></span>
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin">微信支付</div>
        <div class="fl sao">
          <p class="red">请使用微信扫一扫。</p>
          <div class="fl code">
            <qriously :value="payInfo.code_url" :size="338"/>
            <div class="saosao">
              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
            </div>

          </div>

        </div>
        <div class="clearfix"></div>
        <!-- <p><a href="pay.html" target="_blank">> 其他支付方式</a></p> -->

      </div>
    </div>
  </div>
</template>

<script>

  import orderApi from "@/api/order.js"

  export default {
    data() {
      return ({
        payInfo: {
          course_id: "",
          out_trade_no: "",
          code_url: "",
          total_fee: 1,
          result_code: ""
        },
        orderNo: '',
        timer: '',

      })
    }, created() {
      if (this.$route.params && this.$route.params.pid) {

        this.orderNo = this.$route.params.pid;

        this.getQRCode();
      }
    },
    mounted() {
      //页面加载完成后
      this.timer = setInterval(() => {
        this.getOrderStatus();
      }, 3000);
    },
    methods: {
      //拿到微信支付二维码
      getQRCode() {
        orderApi.getWxPayQrCode(this.orderNo).then(
          response => {

            this.payInfo = response.data.data;
          }
        ).catch(
          response => {
            console.log("getQRCode出错：" + response);
          }
        );


      },

      //获取订单支付状态
      getOrderStatus() {
        orderApi.getOrderStatus(this.orderNo).then(
          response => {

            if (response.data.data.status==true) {
              //如果支付成功，清除定时器
              clearInterval(this.timer);
              this.$message({
                type: 'success',
                message: '支付成功!'
              })
              //跳转到课程详情页面观看视频
              this.$router.push({path: '/course/' + this.payInfo.course_id})
            }

          }
        ).catch(
          response => {
            console.log("getQRCode出错：" + response);
          }
        );

      }


    }


  }
</script>

<style scoped>

</style>
