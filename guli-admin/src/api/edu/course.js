import request from '@/utils/request'

export default {

  //1.添加课程
  saveCourse(courseInfo) {
    return request({

      url: `/eduservice/course/`,
      method: 'post',
      data: courseInfo
    })
  }
}
