<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">首页</a>
        \
        <a href="#" title class="c-999 fsize14">课程列表</a>
        \
        <span class="c-333 fsize14">{{ course.subjectLevelOne }}</span>
        \
        <span class="c-333 fsize14">{{ course.subjectLevelTwo }}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section class="p-h-video-box" id="videoPlay">
            <img :src="course.cover" :alt="course.title" class="dis c-v-pic">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24" v-text="course.title"></span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size:24px;">￥<span v-text="course.price"></span></b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">主讲：<span v-text="course.teacherName"></span></span>
            </section>
            <section class="c-attr-mt of">
              <span class="ml10 vam">
                <em class="icon18 scIcon"></em>
                <a class="c-fff vam" title="收藏" href="#">收藏</a>
              </span>
            </section>
            <section class="c-attr-mt">
              <a v-if="course.price==0 || course.buyStatus" href="#view" title="立即观看" class="comm-btn c-btn-3">立即观看</a>
              <a v-if="!course.buyStatus"  title="立即购买" @click.prevent="createOrder()" class="comm-btn c-btn-3">立即购买</a>
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol clearfix">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br>
                <h6 class="c-fff f-fM mt10" v-text="course.buyCount+10"></h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br>
                <h6 class="c-fff f-fM mt10" v-text="course.lessonNum"></h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br>
                <h6 class="c-fff f-fM mt10" v-text="course.viewCount"></h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="course.description">

                      </p>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲<a name="view"></a></span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li class="lh-menu-stair" v-for="chapter in chapterList" :key="chapter.id">
                            <a href="javascript: void(0)" :title="chapter.title" class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"></em>{{chapter.title}}
                            </a>
                            <ol class="lh-menu-ol" style="display: block;">
                              <li class="lh-menu-second ml30" v-for="video in chapter.children" :key="video.id">
                                <a :href="'/player/'+video.videoSourceId+'-'+course.id" title>
                                  <span class="fr">
                                    <i class="free-icon vam mr10">免费试听</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{video.title}}
                                </a>
                              </li>

                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a href="#">
                        <img :src="course.avatar" width="50" height="50" alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" :href="'/teacher/'+course.teacherId" v-text="course.teacherName"></a>
                    </section>

                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
        <h6 class="c-c-content c-infor-title" id="i-art-comment">
          <span class="commentTitle">课程评论</span>
        </h6>
        <section class="lh-bj-list pr mt20 replyhtml">
          <ul>
            <li class="unBr">
              <aside class="noter-pic">
                <img width="50" height="50" class="picImg" src="~/assets/img/avatar-boy.gif">
              </aside>
              <div class="of">
                <section class="n-reply-wrap">
                  <fieldset>
                    <textarea name="" v-model="comment.content" placeholder="输入您要评论的文字" id="commentContent"></textarea>
                  </fieldset>
                  <p class="of mt5 tar pl10 pr10">
                    <span class="fl "><tt class="c-red commentContentmeg" style="display: none;"></tt></span>
                    <input type="button" @click="addComment()" value="回复" class="lh-reply-btn">
                  </p>
                </section>
              </div>
            </li>
          </ul>
        </section>
        <section class="">
          <section class="question-list lh-bj-list pr">
            <ul class="pr10">
              <li v-for="(comment,index) in data.items" v-bind:key="index">
                <aside class="noter-pic">
                  <img width="50" height="50" class="picImg" :src="comment.avatar">
                </aside>
                <div class="of">
                    <span class="fl">
                    <font class="fsize12 c-blue">
                      {{comment.nickname}}</font>
                    <font class="fsize12 c-999 ml5">评论：</font></span>
                </div>
                <div class="noter-txt mt5">
                  <p>{{comment.content}}</p>
                </div>
                <div class="of mt5">
                  <span class="fr"><font class="fsize12 c-999 ml5">{{comment.gmtCreate}}</font></span>
                </div>
              </li>

            </ul>
          </section>
        </section>

        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)">首</a>
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(data.current-1)">&lt;</a>
            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)">{{ page }}</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(data.current+1)">&gt;</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="末页"
              @click.prevent="gotoPage(data.pages)">末</a>
            <div class="clear"/>
          </div>
        </div>
        <!-- 公共分页 结束 -->

      </div>





    </section>
    <!-- /课程详情 结束 -->



  </div>
</template>

<script>
  import courseApi from "@/api/course.js"
  import commentApi from "@/api/comment.js"
  import orderApi from "@/api/order.js"



  export default {
    data() {
      return ({
        data: {},
        page: 1,
        limit: 4,
        total: 10,
        comment: {
          content: '',
          courseId: '',
          teacherId: ''


        },
        course: {
          id: "",
          title: "",
          price: "",
          buyStatus:""

        },
        chapterList: []

      })
    },
    created() {

      if (this.$route.params && this.$route.params.id) {

        this.course.id = this.$route.params.id;
        debugger
        this.getCourseDetail();
        this.getComment();
      }
    },
    methods: {

      createOrder(){
        orderApi.createOrder(this.course.id).then(
          response =>{
            var orderId = response.data.data.orderId;
            this.$router.push({path:'/orders/'+orderId});
          }
        ).catch(
          reason => {

            this.$router.push({path:'/login'});

          }
        );

      },
      //获取课程信息
      getCourseDetail() {

        courseApi.getCourseDetail(this.course.id).then(response => {

          this.course = response.data.data.course;
          this.chapterList = response.data.data.chapterVoList;

          debugger
        });
      },

      //获取课程评论
      getComment() {

        commentApi.getCommentList(this.page, this.limit, this.course.id).then(
          response => {

            this.data = response.data.data;
          }
        );
      },

      //评论分页跳转
      gotoPage(page) {


        commentApi.getCommentList(page, this.limit, this.course.id).then(
          response => {

            this.data = response.data.data;
          }
        );
      },

      //添加评论
      addComment() {
        this.comment.teacherId = this.course.teacherId;
        this.comment.courseId = this.course.id;
        commentApi.addComment(this.comment).then(response => {
          if (response.data.success) {
            this.comment.content = ''
            this.getComment();
          }
        })
      },


    }

  };
</script>
