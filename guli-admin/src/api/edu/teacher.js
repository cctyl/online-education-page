import request from '@/utils/request'

export default {
  //1.讲师列表（条件分页查询）
  getTeacherListPage(current,limit,teacherQuery) {

    return request({
      url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      data: teacherQuery

    })
  },


  //删除讲师
  removeTeacherById(teacherId){

    return request({
      url: `/eduservice/teacher/${teacherId}`,
      method: 'delete',
    })
  },

  //添加讲师
  addTeacher(teacher){

    return request({
      url: `/eduservice/teacher/`,
      method: 'post',
      data:
        teacher

    })
  },

  //根据ID查询讲师信息
  getTeacherById(id){

    return request({
      url: `/eduservice/teacher/${id}`,
      method: 'get',


    })
  },


  //修改讲师数据
  updateTeacherInfo(teacher){

    return request({
      url: `/eduservice/teacher/${teacher.id}`,
      method: 'put',
      data:teacher

    })


  }



}

