import request from '@/utils/request'

export default {




  //查询所有课程一级 二级 分类
  getPlayAuth(videoId) {
    return request({

      url: `/eduvod/video/playAuth/${videoId}`,
      method:'get'

    })
  },




}
