<template>
  <div class="Jselect">
    <!-- 轮播图 -->
    <div class="banner" v-if="banner">
      <van-swipe class="my-swipe" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banner" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
     <!-- 加载 -->
    <van-loading 
    class="loading"
    size="16px"
    text-size="16px"
    text-color="#adadad"  
    v-if="!recomlist"
    >Loading...</van-loading>

    <!-- 分类功能 -->
    <div class="classify_fun"> 
      <div class="funcontain">
        <ul>
          <li v-for="(item, index) in cotegroy" :key="index">
            <div class="itembox">
              <div class="img">
                <img :src="item.cover" alt="" />
              </div>
              <h4>{{ item.name }}</h4>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 本周强推 -->
    <div class="recom" v-if="recomlist.list">
      <h2>{{ recomlist.name }}</h2>
      <div class="bookbox">
        <div class="bookimg" @click="godetail(recomlist.list[0].id,recomlist.list[0].title )">
          <img :src="recomlist.list[0].cover" alt="" />
        </div>
        <div class="bookinfo">
          <h3>{{ recomlist.list[0].title }}</h3>
          <p class="name">
            {{ recomlist.list[0].author }}/{{ recomlist.list[0].category }}
          </p>
          <div class="drection">{{ recomlist.list[0].content }}</div>
        </div>
      </div>
      <ul>
        <li  @click="godetail(item.id,item.title)" v-for="(item,index) in recomlists" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
          <h3>{{item.title}}</h3>
          <p>{{item.author}}</p>
        </li>
      </ul>
    </div>

    <!-- 人气榜 -->
    <div class="booklist" v-if="wekList">
      <h2>{{wekList.name}}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item,index) in wekList.list" :key="index">
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
    <!-- 24小时热销榜 -->
    <div class="hotsell">
      <h2>{{hotselist.name}}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item,index) in hotselist.list" :key="index">
          <div class="hotbook">
            <div :class="'one'+(index+1)"></div>
            <div class="hotimg">
              <img :src="item.cover" alt="" />
            </div>
            <h4>{{item.title}}</h4>
          </div>
        </li>
      </ul>
      <p>查看更多 <span class="iconfont icon-gengduo1"></span></p>
    </div>
        <!-- 精品必读 -->
    <div class="booklist" v-if="Jpinglist">
      <h2>{{Jpinglist.name}}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item,index) in Jpinglist.list" :key="index">
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
        <!-- 高能剧情 -->
    <div class="booklist" v-if="Gaoaglist">
      <h2>{{Gaoaglist.name}}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item,index) in Gaoaglist.list" :key="index">
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
         
         <!-- 完结版 超人气爆款 -->
    <div class="hotsell">
      <h2>{{overlist.name}}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item,index) in overlist.list" :key="index">
          <div class="hotbook">
            <div :class="'one'+(index+1)"></div>
            <div class="hotimg">
              <img :src="item.cover" alt="" />
            </div>
            <h4>{{item.title}}</h4>
          </div>
        </li>
      </ul>
      <p>查看更多 <span class="iconfont icon-gengduo1"></span></p>
    </div>
   
        <!-- 高能剧情 -->
    <div class="booklist" v-if="goodlist">
      <h2>{{goodlist.name}}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item,index) in goodlist.list" :key="index">
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
     
        <!-- 最热新书版 -->
    <div class="hotsell">
      <h2>{{newHostlist.name}}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item,index) in newHostlist.list" :key="index">
          <div class="hotbook">
            <div :class="'one'+(index+1)"></div>
            <div class="hotimg">
              <img :src="item.cover" alt="" />
            </div>
            <h4>{{item.title}}</h4>
          </div>
        </li>
      </ul>
      <p>查看更多 <span class="iconfont icon-gengduo1"></span></p>
    </div>  
        <!-- 大家都在看 -->
    <div class="booklist" v-if="mostlist">
      <h2>{{mostlist.name}}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item,index) in mostlist.list" :key="index">
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


    <div class="tian"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      banner: [], //轮播图
      cotegroy: [], //分类功能
      recomlist: [], //本周强推
      recomlists: [], //本周强推的后四个
      wekList:[],//本周爆款
      hotselist:[],//热销版
      Jpinglist:[],//精品必读
      Gaoaglist:[],//高能剧情
      overlist:[],//完结版
      goodlist:[],//优质好文
      mostlist:[],//大家都在看
      newHostlist:[],//最热新书版
    };
  },
  methods: {
     //页面跳转
    godetail(id,title){
       this.$router.push({name:'bookdetail',query:{id:id,title:title}});
    },


    getlist() {
      axios
        .get(
          "https://apis.netstart.cn/yunyuedu/store/show.json?type=recommend&uuid=f2cb32ff209f4010911a77a617add8c4"
        )
        .then((result) => {
          //console.log(result);
          this.banner = result.data.data.list[0].banners;
          this.cotegroy = result.data.data.list[1].shortCut; //分类功能
          this.recomlist = result.data.data.list[2];
          this.recomlists = this.recomlist.list.splice(1); //截取数据除了第一位
          this.wekList = result.data.data.list[3];//本周爆款
          this.hotselist = result.data.data.list[4];//热销版
          this.Jpinglist = result.data.data.list[5];//精品必读
          this.Gaoaglist = result.data.data.list[6];//高能剧情
          this.overlist = result.data.data.list[7];//完结版
          this.goodlist = result.data.data.list[8];//优质好文
          this.mostlist = result.data.data.list[9];//大家都在读
          this.newHostlist = result.data.data.list[10];//最热新书
          //console.log(this.Jpinglist);
        }).catch((err)=>{
             console.log(err)
        });
    },
  },
  created() {
    this.getlist();
  },
};
</script>

<style lang="less">
.Jselect {
  //  最后的填补
  .tian {
    height: 40px;
  }
   .loading {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 300;
    background-color: rgba(0, 0, 0, 0.1);
    text-align:center;
    display: flex;
    justify-content: center;
    align-items: center;
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
    padding-bottom: 12px;
    .funcontain {
      width: 74.9%;
      height: 60px;
      margin: 0 auto;
      ul {
        display: flex;
        justify-content: space-between;
        li {
          // width: 54px;
          // height: 60px;
          width: 20%;
          .itembox {
            width: 100%;
            height: 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-bottom: 6px;
              img {
                width: 40px;
              }
            }
            h4 {
              font-size: 16px;
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
          white-space: nowrap; /* 强制文本在一行中显示 */
        }
        p {
          font-size: 12px;
          height: 15px;
          line-height: 15px;
          color: #737373;
          margin: 7px 0px;
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
    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      li {
        flex: 1;
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
  //人气榜
  .booklist {
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
              margin: 7px 0px;
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
            font-size: 14px;
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