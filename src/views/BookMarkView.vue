<template>
  <div class="bookmark">
    <!-- 头部导航 搜索 -->
    <div class="markNav">
      <div class="icont">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xingbienan"></use>
        </svg>
      </div>
      <router-link tag="div" to="/search" class="search">
        <input type="text" placeholder="你想找的"/>
        <span class="iconfont icon-sousuo1"></span>
      </router-link>
    </div>

    <!-- 选项卡UI插件 -->
    <van-tabs v-model="active" sticky>
      <van-tab title="精选">
       <!-- 组件 -->
      <jselect-com></jselect-com>
      </van-tab>
      <van-tab title="免费">
        <!-- 免费组件 -->
        <free-com></free-com>
      </van-tab>
      <van-tab title="男生">
        <!-- 男生组件 -->
         <boy-com></boy-com>
      </van-tab>
      <van-tab title="女生">
        <!-- 女生组件 -->
       <girl-com></girl-com>
      </van-tab>
      <van-tab title="出版">
        <!-- 出版组件 -->
        <publish-com></publish-com>
      </van-tab>
      <van-tab title="听书">
        <!-- 听书组件 -->
        <listen-com></listen-com>
      </van-tab>
    </van-tabs>
   
  </div>
</template>

<script src="./iconfont.js"></script>
<script>
//精选组件
import "../assets/font/iconfont.js";
import JselectCom from "../components/Classify/JselectCom.vue";
import FreeCom from "../components/Classify/FreeCom.vue";
import BoyCom from "../components/Classify/BoyCom.vue";
import GirlCom from "../components/Classify/GirlCom.vue";
import PublishCom from "../components/Classify/PublishCom.vue";
import ListenCom from "../components/Classify/ListenCom.vue";

export default {
  data() {
    return {
     active: 0,
    }
  },
   methods:{
     
   },
   created(){
     
   },
   components:{
       JselectCom,
       FreeCom,
       BoyCom,
       GirlCom,
       PublishCom,
       ListenCom
   }
};
</script>

<style lang="less">
.bookmark {
  width: 100%;
  min-height: 100%;
  .markNav {
    width: 100%;
    height: 30px;
    line-height: 30px;
    display: flex;
    padding-top: 6px;
    background-color:#f7f7f7 ;
    padding-bottom: 10px;
   
    .icon {
      margin: 0px 12px;
    }
    .search {
      width: 83.7%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 14px;
       display: flex;
      background-color: #fff;
      margin-right: 18px;
      input {
        flex: 1;
        border: 0px;
        border-style: none;
        border-radius: 14px;
        display: block;
        text-indent: 14px;
        color: #aeaeae;
        caret-color:transparent
      }
      .iconfont {
        width: 20px;
        height: 30px;
        display: block;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        color: #c8c8c8;
        margin-right: 6px;
      }
    }
  }
// 选项卡插件
.van-tabs__nav {
    background-color: #f7f7f7;
}
.van-tabs__line {
    position: absolute;
    bottom: 26px;
    left: 0;
    z-index: 1;
    width: 14px;
    height: 3px;
    background-color: #ee0a24;
    border-radius: 3px;
}
 
}


//   字体图标
.icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>