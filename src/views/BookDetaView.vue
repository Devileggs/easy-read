<template>
  <!-- 书本详情 -->
  <div class="bookdeail">
    <div class="detailNav">
      <span @click="goback" class="iconfont back icon-fanhuijiantouxiangqingye"></span>
      <span @click="showShare = true" class="iconfont fenxiang icon-fenxiang"></span>
    </div>
      <!-- 加载 -->
    <van-loading 
    class="loading"
    size="16px"
    text-size="16px"
    text-color="#adadad"  
    v-if="!bookcover"
    >Loading...</van-loading>

    <!-- 书本详情介绍 -->
    <div class="bookbox">
      <div class="bookinfo">
        <div @click="toRead(bookDetail.id,bookDetail.title,bookDetail.author.name,bookcover)" class="bookimg" v-if="bookcover">
          <img :src="bookcover" alt=""/>
        </div>
        <div class="bookringht" v-if="bookDetail">
          <div class="title">{{ bookDetail.title }}</div>
          <div class="aother" v-if="bookDetail['pris:book']">
            <span>{{ bookDetail["pris:book"].category }}</span> /
            <span class="writer">{{ bookDetail.author.name }}</span>
          </div>
          <div class="">
            <van-rate
              v-model="star"
              :size="13"
              allow-half
              void-icon="star"
              void-color="#eee"
              color="Gold"
            />
          </div>
          <div class="count" v-if="bookDetail['pris:book']">
            <span class="sum"
              >{{ bookDetail["pris:book"].words | playCountNum }}字</span
            >
            <span class="dian"
              >{{ bookDetail["pris:subscribe"].clicksCount }}点击</span
            >
          </div>
          <div class="price" v-if="bookDetail['pris:book']">
            免费 <del>{{ bookDetail["pris:book"].wprice }}阅点/千字</del>
          </div>
          <!-- <div class="freetime">限免倒计时：<span>6天18小时24分</span></div> -->
        </div>
      </div>
      <!-- 书本描述 -->
      <div class="bookdrection">
        {{ bookDetail.summary }}
      </div>
    </div>
    <!-- 更新内容 -->
    <div class="newcontain">
      <div class="list">
        <span class="iconfont icon-liebiaomoshi"></span>
      </div>
      <div class="count" v-if="bookDetail['pris:book']">
        共{{ bookDetail["pris:book"].totalArticleCount[0] }}章
      </div>
      <!-- <div>
      <div class="time">04月01号</div>
      <div class="news">更新至：第一百多章</div>
      <div class="newcon">夜空中最亮的星</div>
      </div> -->
      <div class="more" v-if="bookDetail['pris:book']">
        {{ bookDetail["pris:book"].allNeedBuy == 0 ? "已完结" : "连载中"
        }}<span class="iconfont icon-youjiantou_huaban"></span>
      </div>
    </div>
    <!-- 评论 -->
    <div class="comment">
      <div class="nav">
        <div class="comtitle">| 评论</div>
        <div class="writing">
          <span class="iconfont icon-bi"></span>
          写评论
        </div>
      </div>
      <!-- 评论列表 -->
      <div class="commentlist">
        <div class="comitem" v-for="(item, index) in bookComment" :key="index">
          <div class="item_img">
            <img :src="item.avatar" alt="" />
          </div>
          <div class="item_info">
            <div class="item-name">{{ item.nickName }}</div>
            <div class="tiem-rat">
              <div class="rat"></div>
              <span class="time">2019年02月12日</span>
            </div>
            <div class="item-content">
              {{ item.comment }}
            </div>
          </div>
          <div class="item_like">
            {{ item.likes }}
            <span class="iconfont icon-changyongicon-"></span>
          </div>
        </div>
        <!-- <div class="comitem">
          <div class="item_img">
            <img src="../assets/imgs/2.jpg" alt="" />
          </div>
          <div class="item_info">
            <div class="item-name">在时间的远方</div>
            <div class="tiem-rat">
              <div class="rat"></div>
              <span class="time">2019年02月12日</span>
            </div>
            <div class="item-content">
              最近更新是凌晨，这更新速度不敢看 
            </div>
          </div>
          <div class="item_like">
            23
            <span class="iconfont icon-changyongicon-"></span>
          </div>
        </div> -->
      </div>
    </div>
    <div class="tian"></div>
    <!-- 功能和免费阅读 加入书架 购买 免费试读-->
    <footer>
      <div @click="collect" class="add">
        <h4>{{addbook == true? "移出书架":"加入书架"}}</h4>
      </div>
      <div class="pay">
        <h4>购买</h4>
      </div>
      <div class="read">
        <h4>免费试读</h4>
      </div>
    </footer>
    <van-share-sheet
  v-model="showShare"
  title="立即分享给好友"
  :options="options"
  @select="onSelect"
