import request from '@/utils/request'

export default {



  //2.添加小节信息
  saveChapter(videoInfo){
    return request({
      url: `/eduservice/eduvideo/`,
      method: 'post',
      data: videoInfo

    })
  },

  //3.删除小节信息
  deleteVideo(id){
    return request({

      url: `/eduservice/eduvideo/${id}`,
      method: 'delete',


    })
  },


  //4.修改章节信息
  updateChapter(videoInfo){
    return request({

      url: `/eduservice/eduvideo/`,
      method: 'put',
      data: videoInfo


    })
  },

}
