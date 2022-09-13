<template>
    <div class="searchcom">
        <!-- 头部导航 -->
           <div class="seaNav">
             <div class="inpbox">
                <span class="iconfont icon-sousuo1"></span>
                <input type="text" @keydown.enter="getkeyword($event)" placeholder="三国志">
                <div class="clear" @click="clear" v-show="searchlistIsshow">X</div>
            </div>
             <div class="Qxiao" @click="goback">
                取消
             </div>
           </div>
           <!-- 热门搜素 -->
           <div class="hot_search">
                   <h3>热门搜素</h3>
                   <ul>
                    <li @click="sethotWord(item.id)" v-for="(item,index) in hotsearch" :key="index">
                        <div class="num" :class="'one'+(index+1)">{{index+1}}</div>
                        <div class="content">{{item.name}}</div>
                    </li>
                   </ul>
           </div>
           <!-- 搜索记录 -->
           <div class="histoty">
                  <div class="title">
                    <h3>最近搜索</h3>
                    <span @click="del" class="iconfont icon-shanchu1"></span>
                  </div>
                  <ul >
                    <li v-for="(item,index) in historyList" :key="index">
                        <div class="items">
                            <span class="iconfont icon-shu"></span>
                           {{item}}
                        </div>
                    </li>  
                  </ul>
           </div>

           <!-- 搜索列表展示 height:92%-->
           <div class="searchlist" v-if="searchlistIsshow">
              <div class="list_item" v-for="(item,index) in searList" :key="index">
                    <span class="iconfont icon-shuji2"></span>
                    <div @click="godetail(item.text,item.id)" class="list_content">{{item.text.trim().length == 0? "暂无数据" : item.text}}</div>
                    <span class="iconfont icon-jinrujiantouxiao"></span>
              </div>
            
           </div>
    </div>
</template>

<script>
import axios from "axios";
    export default {
      
      data(){
        return{
             hotsearch:[],//热门搜索
             searList:[],//搜索列表
             historyList:[],//搜索历史记录
             searchlistIsshow:false,//搜索列表显隐
             
        } 
      },

       methods:{
          goback(){
             this.$router.go(-1);
          },
          //获取热搜数据
          gethotSearch(){
             axios.get("https://apis.netstart.cn/yunyuedu/search/getHotWords").then((result)=>{
               console.log(result);
                this.hotsearch = result.data.list;
             
             }).catch((err)=>{
                console.log(err)
             })
          },
          //热搜数据进行搜索
          sethotWord(id){
              this.$router.push({
                path:'/bookdetail',
                id:id,
              })
          },
        
         //关键字搜索
         getkeyword(e){
           
             if(e.target.value != ""){
                this.searchlistIsshow = true;//搜索列表的显隐
                axios.get("https://apis.netstart.cn/yunyuedu/search/searchHint?search="+e.target.value).then((result)=>{
                 //console.log(result);
                 
                this.searList = result.data.words.w;

                console.log(this.searList);
                e.target.value = "";
               
            }).catch((err)=>{
                console.log(err);
            });
                  //设置搜索历史记录
             let keyWords = JSON.parse(localStorage.getItem("keyWords"))
             if(keyWords) {
                keyWords.unshift(e.target.value);
                localStorage.setItem("keyWords",JSON.stringify(keyWords));
             }else {
                localStorage.setItem("keyWords",JSON.stringify([e.target.value]));
             }
             // localStorage.setItem("keyWords",JSON.stringify(e.target.value));
             //JSON.parse(localStorage.getItem("keyWords"));
             console.log(keyWords);
             this.historyList = keyWords;
             }
             
         },
         //隐藏搜索列表
         clear(){
           this.searchlistIsshow = false;
         },
         //清除历史历史记录
         del(){
            localStorage.clear();
            this.historyList = null;
         },
         //前往详情页面
         godetail(title,id){
            this.$router.push({name:'bookdetail',query:{
                title:title,
                id:id,
            }})
         }


       },
       created(){
        this.gethotSearch();
        let keyWords = JSON.parse(localStorage.getItem("keyWords"))
        this.historyList = keyWords;
       }
    }
