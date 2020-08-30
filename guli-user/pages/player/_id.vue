<template>
  <div>
    <!-- 阿里云视频播放器样式 -->
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css" />
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css" />
    <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js"></script>

    <!-- 定义播放器dom -->
    <div  class="prism-player" id="J_prismPlayer"></div>
  </div>
</template>

<script>
  import vodApi from "@/api/vod.js"

    export default {
      layout: 'video',//应用video布局
      data(){
        return({
          playAuth:"",
          videoId:""

        })
      },
      mounted() {

        var player = new Aliplayer({
          id: 'J_prismPlayer',
          width: '100%',
          autoplay: true,

          //播放方式二：点播用户推荐
          vid :this.videoId ,
          playauth : this.playAuth  ,
          cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png',
          encryptType:1, //当播放私有加密流时需要设置。

        },function(player){
          console.log('播放器创建好了。')
        });
      },
      created() {
        if (this.$route.params && this.$route.params.id) {

          this.videoId = this.$route.params.id;
          this.getPlayAuth();
        }
      },
      methods:{

        getPlayAuth(){
          vodApi.getPlayAuth(this.videoId).then(
            response=>{
             this.playAuth =  response.data.data.playAuth;
            }
          );
        }
      }

    }
</script>

<style scoped>

</style>
