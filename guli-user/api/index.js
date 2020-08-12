import request from '@/utils/request'
export default {

  //查询banner数据
  getIndexData() {
    return request({
      url: `/eduservice/indexfront/index`,
      method: 'get'
    })
  },




}
