<template>
  <div class="Publish">
    <!-- 轮播图 -->
    <div class="banner" v-if="puBbanner">
      <van-swipe class="my-swipe" indicator-color="white">
        <van-swipe-item v-for="(item, index) in puBbanner" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 分类功能 -->
    <div class="classify_fun">
      <div class="funcontain">
        <ul>
          <li @click="godetail(item.id,item.title)" v-for="(item, index) in shortCut" :key="index">
            <div class="itembox">
              <div class="img">
                <img :src="item.cover" alt="" />
              </div>
              <h4>{{ item.title }}</h4>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 本周强推 -->
    <div class="recom">
      <h2>{{ hotrecomm.name }}</h2>
      <div class="bookbox" v-if="hotrecomm.list">
        <div class="bookimg"  @click="godetail(hotrecomm.list[0].id,hotrecomm.list[0].title)">
          <img :src="hotrecomm.list[0].cover" alt="" />
        </div>
        <div class="bookinfo">
          <h3>{{ hotrecomm.list[0].title }}</h3>
          <p class="name">
            {{ hotrecomm.list[0].author }}/{{ hotrecomm.list[0].category }}
          </p>
          <div class="drection">{{ hotrecomm.list[0].content }}</div>
        </div>
      </div>
      <ul>
        <li v-for="(item, index) in hotrecomms" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.author }}</p>
        </li>
      </ul>
    </div>
    <!-- 本周人气排行榜 -->
    <div class="hotpopuler" v-if="popularlist">
      <h2>{{ popularlist.name }}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item, index) in popularlist.list" :key="index">
          <div class="hotpuler">
            <div :class="'one' + (index + 1)"></div>
            <div class="hotimg">
              <img :src="item.cover" alt="" />
            </div>
            <h4>{{ item.title }}</h4>
            <p>{{ item.clickCount }}点击</p>
          </div>
        </li>
      </ul>
      <p class="more">查看更多<span class="iconfont icon-gengduo1"></span></p>
    </div>

    <!-- 新书速递 -->
    <div class="recom" v-if="newBooklist.list">
      <h2>{{ newBooklist.name }}</h2>
      <div class="bookbox">
        <div class="bookimg" @click="godetail(newBooklist.list[0].id,newBooklist.list[0].title)">
          <img :src="newBooklist.list[0].cover" alt="" />
        </div>
        <div class="bookinfo">
          <h3>{{ newBooklist.list[0].title }}</h3>
          <p class="name">
            {{ newBooklist.list[0].author }}/{{ newBooklist.list[0].category }}
          </p>
          <div class="drection">{{ newBooklist.list[0].content }}</div>
        </div>
      </div>
      <ul>
        <li v-for="(item, index) in newBooklists" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.author }}</p>
        </li>
      </ul>
    </div>
    <!-- 悬疑推理 -->
     <div class="recom" v-if="suspenselist">
      <h2>{{ suspenselist.name }}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item, index) in suspenselist.list" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.author }}</p>
        </li>
      </ul>
    </div> 
    <!-- 精品小说 -->
     <div class="boylikebook" v-if="Jbookslist">
      <h2>{{ Jbookslist.name }}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item, index) in Jbookslist.list" :key="index">
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
    <!-- 历史文化 -->
     <div class="recom" v-if="historylist">
      <h2>{{ historylist.name }}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item, index) in historylist.list" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.author }}</p>
        </li>
      </ul>
    </div> 
    <!-- 励志 -->
