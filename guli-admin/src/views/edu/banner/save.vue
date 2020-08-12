<template>
  <div class="app-container">

    <el-form label-width="120px">
      <el-form-item label="banner标题">
        <el-input v-model="banner.title"/>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="banner.sort" controls-position="right" min='0'/>
      </el-form-item>


      <el-form-item label="banner跳转链接">
        <el-input v-model="banner.linkUrl" :rows="10" type="textarea"/>
      </el-form-item>


      <!-- 讲师头像 -->
      <el-form-item label="banner缩略图">

        <!-- 头衔缩略图 -->
        <pan-thumb :image="banner.imageUrl"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>

        <!--
          v-show：是否显示上传组件
          :key：类似于id，如果一个页面多个图片上传控件，可以做区分
          :url：后台上传的url地址
          field： 相当于 input标签中的name属性    field="file"  =   <input name="file"/>
          @close：关闭弹窗的方法
          @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileoss/uploadAvatar'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>

      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import bannerApi from '@/api/edu/banner.js'
  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'

  export default {
    components: {ImageCropper, PanThumb},
    name: "save",
    data() {

      return {

        banner: {
          id: "",
          title: '',
          sort: 0,
          linkUrl: 1,
          imageUrl: "https://online-tyl-edu.oss-cn-shenzhen.aliyuncs.com/2020/07/05/4000ca008b84444bb8687e6162f6693efile.png"
        },
        saveBtnDisabled: false,
        imagecropperShow: false,
        imagecropperKey: 0,
        BASE_API: process.env.BASE_API,

      }
    },
    created() {

      this.initPage();

    },
    watch: {
      $route(to, from) {

        this.initPage();
      }
    },

    methods: {

      close() {
        this.imagecropperShow = false;
        this.imagecropperKey++;

      },
      cropSuccess(data) {
        //拿到返回的图片地址
        this.banner.imageUrl = data.url;
        //关闭窗口
        this.close();
      },

      //页面初始化执行的方法
      initPage() {
        if (this.$route.params && this.$route.params.id) {
          this.banner.id = this.$route.params.id;
          this.getInfo(this.banner.id);
        } else {
          this.banner = {};
        }

      },

      //如果路径后有id值，点击提交就执行 更新方法
      //如果没有id值，点击提交执行 保存方法
      saveOrUpdate() {

        if (this.$route.params && this.$route.params.id) {
          console.log("执行修改方法：" + this.banner.id);
          //执行update方法
          bannerApi.updateBannerInfo(this.banner)
            .then(
              reponse => {

                this.$message({
                  message: '修改成功！',
                  type: 'success'
                });

                this.$router.push({path: '/banner/list'});
              }
            ).catch(
            error => {

              console.log(error);
            }
          );

        } else {
          console.log("执行保存方法：" + this.banner.id);

          this.saveBanner();
        }

      },

      //获取讲师数据 ，
      getInfo(id) {

        bannerApi.getBannerById(id).then(
          response => {
            this.banner = response.data.item;

          }
        ).catch(
          error => {
            console.log(error);
          }
        );
      },

      saveBanner() {
        bannerApi.addBanner(this.banner).then(
          response => {
            //提示 添加成功
            this.$confirm('添加成功，继续添加或者查看已添加数据？', '提示', {
              confirmButtonText: '查看已添加数据',
              cancelButtonText: '继续添加',
              type: 'warning'
            }).then(() => {
              this.$router.push({path: '/banner/list'})
            }).catch(() => {

            });
            //清空列表输入，用于下次添加
            this.banner = {};
          }
        ).catch(
          response => {
            this.$alert('添加失败，可能是网络故障，请稍后再试或者联系管理员', '提示', {
              confirmButtonText: '确定'

            });

            this.banner = {}
          }
        );
      }

    }
  }
</script>

<style scoped>

</style>
