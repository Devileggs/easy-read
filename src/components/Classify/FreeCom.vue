<template>
  <div class="freecom">
    <!-- 轮播 -->
   <div class="banner">
      <van-swipe class="my-swipe" indicator-color="white">
        <van-swipe-item v-for="(item,index) in banner" :key="index">
          <div class="img">
            <img :src="item.cover" alt="" />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>


    <div class="freNav">
      <h2>精品限时免费</h2>
      <div class="time">
        <span class="iconfont icon-shijian"></span>
        <span>40</span>:<span>20</span>:<span>05</span>
      </div>
    </div>
    <!-- 书本展示 -->
    <div class="frebooklist">
      <div class="frebooks">
        <ul>
          <li @click="godetail(item.id,item.title)" v-for="(item,index) in booklist.list" :key="index">
            <div class="freimg">
              <img :src="item.cover" alt="" />
            </div>
            <h3>{{item.title}}</h3>
            <p>{{item.nwprice}}阅点/千字</p>
            <p class="fre">免费</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 好书推荐 -->
     <div class="likebook">
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
               {{
                  item.content
               }}
              </div>
            </div>
          </div>
        </li>
        
      </ul>
    </div> 
    <!-- 猜你喜欢 -->
     <div class="likebook">
      <h2>{{likebookslist.name}}</h2>
      <ul>
        <li @click="godetail(item.id,item.title)" v-for="(item,index) in likebookslist.list" :key="index">
          <div class="bookbox">
            <div class="bookimg">
              <img :src="item.cover" alt="" />
            </div>
            <div class="bookinfo">
              <h3>{{item.title}}</h3>
              <p class="name">{{item.author}}/{{item.category}}</p>
              <div class="drection">
               {{
                  item.content
               }}
              </div>
            </div>
          </div>
        </li>
        
      </ul>
    </div> 
     <div class="dixian">
          我是有底线的
        </div> 
      <div class="tian"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  
   data(){
       return {
          banner:[],//轮播图
          booklist:[],//精选图书
          likebooks:[],//好书推荐
          likebookslist:[],//猜你喜欢
       }
   },
    
   methods:{
      getDate(){
        ///store/show.json?type=free&uuid=ea81f0be96a74d4fa7c674b9252a9ef4
         axios.get("https://apis.netstart.cn/yunyuedu/store/show.json?type=free&uuid=ea81f0be96a74d4fa7c674b9252a9ef4").then((result)=>{
             this.banner = result.data.data.list[0].banners;
             this.booklist = result.data.data.list[1];
             this.likebooks = result.data.data.list[2];//好书推荐
             this.likebookslist = result.data.data.list[3];//猜你喜欢
         })
      },
       //页面跳转
    godetail(id,title){
       this.$router.push({name:'bookdetail',query:{id:id,title:title}});
    },

   },
  created(){
      this.getDate();
  }

};
</script>

<style lang="less" scoped>
.freecom {
    .tian {
         height: 40px;
         width: 100%;
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
  

    //头部导航
  .freNav {
    width: 100%;
    height: 45px;
    line-height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: 16px;
      color: #1d1d1d;
      font-weight: bold;
      margin-left: 14px;
    }
    .time {
      width: 94px;
      height: 20px;
      font-size: 12px;
      color: black;
      background-color: orange;
      border-radius: 10px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      margin-right: 14px;
      span {
        font-size: 12px;
        //  transform: scale(0.8);
        //  transform-origin: 0 0;
        display: block;
        height: 16px;
        line-height: 18px;
        background-color: #fff;
        color: red;
      }
      .iconfont {
        color: #fff;
        background-color: orange;
      }
    }
  }
//   书本展示
  .frebooklist {
    .frebooks {
        width: 100%;
        box-sizing: border-box;
        padding: 0px 12px 26px;
        border-bottom:1px solid #f7f7f7;
      ul {
        display: flex;
        justify-content: space-between;
        li {
          width: 107px;
          .freimg {
            width: 107px;
            height: 160px;
            margin-bottom: 10px;
            img {
              width: 107px;
              height: 160px;
            }
          }
          h3 {
             font-size: 12px;
             font-weight: bold;
             color:#2d2d2d;
             margin-bottom: 12px;
          }
          p {
             font-size: 12px;
             color: #9a9a9a;
          }
          .fre {
             color: red;
             margin-top: 6px;
          }
        }
      }
    }
  }

// 猜你喜欢
   .likebook{
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
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              font-size: 12px;
        }
          }
        }
      }
    }
  }
//   底线
  .dixian {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 15px;
      color: #9a9a9a;
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