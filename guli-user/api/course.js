import request from '@/utils/request'

export default {

  //获取课程列表数据
  getPageList(page, limit,courseQuesy) {
    return request({

      url: `/eduservice/course/front/${page}/${limit}`,
      method: 'post',
      data: courseQuesy
    })
  },


  //查询所有课程一级 二级 分类
  getCourseSubject() {
    return request({

      url: `/eduservice/subject/`,
      method:'get'

    })
  },

}
