import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView'

import BookMarkView from '../views/BookMarkView'
import ClassityView from '../views/ClassityView'
import HostView from '../views/HostView'
import bookDetaView from '../views/BookDetaView'
import ReadView from '../views/ReadView'

Vue.use(VueRouter)

const routes = [

  {
    path: "/",
    redirect: "/home",
    meta:{
      TabBarShow:true
    }
  },
  //首页
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta:{
      TabBarShow:true,
      
    }
  },
  //书城
  {
    path: '/bookmark',
    name: 'bookmark',
    component: BookMarkView,
    meta:{
      TabBarShow:true,
     
    }
  },
  //分类
  {
    path: '/clssityfy',
    name: 'clssityfy',
    component: ClassityView,
    meta:{
      TabBarShow:true,
      
    }
  },
  //个人主页
  {
    path: '/host',
    name: 'host',
    component: HostView,
    meta:{
      TabBarShow:true
    }
  },
// 书本详情
 {
   path:'/bookdetail',
   name:'bookdetail',
   component:bookDetaView,
   meta:{
     TabBarShow:false
   }
 },
  //阅读页面
  {
    path: '/read',
    name: 'read',
    component: ReadView,
    meta:{
      TabBarShow:false
    }
  },
  //注册
  {
    path: '/regin',
    name: 'regin',
    component: () => import("../components/base/ReginCom.vue"),
    meta:{
      TabBarShow:false
    }
  },
  //登录
  {
    path: '/login',
    name: 'login',
    component: () => import("../components/base/LoginCom.vue"),
    meta:{
      TabBarShow:false
    }
  },
  //精选组件
  {
    path: '/jselect',
    name: 'jselect',
    component: () => import("../components/Classify/JselectCom.vue"),
    meta:{
      TabBarShow:true
    }
  },
  //免费组件
  {
    path: '/free',
    name: 'free',
    component: () => import("../components/Classify/FreeCom.vue"),
    meta:{
      TabBarShow:true
    }
  },
  //男生组件
  {
    path: '/boys',
    name: 'boys',
    component: () => import("../components/Classify/BoyCom.vue"),
    meta:{
      TabBarShow:true
    }
  },
  //女生组件
  {
    path: '/girl',
    name: 'girl',
    component: () => import("../components/Classify/GirlCom.vue"),
    meta:{
      TabBarShow:true
    }
  },
  //出版组件
  {
    path: '/publish',
    name: 'publish',
    component: () => import("../components/Classify/PublishCom.vue"),
    meta:{
      TabBarShow:true
    }
  },
  //听书组件
  {
    path: '/listen',
    name: 'listen',
    component: () => import("../components/Classify/ListenCom.vue"),
    meta:{
      TabBarShow:true
    }
  },
  //搜索组件
  {
    path: '/search',
    name: 'search',
    component: () => import("../components/base/SearchCom.vue"),
    meta:{
      TabBarShow:false
    }
  },
   //本地书
   {
    path: '/localbook',
    name: 'localbook',
    component: () => import("../components/base/LocadbookCom.vue"),
    meta:{
      TabBarShow:false
    },
      // 独享路由守卫
      beforeEnter:(to,from,next)=>{
        let login = window.localStorage.getItem("token");
        // 判断是否登录
        if(login!=200){
          next("/login");
          return;
        }else{
          next();
        }
      }
  },


]

// 解决router重复点击报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router