</script>

<style lang="less" scoped>
     .searchcom {
         background-color: #f7f7f8;
         height: 100%;
         .seaNav {
            padding:10px 0px;
            display: flex;
            background-color: #fff;
           
            .Qxiao {
                 font-size: 12px;
                 color: #808080;
                 width: 38px;
                 text-align: center;
                 height: 24px;
                 line-height: 24px;
                 margin-left: 8px;
            }
             .inpbox {
                 width: 82.1%;
                 height: 24px;
                 line-height: 24px;
                 background-color: #f0f0f0;
                 color: #acacac;
                 font-size: 14px;
                 display: flex;
                 border-radius: 10px;
                 margin-left: 14px;
                 position: relative;
                 .iconfont {
                    display: block;
                     width: 18px;
                     text-align: center;
                     line-height: 24px;
                     margin:0px 8px;
                 }
                 input {
                     border: 0px;
                     flex: 1;
                     border-radius:10px;
                     background-color: #f0f0f0;
                     text-indent: 4px;
                 }
                 .clear {
                     width: 15px;
                     height: 15px;
                     border-radius: 50%;
                     font-size: 12px;
                     color: #fff;
                     text-align: center;
                     line-height: 15px;
                     background-color: #d1cfcd;
                     position: absolute;
                     right: 10px;
                     top: 5px;
                 }
             }
         }
         //热门搜索
         .hot_search {
            padding-top: 25px;
            background-color: #f7f7f8;
            margin-bottom: 30px;
             h3 {
                font-size: 14px;
                color: #a09b96;
                text-indent: 14px;
                font-weight: bold; 
                margin-bottom: 10px;
             }
             ul {
                padding: 0px 24px;
                 display: flex;
                 flex-wrap: wrap;
                 li {
                    width: 50%;
                    height: 30px;
                    line-height: 30px;
                    display: flex;
                    align-items: center;
                     .num {
                         width: 16px;
                         height: 16px;
                         border-radius: 50%;
                         line-height: 16px;
                         font-size: 14px;
                         text-align: center;
                         background: #d6d6d6;
                         color: #fff;
                         margin-right: 10px;
                     }
                     .one1 {
                         background-color: #e64f30;
                     }
                     .one2 {
                         background-color:#ff7510;
                     }
                     .one3 {
                         background-color: #ffc825;
                     }
                     .content {
                         font-size: 12px;
                         color: #202020;
                     }
                 }
             }
         }
         //搜索记录
         .histoty {
             .title {
                 width: 100%;
                 height: 30px;
                 line-height: 30px;
                 display: flex;
                 justify-content: space-between;
                  h3 {
                font-size: 14px;
                color: #a09b96;
                text-indent: 14px;
                font-weight: bold; 
                margin-bottom: 10px;
             }
              .iconfont {
                 font-size: 16px;
                 margin-right: 10px;
              }
             }
             ul {
               display: flex;
               flex-wrap: wrap;
               padding: 10px 14px;
                li {
                    margin:0px 8px 8px 0px;
                    
                     .items {
                         padding:6px;
                         background-color: #f0f0f0;
                         border-radius: 20px;
                         font-size: 12px;
                         .iconfont {
                             width: 14px;
                             height: 14px;
                             font-size: 14px;
                             margin-right: 4px;
                         }
                     }
                }
             }
         }
         .searchlist {
            width: 100%;
            height: 93.1%;
            background-color: #fff;
            position: absolute;
            top: 44px;
            left:0px;
            z-index: 200;
             .list_item {
                 height: 38px;
                 line-height: 38px;
                 background-color:#faf7f5;
                 display: flex;
                 padding: 0px 10px;
                 border-bottom: 1px solid #d1cfcd;
                 .list_content {
                     flex: 1;
                 }
                 .iconfont {
                     margin-right: 10px;
                 }
             }

         }
     }
</style>