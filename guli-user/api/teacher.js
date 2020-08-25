import request from '@/utils/request'

export default {

  //获取讲师数据
  getPageList(page, limit) {
    return request({
      url: `/eduservice/teacher/front/${page}/${limit}`,
      method: 'post'
    })
  },




}
