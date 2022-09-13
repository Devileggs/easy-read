<template>
  <div class="girlcom">
    <!-- 轮播图 -->
    <div class="banner" v-if="girlbanner">
      <van-swipe class="my-swipe" indicator-color="white">
        <van-swipe-item v-for="(item, index) in girlbanner" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 小编力荐 -->
    <div class="boylikebook" v-if="hotrecomm">
      <h2>{{ hotrecomm.name }}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item, index) in hotrecomm.list" :key="index">
          <div class="bookbox">
            <div class="bookimg">
              <img :src="item.cover" alt="" />
            </div>
            <div class="bookinfo">
              <h3>{{ item.title }}</h3>
              <p class="name">{{ item.author }}/{{ item.category }}</p>
              <div class="drection">
                {{ item.content }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 连载追更 -->
    <div class="boylikebook" v-if="zupdatelist">
      <h2>{{ zupdatelist.name }}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item, index) in zupdatelist.list" :key="index">
          <div class="bookbox">
            <div class="bookimg">
              <img :src="item.cover" alt="" />
            </div>
            <div class="bookinfo">
              <h3>{{ item.title }}</h3>
              <p class="name">{{ item.author }}/{{ item.category }}</p>
              <div class="drection">
                {{ item.content }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 人气风云榜 -->
    <div class="hotpopuler" v-if="popurlist">
      <h2>{{ popurlist.name }}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item, index) in popurlist.list" :key="index">
          <div class="hotpuler">
            <div :class="'one'+(index+1)"></div>
            <div class="hotimg">
              <img :src="item.cover" alt="" />
            </div>
            <h4>{{ item.title }}</h4>
            <p>{{ item.clickCount }}点击</p>
          </div>
        </li>
      </ul>
      <p class="more">查看更多 <span class="iconfont icon-gengduo1"></span></p>
    </div>
    <!-- 完本畅读 -->
    <div class="boylikebook" v-if="overreding">
      <h2>{{ overreding.name }}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item, index) in overreding.list" :key="index">
          <div class="bookbox">
            <div class="bookimg">
              <img :src="item.cover" alt="" />
            </div>
            <div class="bookinfo">
              <h3>{{ item.title }}</h3>
              <p class="name">{{ item.author }}/{{ item.category }}</p>
              <div class="drection">
                {{ item.content }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 新书独家 -->
    <div class="recom" v-if="newBooklist">
      <h2>{{ newBooklist.name }}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item, index) in newBooklist.list" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.author }}</p>
        </li>
      </ul>
    </div>
    <!-- 潜力IP -->
    <div class="recom" v-if="iplist">
      <h2>{{ iplist.name }}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item, index) in iplist.list" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.author }}</p>
        </li>
      </ul>
    </div>

    <!-- 女生完结 -->
     <!-- <div class="hotpopuler" v-if="girlover">
      <h2>{{ girlover.name }}</h2>
      <ul>
        <li v-for="(item, index) in girlover.list" :key="index">
          <div class="hotpuler">
            <div class="one"></div>
            <div class="hotimg">
              <img :src="item.cover" alt="" />
            </div>
            <h4>{{ item.title }}</h4>
            <p>{{ item.clickCount }}点击</p>
          </div>
        </li>
      </ul>
      <p class="more">查看更多 <span class="iconfont icon-gengduo1"></span></p>
    </div> -->


    <!-- 现代言情 nowlist -->
     <div class="nowbook" v-if="nowlist">
      <h2>{{nowlist.name}}</h2>
      <div class="nowbox">
        <div @click="godetail(item.id,item.title)" class="item" v-for="(item,index) in nowlist.list" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
          <div class="info">
            <div class="name">{{item.title}}</div>
            <div class="ty">{{item.category}}</div>
            <div class="rednum">
              <span class="iconfont icon-yanjing"></span>
              {{item.clickCount | playCountNum}}
            </div>
          </div>
        </div>
      </div>
    </div> 
    <!-- 古代言情 -->
    <div class="nowbook" v-if="hostorylist">
      <h2>{{hostorylist.name}}</h2>
      <div class="nowbox">
        <div @click="godetail(item.id,item.title)" class="item" v-for="(item,index) in hostorylist.list" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
          <div class="info">
            <div class="name">{{item.title}}</div>
            <div class="ty">{{item.category}}</div>
            <div class="rednum">
              <span class="iconfont icon-yanjing"></span>
              {{item.clickCount | playCountNum}}
            </div>
          </div>
        </div>
      </div>
    </div> 

    <div class="tian"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      girlbanner: [], //轮播图
      hotrecomm: [], //重磅推荐
      zupdatelist: [], //连载追更
      popurlist: [], //人气榜
      overreding: [], //完本畅读
      newBooklist: [], //新书独家
      iplist:[],//潜力IP
      nowlist:[],//现代言情
      hostorylist:[],//古代言情
    };
  },

  methods: {
    // /store/show.json?type=femail&uuid=017de2274aa5400e9dabe30f173e98d9
    
          //页面跳转
    godetail(id,title){
       this.$router.push({name:'bookdetail',query:{id:id,title:title}});
    },
    getDate() {
      axios
        .get(
          "https://apis.netstart.cn/yunyuedu/store/show.json?type=femail&uuid=017de2274aa5400e9dabe30f173e98d9"
        )
        .then((result) => {
          console.log(result);
          this.girlbanner = result.data.data.list[0].banners;
          this.hotrecomm = result.data.data.list[1]; //重磅
          this.zupdatelist = result.data.data.list[2]; //连载追更
          this.popurlist = result.data.data.list[3]; //人气榜
          this.overreding = result.data.data.list[4]; //完本畅读
          this.newBooklist = result.data.data.list[5]; //新书独家
          this.iplist = result.data.data.list[6];//潜力ip
          this.nowlist = result.data.data.list[7];//现代言情
          this.hostorylist = result.data.data.list[8];//古代言情
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getDate();
  },
   //   过滤器
  filters: {
    playCountNum(value) {
      //123 0000
      let w = value > 10000 ? value / 10000 : value; //万计算
      let y = w > 10000 ? parseInt(w / 10000) + "亿" : parseInt(w) + "万"; //亿计算
      return y;
    },
  },
};
</script>

<style lang="less" scoped>
.girlcom {
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
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  //新书独家
  .recom {
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
    // .bookbox {
    //   display: flex;
    //   margin-bottom: 16px;
    //   .bookimg {
    //     width: 90px;
    //     height: 120px;
    //     margin-right: 10px;
    //     img {
    //       width: 90px;
    //       height: 120px;
    //     }
    //   }
    //   .bookinfo {
    //     flex: 1;
    //     overflow: hidden; /* 溢出隐藏*/
    //     text-overflow: ellipsis; /* 文本超出后显示省略号*/
    //     h3 {
    //       font-size: 16px;
    //       color: #353535;
    //       height: 22px;
    //       line-height: 22px;
    //       font-weight: 600;
    //       white-space: nowrap; /* 强制文本在一行中显示 */
    //     }
    //     p {
    //       font-size: 12px;
    //       height: 15px;
    //       line-height: 15px;
    //       color: #737373;
    //       margin: 7px 0px;
    //     }
    //     .drection {
    //           display: -webkit-box;
    //           overflow: hidden;
    //           text-overflow: ellipsis;
    //           -webkit-line-clamp: 4;
    //           -webkit-box-orient: vertical;
    //           font-size: 12px;
    //     }
    //   }
    // }
    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      li {
        width: 20%;
        .img {
          width: 78px;
          height: 110px;
          img {
            width: 78px;
            height: 110px;
          }
        }
        h3 {
          font-size: 12px;
          font-weight: bolder;
          color: #4c4c4c;
          height: 20px;
          line-height: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p {
          font-size: 12px;
          transform: scale(0.8);
          transform-origin: 0 0;
          color: #cdcdcd;
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
      margin-bottom: 10px;
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
  .nowbook {
    border-bottom: 1px solid #f5f5f5;
    h2 {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      color: #353535;
      font-weight: 600;
      text-indent: 14px;
    }
    .nowbox {
      width: 92%;
      display: flex;
      flex-wrap: wrap;
      margin: 0 auto;
      .item {
        flex: 1;
        display: flex;
        margin-bottom: 14px;
        .img {
          width: 67px;
          height: 90px;
          margin-right: 10px;
          img {
            width: 67px;
            height: 90px;
          }
        }
        .info {
          flex: 1;
          font-size: 12px;
          color: #353535;
          font-weight: 600;
          .name {
            width: 90px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin-bottom: 8px;
          }
          .ty {
            font-size: 12px;
            color: #939393;
            transform: scale(0.8);
            transform-origin: 0 0;
            margin-bottom: 10px;
          }
          .rednum {
            transform: scale(0.8);
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