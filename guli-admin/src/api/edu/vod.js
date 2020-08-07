import request from '@/utils/request'

export default {



  //1.删除阿里云中的视频
  deleteVod(id){
    return request({

      url: `/eduvod/video/${id}`,
      method: 'delete',


    })
  },




}
