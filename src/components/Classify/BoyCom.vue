<template>
  <div class="boycom">
    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe class="my-swipe" indicator-color="white">
        <van-swipe-item v-for="(item,index) in boybanner" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 重磅推荐 -->
    <div class="boylikebook" v-if="hotRecomm">
      <h2>{{hotRecomm.name}}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item,index) in hotRecomm.list" :key="index">
          <div class="bookbox">
            <div class="bookimg">
              <img :src="item.cover" alt="" />
            </div>
            <div class="bookinfo">
              <h3>{{item.title}}</h3>
              <p class="name">{{item.author}}/{{item.category}}</p>
              <div class="drection">
               {{item.content}}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
   <!-- 一周热文 -->
    <div class="boylikebook" v-if="hotbooks">
      <h2>{{hotbooks.name}}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item,index) in hotbooks.list" :key="index">
          <div class="bookbox">
            <div class="bookimg">
              <img :src="item.cover" alt="" />
            </div>
            <div class="bookinfo">
              <h3>{{item.title}}</h3>
              <p class="name">{{item.author}}/{{item.category}}</p>
              <div class="drection">
               {{item.content}}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
   <!-- 读者喜爱 -->
    <div class="boylikebook" v-if="likebooks">
      <h2>{{likebooks.name}}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item,index) in likebooks.list" :key="index">
          <div class="bookbox">
            <div class="bookimg">
              <img :src="item.cover" alt="" />
            </div>
            <div class="bookinfo">
              <h3>{{item.title}}</h3>
              <p class="name">{{item.author}}/{{item.category}}</p>
              <div class="drection">
               {{item.content}}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

        <!-- 人气风云榜 -->
    <div class="hotpopuler" v-if="windcloulist">
      <h2>{{windcloulist.name}}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item,index) in windcloulist.list" :key="index">
          <div class="hotpuler">
            <div :class="'one'+(index+1)"></div>
            <div class="hotimg">
              <img :src="item.cover" alt="" />
            </div>
            <h4>{{item.title}}</h4>
            <p>{{item.clickCount}}点击</p>
          </div>
        </li>
      </ul>
      <p class="more">查看更多 <span class="iconfont icon-gengduo1"></span></p>
    </div>

     <!-- 口碑力荐 -->
    <div class="boylikebook" v-if="goodrecom">
      <h2>{{goodrecom.name}}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item,index) in goodrecom.list" :key="index">
          <div class="bookbox">
            <div class="bookimg">
              <img :src="item.cover" alt="" />
            </div>
            <div class="bookinfo">
              <h3>{{item.title}}</h3>
              <p class="name">{{item.author}}/{{item.category}}</p>
              <div class="drection">
               {{item.content}}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    
         <!-- 完结榜 -->
    <div class="hotpopuler" v-if="overlist">
      <h2>{{overlist.name}}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item,index) in overlist.list" :key="index">
          <div class="hotpuler">
            <div :class="'one'+(index+1)"></div>
            <div class="hotimg">
              <img :src="item.cover" alt="" />
            </div>
            <h4>{{item.title}}</h4>
          </div>
        </li>
      </ul>
      <p class="more">查看更多 <span class="iconfont icon-gengduo1"></span></p>
    </div>

     <div class="tian"></div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
     return {
        boybanner:[],//轮播图
        hotRecomm:[],//重磅推荐
        hotbooks:[],//一周热文
        likebooks:[],//读者喜爱
        windcloulist:[],//风云榜
        goodrecom:[],//口碑力荐
        overlist:[],//完结榜
     }
  },
  methods:{
    
         //页面跳转
    godetail(id,title){
       this.$router.push({name:'bookdetail',query:{id:id,title:title}});
    },

   
     getDate(){
         axios.get("https://apis.netstart.cn/yunyuedu/store/show.json?type=male&uuid=ca03da7b64ca443ab25ec3b662fa91e2").then((result)=>{
             //console.log(result)

             this.boybanner = result.data.data.list[0].banners;//轮播图   
             this.hotRecomm = result.data.data.list[1];//重磅推荐
             this.hotbooks = result.data.data.list[2];//一周热文
             this.likebooks = result.data.data.list[3];//读者喜爱
             this.windcloulist = result.data.data.list[4];//风云榜
             this.goodrecom = result.data.data.list[5];//口碑力荐
             this.overlist = result.data.data.list[6];//完结榜
         }).catch((err)=>{
            console.log(err);
         })
     }
  },

  created(){
      this.getDate();
  }

};
</script>

<style lang="less" scoped>
.boycom {
    // 最后的填补
    .tian {
         height: 40px;
    }
  //轮播图
  .banner {
    width: 100%;
    height: 155px;
    .img {
      width: 355px;
      height: 155px;
      margin: 0 auto;
      border-radius: 10px;
      overflow: hidden;
      img {
        width: 100%;
        height: 155px;
        border-radius: 10px;
      }
    }
  }
  // 猜你喜欢
  .boylikebook {
    padding: 0px 14px 8px;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 10px;
    h2 {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      color: #353535;
      font-weight: 600;
    }
    ul {
      li {
        .bookbox {
          display: flex;
          margin-bottom: 16px;
          .bookimg {
            width: 90px;
            height: 120px;
            margin-right: 10px;
            img {
              width: 90px;
              height: 120px;
            }
          }
          .bookinfo {
            flex: 1;
            overflow: hidden; /* 溢出隐藏*/
            text-overflow: ellipsis; /* 文本超出后显示省略号*/
            h3 {
              font-size: 16px;
              color: #353535;
              height: 22px;
              line-height: 22px;
              font-weight: 600;
              white-space: nowrap; /* 强制文本在一行中显示 */
            }
            p {
              font-size: 12px;
              height: 15px;
              line-height: 15px;
              color: #737373;
              margin: 7px 0px 12px;
            }
            .drection {
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              font-size: 12px;
        }
          }
        }
      }
    }
  }
   //   人气风云榜
  .hotpopuler {
    padding: 0px 14px 8px;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 10px;
    .more {
      text-align: center;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
      color: #8e8e8e;
      .iconfont {
        font-size: 12px;
      }
    }
    h2 {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      color: #353535;
      font-weight: 600;
    }
    ul {
      display: flex;
      justify-content: space-between;
      li {
        width: 33%;
        .hotpuler {
          position: relative;
          P {
             font-size: 12px;
             color: #888888;
             text-align: left;
          }
          .one1 {
            width: 110px;
            height: 20px;
            background: url(../../assets/imgs/icon_01.png) no-repeat center
              center;
            position: absolute;
            top: -12px;
            left: 0px;
            background-size: 100% 100%;
          }
          .one2 {
            width: 110px;
            height: 20px;
            background: url(../../assets/imgs/icon_02.png) no-repeat center
              center;
            position: absolute;
            top: -12px;
            left: 0px;
            background-size: 100% 100%;
          }
          .one3 {
            width: 110px;
            height: 20px;
            background: url(../../assets/imgs/icon_03.png) no-repeat center
              center;
            position: absolute;
            top: -12px;
            left: 0px;
            background-size: 100% 100%;
          }
          .hotimg {
            width: 110px;
            height: 152px;
            margin-bottom: 8px;

            img {
              width: 110px;
              height: 152px;
            }
          }
          h4 {
            font-size: 16px;
            color: #404040;
            transform: scale(0.9);
            transform-origin: 0 0;
          }
        }
      }
    }
  }
}

//轮播图插件
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
}
.van-swipe__indicators {
  left: 30px;
}
.Jselect .banner {
  width: 94.7%;
  height: 155px;
  margin: 0 auto;
  border-radius: 10px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
}
</style>