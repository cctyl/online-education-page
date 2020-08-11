import request from '@/utils/request'

export default {

  //查询所有讲师
  getAllBanner(){

    return request({
      url: `/educms/bannerfront/all`,
      method: 'get',
    })
  },

  //1.讲师列表（条件分页查询）
  getBannerListPage(current,limit) {

    return request({
      url: `/educms/banneradmin/${current}/${limit}`,
      method: 'get',


    })
  },


  //删除讲师
  removeBannerById(id){

    return request({
      url: `/educms/banneradmin/${id}`,
      method: 'delete',
    })
  },

  //添加讲师
  addBanner(banner){

    return request({
      url: `/educms/banneradmin/`,
      method: 'post',
      data: banner

    })
  },

  //根据ID查询讲师信息
  getBannerById(id){

    return request({
      url: `/educms/banneradmin/${id}`,
      method: 'get',


    })
  },


  //修改讲师数据
  updateBannerInfo(banner){

    return request({
      url: `/educms/banneradmin/`,
      method: 'put',
      data:banner

    })


  }



}

