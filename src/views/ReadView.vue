<template>
  <div class="reading" ref="reading" v-if="finish">
    <!-- 顶部导航 -->
    <div ref="readnav" class="read_nav" v-show="navisShow">
      <div class="back" @click="goback">
        <span class="iconfont icon-fanhuijiantouxiangqingye"></span>
      </div>
      <div class="comment">
        <span class="iconfont icon-liaotian"></span>
      </div>
    </div>
    <!-- 加载 -->
     <van-loading
      class="loading"
      size="16px"
      text-size="16px"
      text-color="#000"
      v-if="!content"
      >加载中...</van-loading
    > 
    <!-- 页面文本内容 -->
    <div class="read_content" ref="wraps" >
      <div class="smark" 
        ref="smark"
         @touchstart="startDistance"
          @touchend="endDistance"
          @click="navisShow = !navisShow"
      ></div>
      <div class="content" ref="bookcontent" v-html="content"></div>
    </div>

    <!-- 底部功能 -->
    <div ref="readfooter" class="read_footer" v-show="navisShow">
      <div class="book_sction">
        <div class="sction_num">{{ cataloglist[this.currenIndex].title }}</div>
      </div>
      <div class="progerbar">
        <span
          class="iconfont icon-jiantou_liebiaoxiangzuo"
          @click="prevPaper"
        ></span>
        <div class="progres">
          <van-slider 
            active-color="#e65032"
            v-model="bgLight"
            :max="1"
            :min="0"
            :step="0.1"
            button-size="20px"
            @input="changeLight"
            
           />
        </div>
        <span
          class="iconfont icon-jiantou_liebiaoxiangyou"
          @click="nextPaper"
        ></span>
      </div>
      <div class="cotabar">
        <div class="catalog" @click="(listIsShow = true), (navisShow = false)">
          <span class="iconfont icon-liebiaomoshi"></span>
          目录
        </div>
        <div class="catalog">
          <span class="iconfont icon-shezhi1"></span>
          设置
        </div>
        <div class="catalog" @click="updateColor">
          <!--212426 'icon-taiyang':'icon-yueduye-yejianmoshi'-->
          <span
            class="iconfont"
            :class="isSun == true ? 'icon-taiyang' : 'icon-yueduye-yejianmoshi'"
          ></span>
          {{ isSun == true ? "白天" : "夜间" }}
        </div>
        <div class="catalog">
          <span class="iconfont icon-gengduo"></span>
          更多
        </div>
      </div>
    </div>
    <!-- 左翻书 -->
    <div class="trun trunleft" @click="trunleft"></div>
    <!-- 右翻书 -->
    <div class="trun trunright" @click="trunright"></div>
    <!-- 章节列表 -->
    <div class="booklist" v-if="listIsShow">
      <div class="navbox">
        <div class="list_nav">
          <div class="nav_img">
            <img :src="sucover" alt="" />
          </div>
          <div class="nav_info">
            <div class="title">
              {{ sutitle }}
            </div>
            <div class="author">{{ suauthor }}</div>
          </div>
        </div>
        <div class="count">
          <div class="chapter">共{{ totalcount }}章</div>
          <div class="ranking" @click="flashback">
            <span :class="[isflashback == true ? 'shun' : 'dao']">{{isflashback == true ? '顺序':'倒叙'}}</span>
          </div>
        </div>
      </div>
      <div class="booklist_content" v-if="cataloglist">
        <div class="booklist_content_title">目录</div>
        <ul>
          <li
            v-for="(item, index) in cataloglist"
            :key="index"
            class="action"
            @click="setBook(item)"
          >
            <!-- <div class="booklist_chapter_count">第1355886章</div> -->
            <div class="booklist_chapter_title">{{ item.title }}</div>
            <span
              class="iconfont"
              :class="item.needPay == true ? 'icon-suo2' : ''"
            ></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      finish: false,
      navisShow: false, //操作面板显示隐藏
      listIsShow: false, //列表显示隐藏
      content: null, //章节内容
      isSun: false, //切换白天黑夜
      bgLight:0,//背景亮度
      tocId: null, //书籍id  source_uuid
      sutitle: null, //书名
      suauthor: null, //作者
      totalcount: null, //全部的章节
      sucover: null, //详情图片
      cataloglist: null, //章节
      currenIndex: 0, //当前的章节下标
      colNum: 0, //每一个章节的总页数
      currenNum: 0, //当前的章节页
      isflashback:false,//是否倒叙
    };
  },

  methods: {
       
    //通过目录点击进入看书
   async setBook(obj){
      this.$refs.bookcontent.style.transition = '0s';
       this.listIsShow=false; 
       if(obj.needPay ==true && obj.paid == false){
          Toast("该章节需要购买");
          return;
       }else {
      await this.getContent(this.tocId,obj.secId);
        let index = Number(obj.title.replace(/[^\d]/g,' '));
        this.currenIndex = (index) ;
         setTimeout(() => {
          this.inits();
        },2000)
       }
       
    },

       //倒叙
       flashback(){
        this.isflashback =  !this.isflashback;
         this.cataloglist = this.cataloglist.reverse();
       },
    //返回上一层
    goback() {
      this.$router.go(-1);
    },
    //夜间模式
    updateColor() {
      if(!this.isSun){
       
        //readnav  bookcontent readfooter 666666  212426  color 787878  ddd8cf
        this.$refs.readnav.style.background= "#343434";
        this.$refs.readnav.style.updateColor = "#666666";
        this.$refs.readfooter.style.background = "#343434";
        this.$refs.readfooter.style.updateColor = "#666666";
        this.$refs.bookcontent.querySelector(".g-book").style.background = "#212426";
        this.$refs.bookcontent.querySelector(".g-book").style.updateColor = "#787878";
       
         this.isSun = true;
      }else {
        this.$refs.readnav.style.background= "#ffffff";
        this.$refs.readnav.style.updateColor = "#000";
        this.$refs.readfooter.style.background = "#ffffff";
        this.$refs.readfooter.style.updateColor = "#000";
        this.$refs.bookcontent.querySelector(".g-book").style.background = "#ddd8cf";
        this.$refs.bookcontent.querySelector(".g-book").style.updateColor = "#000";
        
        this.isSun = false;
      }
      console.log("触发夜间模式");
    },
    //下一章
    async nextPaper() {

      this.currenIndex += 1;
      await this.getContent(this.tocId,this.cataloglist[this.currenIndex].secId);
        setTimeout(() => {
          this.inits();
        },2000)
       
    },
    //上一章
    async prevPaper() {
     
      this.currenIndex -= 1;
      await this.getContent(this.tocId,this.cataloglist[this.currenIndex].secId);
      this.$nextTick(()=>{
         this.inits();
      })
       
    },
    changeLight(value) {
      Toast("当前亮度：" + value);
      this.$refs.smark.style.background=`rgba(0,0,0,${value})`;
      this.bgLight = value;
    },
     
      // 计算触屏幕开始位置
    startDistance(event) {
      this.startPos = event.changedTouches[0].pageX;
    },
    endDistance(event) {
      this.endPos = event.changedTouches[0].pageX;
      if (this.startPos - this.endPos < 0) {
        console.log("上一页触发");
        this.trunleft();
      }
      if (this.startPos - this.endPos > 0) {
        console.log("下一页触发");
        this.trunright();
      }
    },





    //初始化方法
   async inits() {
       
       let wrapsOffetWidth =  this.$refs.wraps.scrollWidth;
       if(this.currenNum !=0){
         this.currenNum = 0;//每一章的当前页；默认第一页
        this.$refs.bookcontent.style.transform="translateX("+ this.currenNum * 375+"px)";
         
        }
      // console.log(wrapsOf  etWidth);
       this.colNum = await Math.ceil(
        parseFloat(wrapsOffetWidth) / parseFloat(document.body.clientWidth)
      );
      // console.log(this.currenNum, this.colNum);
      this.$refs.bookcontent.style.transition = '1s';
    },

    //上一页
    trunleft() {
      // console.log("翻页前："+this.currenNum, this.colNum);
      
      if(this.currenNum <= 0){
          Toast("上一章");
          this.prevPaper();
          return;
      }else {
        this.currenNum -= 1;
        this.$refs.bookcontent.style.transform="translateX("+ this.currenNum * -375+"px)";
        // console.log("翻页后："+this.currenNum, this.colNum);
      }
    },
    //下一页
    trunright() {
      // console.log("翻页前："+this.currenNum, this.colNum);
      
      if(this.currenNum >= this.colNum-1) {
        let content = this.$refs.bookcontent;
        content.style.transition="0s";
         this.nextPaper();
        return Toast('下一章');
       
      }else {
        this.currenNum += 1;
      this.$refs.bookcontent.style.transform="translateX("+this.currenNum * -375+"px)";
      //  console.log("翻页后："+this.currenNum, this.colNum);
      }
    },

    //章节列表
    async getCatalog(tocId, title) {
      
      //https://apis.netstart.cn/yunyuedu/reader/book/info.json?source_uuid
      const { data } = await axios
        .get(
          `https://apis.netstart.cn/yunyuedu/reader/book/info.json?source_uuid=${tocId}`
        )
        this.cataloglist = data.data.catalog;
        //console.log(this.cataloglist);
        // 首次获取数据
       await this.getContent(tocId,this.cataloglist[this.currenIndex].secId);
        
      await axios
        .get(
          `https://apis.netstart.cn/yunyuedu/book/getsub.json?id=${tocId}&title=${title}`
        )
        .then((result) => {
          this.totalcount = result.data.feed.entry["pris:book"].totalArticleCount[0];
          this.finish = true

        })
        this.inits();
    },
     //获取图书内容
       getContent(source_uuid,content_uuid){
           axios
            .get(
              `https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=${source_uuid}&content_uuid=${
                content_uuid
              }`
            ).then((result)=>{
             this.content =result.data.data.content;
              //获取到内容后就初始化总页面
               this.$nextTick(()=>{
               this.inits();
               })
            })
              
      }
      // async  getContent(source_uuid,content_uuid){
      //     const { data } = await axios
      //       .get(
      //         `https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=${source_uuid}&content_uuid=${
      //           content_uuid
      //         }`
      //       )
      //         this.content = data.data.content;
      //          console.log(this.content);
      //         // this.$nextTick(()=>{
      //          this.inits();
      //         // })
      // }

  },
  created() {
    let id = this.$route.query.id;
    let cover = this.$route.query.cover;
    let title = this.$route.query.title;
    let author = this.$route.query.author;
    this.tocId = id; //图书id
    this.sutitle = title;
    this.suauthor = author;
    this.sucover = cover;

    this.getCatalog(this.tocId, this.sutitle); //获取章节列表
  },
};
</script>

