<template>
  <div class="app-container">

    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" min='0'/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>


      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">

        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar"/>
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

  import teacher from "@/api/edu/teacher"
  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'

  export default {
    components: {ImageCropper, PanThumb},
    name: "save",
    data() {

      return {

        teacher: {
          id: "",
          name: '',
          sort: 0,
          level: 1,
          avatar: "https://online-tyl-edu.oss-cn-shenzhen.aliyuncs.com/2020/07/05/4000ca008b84444bb8687e6162f6693efile.png"
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
        this.teacher.avatar = data.url;
        //关闭窗口
        this.close();
      },

      //页面初始化执行的方法
      initPage() {
        if (this.$route.params && this.$route.params.id) {
          this.teacher.id = this.$route.params.id;
          this.getInfo(this.teacher.id);
        } else {
          this.teacher = {};
        }

      },

      //如果路径后有id值，点击提交就执行 更新方法
      //如果没有id值，点击提交执行 保存方法
      saveOrUpdate() {

        if (this.$route.params && this.$route.params.id) {
          console.log("执行修改方法：" + this.teacher.id);
          //执行update方法
          teacher.updateTeacherInfo(this.teacher)
            .then(
              reponse => {

                this.$message({
                  message: '修改成功！',
                  type: 'success'
                });

                this.$router.push({path: '/teacher/table'});
              }
            ).catch(
            error => {

              console.log(error);
            }
          );

        } else {
          console.log("执行保存方法：" + this.teacher.id);

          this.saveTeacher();
        }

      },

      //获取讲师数据 ，
      getInfo(id) {

        teacher.getTeacherById(id).then(
          response => {
            this.teacher = response.data.item;

          }
        ).catch(
          error => {
            console.log(error);
          }
        );
      },

      saveTeacher() {
        teacher.addTeacher(this.teacher).then(
          response => {
            //提示 添加成功
            this.$confirm('添加成功，继续添加或者查看已添加数据？', '提示', {
              confirmButtonText: '查看已添加数据',
              cancelButtonText: '继续添加',
              type: 'warning'
            }).then(() => {
              this.$router.push({path: '/teacher/table'})
            }).catch(() => {

            });
            //清空列表输入，用于下次添加
            this.teacher = {};
          }
        ).catch(
          response => {
            this.$alert('添加失败，可能是网络故障，请稍后再试或者联系管理员', '提示', {
              confirmButtonText: '确定'

            });

            this.teacher = {}
          }
        );
      }

    }
  }
</script>

<style scoped>

</style>
