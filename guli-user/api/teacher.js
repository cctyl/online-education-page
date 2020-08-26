import request from '@/utils/request'

export default {

  //获取讲师列表数据
  getPageList(page, limit) {
    return request({
      url: `/eduservice/teacher/front/${page}/${limit}`,
      method: 'post'
    })
  },


  //获取讲师详情以及所讲课程
  getTeacherInfo(teacherId) {
    return request({
      url: `/eduservice/teacher/front/info/${teacherId}`,
      method: 'get'
    })
  },

}
