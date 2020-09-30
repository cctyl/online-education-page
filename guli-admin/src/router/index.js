import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import Test from '../views/login/index.vue'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]

  },
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/table',
    name: '讲师管理',
    meta: {title: '讲师管理', icon: 'example'},
    children: [
      {
        path: 'table',
        name: '讲师列表',
        component: () => import('@/views/edu/teacher/list'),
        meta: {title: '讲师列表', icon: 'table'}
      },
      {
        path: 'save',
        name: '添加讲师',
        component: () => import('@/views/edu/teacher/save'),
        meta: {title: '添加讲师', icon: 'tree'}
      },
      {
        path: 'edit/:id',
        name: '编辑讲师',
        component: () => import('@/views/edu/teacher/save'),
        meta: {title: '编辑讲师', noCache: true},
        hidden: true
      }

    ]
  },

  {
    path: '/statistics/daily',
    component: Layout,
    redirect: '/statistics/daily/chart',
    name: 'Statistics',
    meta: { title: '统计分析', icon: 'chart' },
    children: [
      {
        path: 'chart',
        name: 'StatisticsDailyChart',
        component: () => import('@/views/staticis/chart'),
        meta: { title: '统计图表' }
      }
    ]
  },
  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '课程分类',
    meta: {title: '课程分类', icon: 'nested'},
    children: [
      {
        path: 'list',
        name: '分类列表',
        component: () => import('@/views/edu/subject/list'),
        meta: {title: '分类列表', icon: 'table'}
      },
      {
        path: 'save',
        name: '添加分类',
        component: () => import('@/views/edu/subject/save'),
        meta: {title: '添加分类', icon: 'table'}
      }


    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: 'Course',
    meta: {title: '课程管理', icon: 'form'},
    children: [
      {
        path: 'list',
        name: 'EduCourseList',
        component: () => import('@/views/edu/course/list'),
        meta: {title: '课程列表'}
      },
      {
        path: 'info',
        name: 'EduCourseInfo',
        component: () => import('@/views/edu/course/info'),
        meta: {title: '发布课程'}
      },
      {
        path: 'info/:id',
        name: 'EduCourseInfoEdit',
        component: () => import('@/views/edu/course/info'),
        meta: {title: '编辑课程基本信息', noCache: true},
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: 'EduCourseChapterEdit',
        component: () => import('@/views/edu/course/chapter'),
        meta: {title: '编辑课程大纲', noCache: true},
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'EduCoursePublishEdit',
        component: () => import('@/views/edu/course/publish'),
        meta: {title: '发布课程', noCache: true},
        hidden: true
      }
    ]
  },


  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/list',
    name: 'Banner',
    meta: {title: 'Banner管理', icon: 'form'},
    children: [
      {
        path: 'list',
        name: 'banner列表',
        component: () => import('@/views/edu/banner/list'),
        meta: {title: 'banner列表', icon: 'table'}
      },
      {
        path: 'save',
        name: '添加banner',
        component: () => import('@/views/edu/banner/save'),
        meta: {title: '添加banner', icon: 'tree'}
      },
      {
        path: 'edit/:id',
        name: '编辑banner',
        component: () => import('@/views/edu/banner/save'),
        meta: {title: '编辑banner', noCache: true},
        hidden: true
      }
    ]
  },


  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
