<template>
  <div class="home">
    <!-- 头部导航 -->
    <div class="topNav">
      <div class="left" @click="isShow = !isShow">书架</div>
      <div class="containt"></div>
      <div class="right">
        <router-link
          tag="span"
          to="/search"
          class="iconfont icon-sousuo_o"
        ></router-link>
        <span class="iconfont icon-shijian"></span>
        <span class="iconfont icon-liebiao2" @click="isShow1 = !isShow1"></span>
      </div>
    </div>
    <!-- 广告页 -->
    <div class="adver" v-show="isShow2" v-if="adverList">
      <div class="adimg">
        <img :src="adverList.cover" alt="" />
      </div>
      <div class="adinfo">
        <div class="title">
          <h3>{{ adverList.title}}</h3>
          <span @click="isShow2 = false">{{ adverList.readInfo }}</span>
        </div>
        <div class="drection">
          {{ adverList.description}}
        </div>
      </div>
    </div>
    <!-- 加载 -->
    <van-loading 
    class="loading"
    size="16px"
    text-size="16px"
    text-color="#adadad"  
    v-if="!booksList"
    >Loading...</van-loading>

    <!-- 书本列表-->
    <div :class="['books', isShow2 == true ? 'fromtop' : '']">
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item, index) in booksList" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
          <div class="info">
            <h3 class="name">{{ item.title }}</h3>
            <p class="count">{{ item.author }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="tianbu"></div>
    <!-- 本地书单与书架切换 -->
    <div class="shard" v-show="isShow" @click="isShow = !isShow">
      <div class="content">
        <div class="bookmarks">
          <span class="iconfont icon-books"></span>书架
        </div>
        <router-link tag="div" to="/localbook" class="bookmarks">
          <span class="iconfont icon-shu2"></span>本地书
        </router-link>
      </div>
    </div>
    <!-- 更多 -->
    <div class="shard" v-show="isShow1" @click="isShow1 = !isShow1">
      <div class="bigbox">
        <div class="rightbox">
          <div class="item">
            <span class="iconfont icon-Import"></span>
            导入本机书籍
          </div>
          <div class="item">
            <span class="iconfont icon-piliang20px"></span>
            批量管理
          </div>
          <div class="item">
            <span class="iconfont icon-liebiaomoshi"></span>
            列表模式
          </div>
          <div class="item">
            <span class="iconfont icon-wifi"></span>
            wifi传书
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "../assets/font/iconfont.js";
export default {
  data() {
    return {
      active: 0,
      isShow: false,
      isShow1: false,
      isShow2: true,
      adverList: null, //广告页面数据
      booksList: null, //书本推荐
    };
  },
  methods: {
    changNum(key) {
      this.num = key;
      //console.log(key);
    },

    //页面跳转
    godetail(id,title){
       this.$router.push({name:'bookdetail',query:{id:id,title:title}});
    },
    //广告数据
    GuangaoDataFun() {
      axios.get("https://apis.netstart.cn/yunyuedu/shelf/banner.json").then(
        (data) => {
          this.adverList = data.data.data.banners[0];
         // console.log(this.adverList);
        }
      ).catch((err)=>{
         console.log(err)
      })
    },
    //书架推荐
    getbookData() {
      axios.get("https://apis.netstart.cn/yunyuedu/shelf/info.json").then(
        (data) => {
          this.booksList = data.data.data.list;
         // console.log(this.booksList);
        }
      ).catch((err)=>{
          console.log(err);
      });
    },
  },
  // 生命周期钩子
  created() {
    this.GuangaoDataFun();
    this.getbookData();

  },
};
</script>

<style lang="less" scoped>
.home {

  .loading {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.1);
    text-align:center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .topNav {
    width: 100%;
    height: 32px;
    line-height: 32px;
    background-color: #fff;
    display: flex;
    border-bottom: 1px solid #f7f7f7;
    z-index: 150;
    position: fixed;
    top: 0;
    .left {
      width: 40px;
      font-size: 17px;
      color: #414141;
      font-weight: bold;
      margin-left: 12px;
      position: relative;
      &::after {
        content: "";
        width: 0px;
        height: 0px;
        border: 4px solid transparent;
        border-top-color: #414141;
        position: absolute;
        left: 38px;
        top: 10px;
      }
    }
    .containt {
      flex: 1;
    }
    .right {
      .iconfont {
        font-size: 17px;
        color: #a2a2a2;
      }
      span {
        display: inline-block;
        width: 30px;
        text-align: center;
      }
    }
  }
  // 广告

  .adver {
    width: 92%;
    // height: 68px;
    margin: 40px auto 0px;
    background-color: #f7f7f7;
    display: flex;
    box-sizing: border-box;
    padding: 8px;
    .adimg {
      width: 42px;
      height: 60px;
      margin-right: 8px;
      img {
        width: 42px;
        height: 60px;
      }
    }
    .adinfo {
      .title {
        display: flex;

        h3 {
          flex: 1;
          font-size: 14px;
          font-weight: bold;
          color: #3c3c3c;
          margin-bottom: 2px;
        }
        span {
          font-size: 14px;
          color: red;
          transform: scale(0.8);
          transform-origin: 0 0;
          position: relative;
          &::after {
            content: "×";
            font-size: 18px;
            color: #040404;
            position: absolute;
            top: -2px;
            right: -18px;
          }
        }
      }
      .drection {
        font-size: 12px;
        //  transform: scale(0.8);
        //  transform-origin: 0 0;
        color: #bebebe;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 20px;
        color: #ccc;
      }
    }
  }
  .books {
    width: 100%;
    padding: 0px 14px;
    box-sizing: border-box;
    margin-top: 20px;

    ul {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      li {
        width: 28%;
        margin-bottom: 10px;
        margin-right: 23px;
        &:nth-child(3n) {
          margin-right: 0px;
        }
        .img {
          width: 100px;
          height: 138px;
          margin-bottom: 10px;
          img {
            width: 100px;
            height: 138px;
          }
        }
        .name {
          font-size: 12px;
          color: #555555;
          width: 100px;
          height: 15px;
          line-height: 15px;
          white-space: nowrap; /* 强制文本在一行中显示 */
          overflow: hidden; /* 溢出隐藏*/
          text-overflow: ellipsis; /* 文本超出后显示省略号*/
        }
        .count {
          width: 100px;
          margin-top: 17px;
          font-size: 12px;
          color: #c7c7c7;
          white-space: nowrap; /* 强制文本在一行中显示 */
          overflow: hidden; /* 溢出隐藏*/
          text-overflow: ellipsis; /* 文本超出后显示省略号*/
        }
      }
    }
  }
  .fromtop {
    margin-top: 40px;
  }
  .tianbu {
    height: 48px;
  }
  .shard {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.1);
    .content {
      width: 166px;
      height: 75px;
      border-radius: 8px;
      background-color: #fff;
      z-index: 200;
      position: relative;
      top: 40px;
      left: 6px;
      &:after {
        content: "";
        width: 0px;
        height: 0;
        border: 6px solid transparent;
        border-bottom-color: #fff;
        position: absolute;
        top: -12px;
        left: 17px;
      }
      .bookmarks {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        margin-left: 12px;
        color: #040404;
        padding-top: 4px;
        .iconfont {
          margin-right: 6px;
        }
      }
    }
    .bigbox {
      &::after {
        content: "";
        width: 0px;
        height: 0px;
        border: 6px solid transparent;
        border-bottom-color: #fff;
        position: absolute;
        top: 28px;
        right: 10px;
        z-index: 200;
      }
      .rightbox {
        width: 142px;
        height: 156px;
        background-color: #fff;
        overflow: hidden;
        border-radius: 8px;
        position: relative;
        left: 230px;
        top: 40px;
        z-index: 200;

        .item {
          width: 100%;
          height: 38px;
          line-height: 38px;
          border-bottom: 1px solid #f6f6f6;
          font-size: 12px;
          color: #272727;
          font-weight: bold;
          .iconfont {
            margin: 0px 14px 0px 12px;
          }
        }
      }
    }
  }
}
</style>