<style lang="less" scoped>
.reading {
  background: red;
  //  章节列表
  .booklist {
    width: 90%;
    height: 100%;
    z-index: 810;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: #fff;
    .navbox {
      position: fixed;
      width: 90%;
      box-sizing: border-box;
      padding: 20px 10px 0px;
      background-color: #fff;
      z-index: 150;
      .list_nav {
        display: flex;
        height: 64px;
        margin-bottom: 6px;
        .nav_img {
          width: 48px;
          margin-right: 20px;
          img {
            width: 48px;
          }
        }
        .nav_info {
          .title {
            font-size: 16px;
            color: #000;
            margin-bottom: 8px;
          }
          .author {
            font-size: 12px;
            color: #888888;
          }
        }
      }
      .count {
        height: 40px;
        line-height: 40px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .chapter {
          font-size: 12px;
          color: #242424;
        }
        .ranking {
          font-size: 12px;
          color: #888888;
          span {
            padding: 0px 10px;
            border: 1px solid #888888;
            border-radius: 30px;
            position: relative;
          }
          .dao::after {
            content: "";
            width: 0px;
            height: 0px;
            border: 4px solid transparent;
            border-top-color: red;
            position: absolute;
            top: 4px;
            right: 2px;
          }
          .shun::after {
            content: "";
            width: 0px;
            height: 0px;
            border: 4px solid transparent;
            border-bottom-color: blue;
            position: absolute;
            top: 0px;
            right: 2px;
          }
        }
      }
    }
    .booklist_content {
      width: 100%;
      height: 100%;
      padding-top: 130px;
      overflow: scroll;
      .booklist_content_title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-indent: 10px;
        font-weight: 400;
        background-color: #e1e1e1;
        color: #999999;
      }
      ul {
        li {
          display: flex;
          height: 40px;
          line-height: 40px;
          border-bottom: 1px dashed #cdcdcd;

          div {
            font-size: 14px;
            color: #000;
            text-indent: 26px;
          }
          .booklist_chapter_title {
            flex: 1;
            text-indent: 26px;
          }
          .iconfont {
            width: 26px;
            height: 40px;
            display: block;
          }
        }
        li.action > div {
          color: red !important;
        }
      }
    }
  }

  .loading {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 820;
    background-color: rgba(0, 0, 0, 0.1);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .trun {
    width: 33%;
    height: 100%;
    background-color:transparent;
    position: fixed;
    top: 0px;
    z-index: 300;
  }
  .trunleft {
    left: 0px;
  }
  .trunright {
    right: 0px;
  }

  .read_nav {
    width: 100%;
    height: 30px;
    z-index: 850;
    line-height: 30px;
    background-color: #fff;
    // 头部：343434 666666
    color: #000;
    position: fixed;
    top: 0px;
    left: 0px;
    .back {
      width: 40px;
      text-align: center;
      float: left;
    }
    .comment {
      width: 40px;
      float: right;
    }
    span {
      font-size: 24px;
    }
  }

  //阅读文本
  .read_content {
    background-color: #ddd8cf;
    //212426  color 787878     ddd8cf
    //width: 100vw;
    height: 100vh;
    overflow: hidden;
    .smark {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      position: fixed;
      top: 0px;
      left: 0px;
      z-index: 300;
      background: rgba(0, 0, 0, 0);
    }
    .content {
      background-color: #ddd8cf;
      padding: 24px 0px;
      column-width: 100vw; //文本内容装换
      column-gap: 0px; //每个部分之间的间距
      box-sizing: border-box;
      height: 100%;
      word-break: break-word;
      transition: 1s;
     
      /deep/h1 {
        padding-top: 100px;
        margin-bottom: 100px;
        font-size: 25px;
        font-weight: 600;
      }
      /deep/p {
        font-size: 20px;
        text-indent: 16px;
        margin-top: 4px;
      }
    }
  }
  //  底部功能
  .read_footer {
    position: fixed;
    z-index: 850;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 134px;
    background-color: #fff;
    // 底部：343434 666666
    border-top: 1px solid #d2d2d2;
    .book_sction {
      width: 100%;
      height: 48px;
      line-height: 48px;
      font-size: 14px;
      text-align: center;
      .sction_num {
        font-size: 12px;
        text-align: center;
      }
    }
    .progerbar {
      display: flex;
      width: 100%;
      height: 45px;
      .progres {
        width: 60%;
        padding: 19px 20px;
        flex: 1;
      }
      .iconfont {
        font-size: 32px;
        display: block;
        width: 30px;
        height: 45px;
        line-height: 45px;
        text-align: center;
      }
    }
    .cotabar {
      width: 100%;
      display: flex;
      padding-bottom: 2px;

      div {
        width: 90px;
        height: 46px;
        padding: 0px 26px;
        box-sizing: border-box;
        font-size: 14px;
        .iconfont {
          font-size: 21px;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>