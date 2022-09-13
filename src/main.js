import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//数据接口
//网易云阅读 App+M 站（小说） https://apis.netstart.cn/yunyuedu

Vue.config.productionTip = false
//01.字体图标
import "./assets/font/iconfont.css"
// vant UI插件
import { Tabbar, TabbarItem,Tab,Tabs,Swipe,SwipeItem, Sticky,Image as VanImage,Rate,ShareSheet,Loading,Progress,Slider,Form,Toast, Field, Button } from 'vant';
Vue.use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Swipe).use(SwipeItem).use( Sticky ).use(VanImage).use(Rate).use(ShareSheet).use(Loading ).use(Progress).use(Slider).use(Form).use(Toast).use( Field).use( Button );


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
