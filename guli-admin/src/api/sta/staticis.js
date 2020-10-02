import request from '@/utils/request'

export default {


  getDailyCount(obj){

    return request({
      url: `/statistics/daily/${obj.begin}/${obj.end}`,
      method: 'get',
    })
  },





}