<div class="recom" v-if="motivlist.list">
      <h2>{{ motivlist.name }}</h2>
      <div class="bookbox">
        <div class="bookimg" @click="godetail(motivlist.list[0].id,motivlist.list[0].title)">
          <img :src="motivlist.list[0].cover" alt="" />
        </div>
        <div class="bookinfo">
          <h3>{{ motivlist.list[0].title }}</h3>
          <p class="name">
            {{ motivlist.list[0].author }}/{{ motivlist.list[0].category }}
          </p>
          <div class="drection">{{ motivlist.list[0].content }}</div>
        </div>
      </div>
      <ul>
        <li v-for="(item, index) in motivlists" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.author }}</p>
        </li>
      </ul>
    </div>

    <!-- 青春言情 -->
     <div class="recom" v-if="youthlist">
      <h2>{{ youthlist.name }}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item, index) in youthlist.list" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.author }}</p>
        </li>
      </ul>
    </div> 
    <!-- 超值套装 suitlist-->
  <div class="boylikebook" v-if="suitlist">
      <h2>{{ suitlist.name }}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item, index) in suitlist.list" :key="index">
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
    <!--  liveslist:[],//品质生活-->
     <div class="boylikebook" v-if="liveslist">
      <h2>{{ liveslist.name }}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item, index) in liveslist.list" :key="index">
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
      <!-- studinglist:[],//学习充电  -->
 <div class="boylikebook" v-if="studinglist">
      <h2>{{ studinglist.name }}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item, index) in studinglist.list" :key="index">
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
    <div class="tian"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      puBbanner: [], //轮播图
      shortCut: [], //功能模块
      hotrecomm: [], //重磅推荐
      hotrecomms: [], //重磅推荐后四个
      popularlist: [], //人气排行榜
      newBooklist: [], //新书速递
      newBooklists: [], //新书速递后四个
      suspenselist:[],//悬疑推理
      Jbookslist:[],//精品小说
      historylist:[],//历史文化
      motivlist:[],//励志
      motivlists:[],//励志后四个
      youthlist:[],//青春言情
      suitlist:[],//超值套装
      liveslist:[],//品质生活
      studinglist:[],//学习充电
    };
  },
  methods: {
    ///store/show.json?type=publish&uuid=b5648dd3c4f24d9796f590cd81ca076e
        //页面跳转
    godetail(id,title){
       this.$router.push({name:'bookdetail',query:{id:id,title:title}});
    },

    getDate() {
      axios
        .get(
          "https://apis.netstart.cn/yunyuedu/store/show.json?type=publish&uuid=b5648dd3c4f24d9796f590cd81ca076e"
        )
        .then((result) => {
         
          this.puBbanner = result.data.data.list[0].banners;
          this.shortCut = result.data.data.list[1].shortCut; //功能
          this.hotrecomm = result.data.data.list[2]; //推荐
          this.hotrecomms = this.hotrecomm.list.splice(1); //推荐后四个
          this.popularlist = result.data.data.list[3]; //本周人气排行榜
          this.newBooklist = result.data.data.list[4]; //新书速递
          this.newBooklists = this.newBooklist.list.splice(1); //新书速递后四个
          this.suspenselist = result.data.data.list[5];//悬疑推理
          this.Jbookslist = result.data.data.list[6];//精品小说
          this.historylist = result.data.data.list[8];//历史文化
          this.motivlist = result.data.data.list[9];//励志
          this.motivlists = this.motivlist.list.splice(1);//励志后四个
          this.youthlist = result.data.data.list[10];//青春言情
          this.suitlist = result.data.data.list[11];//超值套装
          this.liveslist = result.data.data.list[12];//品质生活
          this.studinglist = result.data.data.list[13];//学习充电
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getDate();
  },
};
</script>

<style lang="less">
.Publish {
  //  最后的填补
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
  //分类功能
  .classify_fun {
    width: 94.7%;
    height: 60px;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 auto;
    text-align: center;
    .funcontain {
      width: 74.9%;
      height: 60px;
      margin: 0 auto;
      ul {
        display: flex;
        justify-content: space-between;
        li {
          width: 54px;
          height: 60px;
          .itembox {
            width: 54px;
            height: 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              margin-bottom: 6px;
              img {
                width: 30px;
              }
            }
            h4 {
              font-size: 12px;
              color: #4b4b4b;
            }
          }
        }
      }
    }
  }
  //本周强推
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .drection {
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          font-size: 12px;
        }
      }
    }
    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      li {
        width: 25%;
        .img {
          width: 78px;
          height: 110px;
          img {
            width: 78px;
            height: 110px;
          }
        }
        h3 {
          width: 100%;
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  //精品小说
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

  //   24小时热销榜
  .hotsell {
    padding: 0px 14px 8px;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 10px;
    p {
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
        .hotbook {
          position: relative;
          .one {
            width: 110px;
            height: 20px;
            background: url(../../assets/imgs/icon_01.png) no-repeat center
              center;
            position: absolute;
            top: -12px;
            left: 0px;
            background-size: 100% 100%;
          }
          .two {
            width: 110px;
            height: 20px;
            background: url(../../assets/imgs/icon_02.png) no-repeat center
              center;
            position: absolute;
            top: -12px;
            left: 0px;
            background-size: 100% 100%;
          }
          .three {
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
            font-size: 14px;
            color: #404040;
            transform: scale(0.9);
            transform-origin: 0 0;
          }
        }
      }
    }
  }

  //悬疑推理
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