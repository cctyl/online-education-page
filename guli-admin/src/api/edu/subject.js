import request from '@/utils/request'

export default {

  //1.获取课程信息
  getAllSubject() {
    return request({

      url: `/eduservice/subject/`,
      method: 'get',
    })
  }
}
