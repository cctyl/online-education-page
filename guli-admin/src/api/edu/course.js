import request from '@/utils/request'

export default {

  //1.添加课程
  saveCourse(courseInfo) {
    return request({

      url: `/eduservice/course/`,
      method: 'post',
      data: courseInfo
    })
  },

  //2.修改课程信息
  updateCourseInfo(courseInfo,id){
    return request({


    url: `/eduservice/course/${id}`,
      method: 'put',
      data: courseInfo
    })

  },

  //3.根据课程id查询课程信息
  getCourseInfoById(id){
    return request({


      url: `/eduservice/course/${id}`,
      method: 'get',

    })

  },
}
