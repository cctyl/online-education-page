import request from '@/utils/request'

export default {

  //1.获取章节信息
  getAllChapterVideo(courseId) {
    return request({

      url: `/eduservice/chapter/${courseId}`,
      method: 'get',

    })
  },

  //2.添加章节信息
  saveChapter(courseInfo){
    return request({

      url: `/eduservice/chapter/`,
      method: 'post',
      data: courseInfo

    })
  },

  //3.删除章节信息
  deleteChapter(id){
    return request({

      url: `/eduservice/chapter/${id}`,
      method: 'delete',


    })
  },


  //4.修改章节信息
  updateChapter(courseInfo){
    return request({

      url: `/eduservice/chapter/`,
      method: 'put',
      data: courseInfo


    })
  },

}
