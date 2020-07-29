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

  //4.根据课程id查询课程确认信息
  getPublishCourseInfoById(id){
    return request({

      url: `/eduservice/course/publish/${id}`,
      method: 'get',

    })

  },


  //5.最终发布课程
  publishCourseInfoById(id){
    return request({

      url: `/eduservice/course/publish/${id}`,
      method: 'put',

    })

  },


  //分页查询课程信息
  getCourseListPage(page,limit,courseQuery){

    return request({



      url: `/eduservice/course/pageCourseCondition/${page}/${limit}`,
      method: 'post',
      data: courseQuery

    })

  },

  removeCourseById(courseId){

    return request({



      url: `/eduservice/course/${courseId}`,
      method: 'delete',


    })
  }
}
