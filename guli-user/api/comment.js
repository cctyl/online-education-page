import request from '@/utils/request'

export default {




  //查询评论
  getCommentList(page,limit,courseId) {
    return request({

      url: `/eduservice/comment/front/${page}/${limit}/${courseId}`,
      method:'post'

    })
  },


  //添加评论
  addComment(comment) {
    return request({
      url: `/eduservice/comment/front/add`,
      method:'post',
      data: comment

    })
  },



}
