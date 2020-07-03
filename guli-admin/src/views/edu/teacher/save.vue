<template>
  <div class="app-container">
    讲师添加
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

      <!-- 讲师头像：TODO -->

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import teacher from "@/api/edu/teacher"

  export default {
    name: "save",
    data() {

      return {

        teacher: {
          id: "",
          name: '',
          sort: 0,
          level: 1,
        },
        saveBtnDisabled: false

      }
    },
    created() {

      if (this.$route.params && this.$route.params.id){
        this.teacher.id= this.$route.params.id;
        this.getInfo(this.teacher.id);
      }

    },

    methods: {

      //如果路径后有id值，点击提交就执行 更新方法
      //如果没有id值，点击提交执行 保存方法
      saveOrUpdate() {

        if (this.teacher.id!=""){
          //执行update方法
          teacher.updateTeacherInfo(this.teacher)
          .then(
            reponse=>{

              this.$message({
                message: '修改成功！',
                type: 'success'
              });

              this.$router.push({path:'/teacher/table'});
            }
          ).catch(
            error=>{

              console.log(error);
            }
          );

        }else {

          this.saveTeacher();
        }

      },

      //获取讲师数据 ，
      getInfo(id){

        teacher.getTeacherById(id).then(
          response=>{
           this.teacher= response.data.item;

          }

        ).catch(
          error=>{
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
