import request from '@/utils/request'

export default {

  //1.获取章节信息
  getAllChapterVideo(courseId) {
    return request({

      url: `/eduservice/chapter/${courseId}`,
      method: 'get',

    })
  }
}
