import request from '@/utils/request'
export default {

  //查询banner数据
  getListBanner() {
    return request({

      url: `/educms/bannerfront/all`,
      method: 'get'
    })
  },




}
