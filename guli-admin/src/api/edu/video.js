import request from '@/utils/request'

export default {
  //1.获取小节信息
  getVideo(id){
    return request({
      url: `/eduservice/eduvideo/${id}`,
      method: 'get',


    })
  },



  //2.添加小节信息
  saveVideo(videoInfo){
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
