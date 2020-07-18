<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="按照模板填写">

        <el-tag>
          <i class="el-icon-download"/>
          <a :href="'/static/excel/01.xls'">点击下载模版</a>
        </el-tag>

        <el-popover

          placement="top-start"
          title="提示"
          width="200"
          trigger="hover"
          content="下载提供的模板，按照格式添加课程信息，在下方上传">

          <el-button slot="reference" circle size="mini" icon="el-icon-question"></el-button>
        </el-popover>



      </el-form-item>

      <el-form-item label="上传填写的Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/eduservice/subject/'"
          name="file"
          accept="application/vnd.ms-excel">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">上传到服务器
          </el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
  export default {
    name: "save",
    data() {
      return {

        BASE_API: process.env.BASE_API, // 接口API地址
        importBtnDisabled: false, // 按钮是否禁用,
        loading: false
      }
    },
    created() {
    },
    methods: {

      question() {

      },

      submitUpload() {
        this.fileUploadBtnText = '正在上传'
        this.importBtnDisabled = true
        this.loading = true
        this.$refs.upload.submit()
      },

      fileUploadSuccess(response) {

        this.loading=false;
        this.$message({
          type: "success",
          message: "上传成功"
        });

      },

      fileUploadError(response) {
        this.loading=false;
        this.$message({
          type: "error",
          message: "上传失败"
        });

      }
    }
  }
</script>

<style scoped>

</style>
