import request from '@/utils/request'

export default {


  getAllBanner(){

    return request({
      url: `/educms/bannerfront/all`,
      method: 'get',
    })
  },


  getBannerListPage(current,limit) {

    return request({
      url: `/educms/banneradmin/${current}/${limit}`,
      method: 'get',


    })
  },


  //删除
  removeBannerById(id){

    return request({
      url: `/educms/banneradmin/${id}`,
      method: 'delete',
    })
  },

  //添加
  addBanner(banner){

    return request({
      url: `/educms/banneradmin/`,
      method: 'post',
      data: banner

    })
  },

  //根据ID查询信息
  getBannerById(id){

    return request({
      url: `/educms/banneradmin/${id}`,
      method: 'get',


    })
  },


  //修改
  updateBannerInfo(banner){

    return request({
      url: `/educms/banneradmin/`,
      method: 'put',
      data:banner

    })


  }



}

