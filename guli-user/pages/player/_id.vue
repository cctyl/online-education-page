<template>
  <div>
    <!-- 阿里云视频播放器样式 -->
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.8/skins/default/aliplayer-min.css" />
    <script type="text/javascript" charset="utf-8" src="https://g.alicdn.com/de/prismplayer/2.8.8/aliplayer-min.js"></script>

    <div class="prism-player" id="player-con"></div>
  </div>
</template>

<script>
  import vodApi from "@/api/vod.js"

    export default {
      layout: 'video',//应用video布局
      asyncData({params, error}) {
        return   vodApi.getPlayAuth(params.id).then(response=>{
            return {playAuth: response.data.data.playAuth,videoId: params.id}
        }

        );
      },
      data(){
        return({
          playAuth:"",
          videoId:""

        })
      },
      mounted() {

        var player = new Aliplayer({
            id: "player-con",
            vid: this.videoId,
            playauth: this.playAuth,
            qualitySort: "asc",
            format: "mp4",
            mediaType: "video",
            width: "100%",
            height: "600px",
            autoplay: true,
            isLive: false,
            rePlay: false,
            playsinline: true,
            preload: true,
            controlBarVisibility: "hover",
            useH5Prism: true
          }, function (player) {
            console.log("The player is created");
          }
        );


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
