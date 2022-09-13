<template>
  <div class="Listencom">
    <!-- 轮播图 -->
    <div class="banner" >
      <van-swipe class="my-swipe" indicator-color="white">
        <van-swipe-item  v-for="(item,index) in listenbanner" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    
  <!-- 重磅推荐 -->
    <div class="recom" v-if="hotrecommlist.list">
      <h2>{{ hotrecommlist.name }}</h2>
      <div class="bookbox">
        <div class="bookimg"  @click="godetail(hotrecommlist.list[0].id,hotrecommlist.list[0].title)">
          <img :src="hotrecommlist.list[0].cover" alt="" />
        </div>
        <div class="bookinfo">
          <h3>{{ hotrecommlist.list[0].title }}</h3>
          <p class="name">
            {{ hotrecommlist.list[0].author }}/{{ hotrecommlist.list[0].category }}
          </p>
          <div class="drection">{{ hotrecommlist.list[0].content }}</div>
        </div>
      </div>
      <ul>
        <li  @click="godetail(item.id,item.title)" v-for="(item, index) in hotrecommlists" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.author }}</p>
        </li>
      </ul>
    </div> 

    <!-- 本周热听 -->
   <div class="boylikebook" v-if="weekhotlist">
      <h2>{{ weekhotlist.name }}</h2>
      <ul>
        <li  @click="godetail(item.id,item.title)" v-for="(item, index) in weekhotlist.list" :key="index">
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

  <!-- 女生精选 -->
<div class="recom" v-if="Jselectgirl">
      <h2>{{ Jselectgirl.name }}</h2>
      <ul>
        <li  @click="godetail(item.id,item.title)" v-for="(item, index) in Jselectgirl.list" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.author }}</p>
        </li>
      </ul>
    </div> 
     <div class="tian"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
   
   data(){
      return {
         listenbanner:[],//轮播图
         hotrecommlist:[],//重磅推荐
         hotrecommlists:[],//重磅推荐后四个
         weekhotlist:[],//本周热听
         Jselectgirl:[],//女生精选
      }
   },
   //  /store/show.json?type=audio&uuid=b67282bb443845fabe5b543795a27618
   methods:{
        
      //页面跳转
    godetail(id,title){
       this.$router.push({name:'bookdetail',query:{id:id,title:title}});
    },
        getData(){
          axios.get("https://apis.netstart.cn/yunyuedu/store/show.json?type=audio&uuid=b67282bb443845fabe5b543795a27618").then(result=>{
             
              let resulist = result.data.data.list;
              this.listenbanner = resulist[0].banners;//轮播图
              this.hotrecommlist = resulist[1];//重磅推荐
              this.hotrecommlists = this.hotrecommlist.list.splice(1);//重磅推荐后四个
              this.weekhotlist = resulist[2];//本周热听
              this.Jselectgirl = resulist[4];//女生精选

          }).catch(err=>{
             console.dir(err)
          })
        }

   },
   created(){
     this.getData();
   }
};
</script>

<style lang="less" scoped>
.Listencom {
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
    //重磅推荐
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
  //本周热听
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

  // 猜你喜欢
  .listenbook {
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
              height: 60px;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              display: -webkit-box;
              text-overflow: ellipsis;
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
        .hotpuler {
          position: relative;
          P {
             font-size: 12px;
             color: #888888;
             text-align: left;
          }
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