/>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from 'vant';
export default {
  data() {
    return {
      bookId: null,
      bookTitle: null,
      bookDetail: [], //书本详情
      bookcover: null, //书本图片
      star: 0, //画星星
      bookComment: [], //书本评论
      showShare: false,
      addbook:false,//添加书架书籍
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
    };
  },
  methods: {
     //阅读的链接
    //https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=bd_0c70b944c4c94244b05e3fb102cc2a67_4&content_uuid=3baca601ba04434ca6414c92ec2c5760_4
    
    toRead(bookid,title,author,bookcover){
         
         this.$router.push({name:'read',query:{id:bookid,cover:bookcover,title:title,author:author}});
    },
    //收藏
    collect(){
       let login = window.localStorage.getItem("token");
        // 判断是否登录
        if(login!=200){
          Toast("请先进行登录！");
          return;
        }else{
          //bookDetail.id,bookDetail.title,bookDetail.author.name,bookcover
        let bookobj = {
           id:this.bookDetail.id,
           title:this.bookDetail.title,
           author:this.bookDetail.author.name,
           cover:this.bookcover,
        };
         let localbooks = JSON.parse(localStorage.getItem("localbooks"));
        if (localbooks) {
          let index = localbooks.findIndex(item=>item.id == bookobj.id);
         
          if(index!=-1) {
            //如果改书籍已经收藏就取消收藏
             localbooks.splice(index,1);
             this.addbook = false;
             Toast("已移出书架");
             
          }else {
              localbooks.push(bookobj);
              this.addbook = true;
              Toast("成功加入书架");
              
          }
          
          //更新数据
          localStorage.setItem("localbooks", JSON.stringify(localbooks));
        } else {
          //如果没有数据就直接添加数据
          localStorage.setItem("localbooks", JSON.stringify([bookobj]));
        }
        
        }
    },
   
    //返回上一个history
    goback() {
      this.$router.go(-1);
    },
    //书本详情的cover
    getbookCover() {
      axios
        .get(
          `https://apis.netstart.cn/yunyuedu/book/info.json?sourceUuid=${this.bookId}`
        )
        .then((result) => {
          
          this.bookcover = result.data.data.book.cover;
          
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //书本详情
    getbookdetail() {
      //https://apis.netstart.cn/yunyuedu/book/getsub.json?id=13c58cc086f74e36978b4a7881b82517_4&title=女掌事
      axios
        .get(
          `https://apis.netstart.cn/yunyuedu/book/getsub.json?id=${this.bookId}&title=${this.bookTitle}`
        )
        .then((data) => {
          
          this.bookDetail = data.data.feed.entry;
          
          this.star = Number(data.data.feed.entry["pris:ranking"].value);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //书籍评论
    //https://apis.netstart.cn/yunyuedu/comment/getComments.json?bookId=654ebfbcccd64b3ea0a51934953f300e_4

    getComments() {
      axios
        .get(
          `https://apis.netstart.cn/yunyuedu/comment/getComments.json?bookId=${this.bookId}`
        )
        .then((result) => {
         
          this.bookComment = result.data.all.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 分享功能
   onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },


  },
  created() {
    this.bookId = this.$route.query.id;
    this.bookTitle = this.$route.query.title;
    this.getbookdetail();
    this.getbookCover();
    this.getComments();
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
.bookdeail {
  background-color: #f5f5f5;
  .detailNav {
    width: 100%;
    height: 30px;
     z-index: 150;
    line-height: 30px;
    background-color: #fff;
    padding-bottom: 10px;
    position: fixed;
    top: 0px;
   
    .iconfont {
      display: block;
      width: 40px;
      height: 30px;
      line-height: 30px;
      font-size: 23px;
      color: #000;
      font-weight: bold;
    }
    .back {
       float: left;
    }
    .fenxiang {
       float: right;
    }
  }
  //加载
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
  // 书本内容
  .bookbox {
    box-sizing: border-box;
    padding: 8px 12px 0px;
    background-color: #fff;
    border-top: #f9f9f9 solid 1px;
    border-bottom: 1px solid #f9f9f9;
    padding-top: 40px;
    .bookinfo {
      display: flex;
      .bookimg {
        width: 100px;
        margin-right: 10px;
        img {
          width: 100px;
        }
      }
      .bookringht {
        flex: 1;
        .title {
          font-size: 16px;
          color: #040402;
          font-weight: bold;
          margin-bottom: 6px;
        }
        .aother {
          font-size: 12px;
          color: #969493;
          .writer {
            color: #5ba7ec;
          }
        }
        .rat {
          width: 60px;
          height: 10px;
          background-color: orange;
          margin: 8px 0px 6px;
        }
        .count {
          font-size: 12px;
          color: #969492;
          margin-bottom: 4px;
          span {
            display: inline-block;
          }
          .sum {
            margin-right: 12px;
          }
        }
        .price {
          font-size: 14px;
          color: #eb504c;
          margin-bottom: 6px;
          del {
            font-size: 12px;
            color: #918f8d;
          }
        }
        .freetime {
          font-size: 12px;
          color: #918f8d;
        }
      }
    }

    .bookdrection {
      padding-top: 12px;
      margin-bottom: 12px;
      box-sizing: border-box;
      font-size: 14px;
      color: #827f7d;
      // display: -webkit-box;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // -webkit-line-clamp: 3;
      // -webkit-box-orient: vertical;
    }
  }
  // 更新内容
  .newcontain {
    width: 100%;
    height: 32px;
    line-height: 32px;
    padding: 0px 12px;
    box-sizing: border-box;
    display: flex;
    background-color: #fff;
    font-size: 12px;
    color: #24201d;
    .list {
      width: 23px;
      height: 20px;
    }
    .count {
      flex: 1;
    }
    .time {
      width: 55px;
    }
    .news {
      flex: 1;
      margin-right: 8px;
    }
    .newcon {
      flex: 1;
    }
    .more {
      width: 55px;
      color: #60aa54;
      .iconfont {
        font-size: 12px;
        color: #24201d;
      }
    }
  }
  //评论
  .comment {
    font-size: 16px;
    color: #666460;
    background-color: #fff;
    margin-top: 8px;
    padding: 0px 12px;
    box-sizing: border-box;
    margin-bottom: 6px;
    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      .writing {
        height: 22px;
        border: 2px solid #92918f;
        //box-shadow: 1px 2px 3px #92918f;
        font-size: 12px;
        border-radius: 2px;
        line-height: 22px;
      }
    }
    .commentlist {
      margin-top: 14px;
      .comitem {
        display: flex;
        height: 75px;
        .item_img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }
        .item_info {
          flex: 1;
          font-size: 12px;
          margin-left: 10px;
          .item-name {
            color: #6eb2ef;
          }
          .tiem-rat {
            height: 20px;
            line-height: 20px;
            .rat {
              width: 60px;
              height: 10px;
              display: inline-block;
              background-color: orange;
              margin-right: 12px;
            }
            .time {
              display: inline-block;
            }
          }
          .item-content {
            color: #3b3937;
            font-size: 12px;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        .item_like {
          color: #3f3d3a;
          height: 88px;
          font-size: 12px;
          color: #918f8d;
          .like {
             color: red;
          }
        }
      }
    }
  }
  //底部填充
  .tian {
     width: 100%;
     height: 38px;
  }
  //底部功能按钮
  footer {
    width: 100%;
    height: 44px;
    line-height: 44px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    display: flex;
    background-color: #fff;
    div {
      flex: 1;
      font-size: 14px;
      text-align: center;
      border: 1px solid #eeeeee;
    }
    .add {
        position: relative;
        &::after {
           content: "";
           position: absolute;
           right: -2px;
           top:10px;
           width: 2px;
           height: 24px;
           background-color:#cbcbcb;
        }
    }
    .read {
      background-color: #f24949;
      color: #fff;
    }
  }
}
</style>
