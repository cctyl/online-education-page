<template>
  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>


    <el-container>
      <el-aside width="100px"></el-aside>
      <el-main>

        <el-button style="text-align: right" @click="openSaveChapterDialog()" type="primary">添加章节</el-button>
        <!-- 章节 -->
        <ul class="chanpterList">
          <li
            v-for="chapter in chapterNestedList"
            :key="chapter.id">
            <p>
              {{ chapter.title }}

              <span class="acts">
                <el-button type="text">添加课时</el-button>
                <el-button style="" type="text" @click="openUpdateChapterDialog(chapter)">编辑</el-button>
                <el-button type="text" @click="deleteChapter(chapter.id)">删除</el-button>
            </span>
            </p>

            <!-- 视频 -->
            <ul class="chanpterList videoList">
              <li
                v-for="video in chapter.children"
                :key="video.id">
                <p>{{ video.title }}
                  <span class="acts">
                        <el-button type="text">编辑</el-button>
                        <el-button type="text">删除</el-button>
                    </span>
                </p>
              </li>
            </ul>
          </li>
        </ul>

      </el-main>
    </el-container>
    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialog.dialogChapterFormVisible" :title="dialog.title">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate(dialog.flag)">确 定</el-button>
      </div>
    </el-dialog>


    <el-form label-width="120px">

      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import chapter from "@/api/edu/chapter";

  let id = 1000;
  export default {
    name: "chapter",
    data() {
      return ({

        saveBtnDisabled: false,
        updateChapterFormVisible: false,
        courseId: '',
        chapterNestedList: [],

        chapter: {// 章节对象
          title: '',
          sort: 0
        },
        dialog: {
          dialogChapterFormVisible: false, //是否显示章节表单
          flag: true, //true 表示添加章节   false表示修改章节
          title: "", //对话框的标题
        },

      })
    },
    created() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
        this.getChapertViodeByCourseId();
      }


    },
    methods: {

      getChapertViodeByCourseId() {
        chapter.getAllChapterVideo(this.courseId).then(
          result => {
            if (result.code == 20000) {
              this.chapterNestedList = result.data.list;
            }
          }
        );

      },
      previous() {
        this.$router.push(({path: '/course/info/' + this.courseId}))
      },
      next() {

        this.$router.push(({path: '/course/publish/' + this.courseId}))

      },

      //执行保存或者执行修改
      saveOrUpdate(flag) {
        console.log("对话框用途标记：" + flag);
        if (flag == true) {
          //添加章节信息
          //执行保存方法
          console.log("执行保存方法");
        } else {
          //修改章节信息
          //执行修改方法
          console.log("执行修改方法");
          this.updateChapterInfo();

        }
      },

      //开启添加章节的对话框
      openSaveChapterDialog() {
        this.dialog.dialogChapterFormVisible = true;
        this.dialog.flag = true;
        this.dialog.title = "添加章节信息";
      },

      //开启修改章节信息的对话框
      openUpdateChapterDialog(chapter) {
        this.dialog.dialogChapterFormVisible = true;
        this.dialog.flag = false;
        this.dialog.title = "修改章节信息";
        this.chapter = chapter;
      },

      //修改章节
      updateChapterInfo() {
        chapter.updateChapter(this.chapter).then(
          result => {

            //关闭对话框
            this.dialog.dialogChapterFormVisible = false;
            //提示信息
            this.$message({
              type: "success",
              message: "章节信息修改成功"
            });
            this.chapter.title="";
            this.chapter.sort="";

            //刷新页面
            this.getChapertViodeByCourseId();

          }
        );
      },


      //删除章节
      deleteChapter(id){

        this.$confirm('确定删除这个章节吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          chapter.deleteChapter(id).then(
            result => {
              if (result.code==20000){
                //提示信息
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                //刷新页面
                this.getChapertViodeByCourseId();

              }else {
                //提示信息
                this.$message({
                  type: "error",
                  message: "删除失败"
                });
              }

            }
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },


      /*
      //弹出并且回显章节信息表单
      alertUpdateDialog(chapter){

        this.chapter = chapter;

        this.updateChapterFormVisible = true;
      },


      }*/

    }
  }
</script>

<style scoped>
  .chanpterList {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .chanpterList li {
    position: relative;
  }

  .chanpterList p {
    float: left;
    font-size: 15px;
    margin: 10px 0;
    padding: 10px;
    height: 70px;
    line-height: 50px;
    width: 100%;
    border: 1px solid #DDD;
  }

  .chanpterList .acts {
    float: right;
    font-size: 14px;
  }

  .videoList {
    padding-left: 50px;
  }

  .videoList p {
    float: left;
    font-size: 14px;
    margin: 10px 0;
    padding: 10px;
    height: 50px;
    line-height: 30px;
    width: 100%;
    border: 1px dotted #DDD;
  }

</style>
