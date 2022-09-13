<template>
  <div class="classity">

    <router-link tag="div" to="/search" class="search" >
      <span class="iconfont icon-sousuo1"></span>
    </router-link>
    <van-tabs v-model="active" @click="setOne">
      <van-tab :title="item.name" v-for="(item, index) in action" :key="index">
        <van-sticky :offset-top="-10">
       <div class="tables"> 
         <span
          class="xuan"
          :class="currIndex == t ? 'active' : ''"
          @click="getpublisData(i.url, t)"
          v-for="(i, t) in item.cates"
          :key="t"
          >{{ i.name }}</span
        >
       </div>
        </van-sticky>
        <ul>
          <li @click="godetail(item.id,item.title)" v-for="(item, index) in allList" :key="index">
            <div class="img">
              <img :src="item.cover" alt="" />
            </div>
            <div class="title">{{ item.title }}</div>
            <div class="author">{{ item.author }}</div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
    <div class="tian"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      active: 0,
      action: null,
      allList: [], //所有的数据
      currIndex: 0,
    };
  },
  methods: {

     //页面跳转
     godetail(id,title){
       this.$router.push({
        name:'bookdetail',
        query:{
            id:id,
            title:title
        }
       })
     },

    getData() {
      axios
        .get("https://apis.netstart.cn/yunyuedu/mergedCategroy.json")
        .then((result) => {
          //console.log(result);
          this.action = result.data;
           this.setOne();
        });
       
    },

    getpublisData(urls, t) {
      //https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json?catId=7
      ///source/v2/cat.json?catId=11
      axios
        .get(
          "https://apis.netstart.cn/yunyuedu/" +
            urls.replaceAll("cat.json", "searchBook.json")
        )
        .then((result) => {
          
          this.allList = result.data.list;
          this.currIndex = t;
        });
    },

    setOne() {
      //console.log(this.action[this.active].cates[this.currIndex]);
      let urls = this.action[this.active].cates[this.currIndex].url.replaceAll(
        "cat.json",
        "searchBook.json"
      );
      this.getpublisData(urls, 0);
    },
  },
  created() {
    this.getData();
   
  },
};
</script>

<style lang="less">

 .classity{
 
//tab更改样式
.van-tabs--line .van-tabs__wrap {
    height: 44px;
    width: 50%;
}
.van-tabs__line {
   height: 0px;
}
.van-tab--active {
    color: #323233;
    font-weight: 600;
    font-size: 18px;
}
//顶部搜索按钮
 .search {
   width: 46px;
   height: 44px;
   text-align: center;
   line-height: 44px;
   z-index: 200;
   position: absolute;
   right: 0px;
   top: 0px;
     .iconfont {
        font-size: 20px;
     }
 }



.tian {
  height: 40px;
}
.xuan {
  padding: 0px 8px;
  margin: 6px 6px 0px;
  text-align: center;
  display: inline-block;
  border-radius: 6px;
}
.tables {
     padding: 6px 0px;
     background-color: #f5f5f5;
     margin: 10px 0px;
}
.xuan.active {
  background-color: #dee1e6;
  color: #222222;
}

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  li {
    width: calc(100% / 3 - 16px);
    padding: 10px 0;
    box-sizing: border-box;
    .img {
      img {
        width: 100%;
      }
    }
    .title {
      font-size: 14px;
      color: #222222;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-top: 6px;
    }
    .author {
      margin-top: 6px;
      font-size: 12px;
      color: #afafaf;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
 }
</style>