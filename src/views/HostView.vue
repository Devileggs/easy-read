<template>
    <div class="host">
        <!-- 头部 -->
           <div class="hostNav">
             <div class="isbox" v-if="!isShow">
                <div class="Navimg">
                <img src="../assets/imgs/booktown.png" alt="">
             </div>
              <div @click="tologin" class="hostinfo" >
                <h1>点击登录</h1>
                 <div class="drection">
                     登录即可全场免费读5天
                 </div>
              </div>
             </div>
             <div class="cover" v-else>
                <img src="../assets/imgs/1.jpg" alt="">
             </div>
           </div>
           <!-- 余额，签到 分类-->
           <div class="categry">
            <div class="left">
                <h2>余额</h2>
                <p>充值送红包</p>
                <div class="btn">
                  <span>充值</span>
                </div>
            </div>
            <div class="right">
                <h2>签到</h2>
                <p>做任务领红包</p>
                <div class="btn">
                  <span>签到</span>
                </div>
            </div>
           </div>
           <!-- 主要选项 -->
           <div class="selectbox">
              <div class="selec_item">
                  <span class="iconfont icon-noun__cc"></span>
                   <div class="selname">笔记</div>
                  <span class="iconfont jiantou icon-jiantou_liebiaoxiangyou"></span>
              </div>
              <div class="selec_item">
                  <span class="iconfont icon-shangchuan"></span>
                   <div class="selname">已购和上传</div>
                  <span class="iconfont jiantou icon-jiantou_liebiaoxiangyou"></span>
              </div>
              <div class="selec_item">
                  <span class="iconfont icon-kefu"></span>
                   <div class="selname">在线客服</div>
                  <span class="iconfont jiantou icon-jiantou_liebiaoxiangyou"></span>
              </div>
              <div class="selec_item">
                  <span class="iconfont icon-yueduye-yejianmoshi"></span>
                   <div class="selname">夜间模式</div>
                   <div class="cut" @click="cutShow = !cutShow">
                    <span v-show="cutShow" class="iconfont jiantou icon-kaiguan"></span>
                    <span v-show="!cutShow" class="iconfont jiantou icon-kaiguanclose"></span>
                   </div>
              </div>
              <div class="selec_item">
                  <span class="iconfont icon-zuanshi"></span>
                   <div class="selname">计分商城</div>
                  <span class="iconfont jiantou icon-jiantou_liebiaoxiangyou"></span>
              </div>
              <div class="selec_item">
                  <span class="iconfont icon-shezhi1"></span>
                   <div class="selname" @click="delToken">退出登录</div>
                  <span class="iconfont jiantou icon-jiantou_liebiaoxiangyou"></span>
              </div>
              
           </div>
    </div>
</template>

<script>
    export default {
        data(){
             return {
                 cutShow:true,
                 isShow:false,
             }
        },
        methods:{
             tologin(){
                this.$router.push({name:'login'}) 
             },
             getToken(){
                 let token = localStorage.getItem("token");
                 if(token !=200){
                    this.isShow = false;
                 }else {
                     this.isShow = true;
                 }
             },
             delToken(){
                 let nulltoken = localStorage.getItem("token");
                 if(nulltoken){
                  nulltoken = "";
                  localStorage.setItem("token",JSON.stringify(nulltoken));
                 }
               this.isShow = false;
             }

        },
        created(){
             this.getToken();
        }
    }
</script>

<style lang="less" scoped>
  .host {
    // 头部
     .hostNav {
        .isbox {
        width: 100%;
        height: 60px;
        line-height: 60px;
        display: flex;
        margin-bottom: 18px;
        padding-top: 10px;
           .Navimg {
               width: 60px;
               height: 60px;
               border-radius: 50%;
               background-color: #868686;
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               margin: 0px 12px;
              img {
                  width: 38px;
              }
           }

         .hostinfo {
             flex: 1;
             h1 { 
                font-size: 22px;
                color: #0f0f0f;
                font-weight: bold;
                height: 30px;
                line-height: 30px;
                margin-top: 8px;
             }
             .drection {
                 font-size:12px ;
                 color: #727272;
                 height: 20px;
                 line-height: 20px;
             }
         }
     }
     .cover {
         width: 60px;
         height: 60px;
         border-radius: 50%;
         overflow: hidden;
         margin: 0 auto;
         img {
         width: 60px;
         
         }

     }
     }
     //充值，签到分类
     .categry {
        width: 100%;
        height: 90px;
        display: flex;
        padding-bottom: 10px;
        box-shadow: 0px 7px 11px #e7e7eb;
      .left,.right{
         flex: 1;
         text-align: center;
         h2 {
             font-size: 16px;
             color: #242424;
             height: 30px;
             font-weight: 600;
             line-height: 30px;
         }
         p {
             font-size: 12px;
             color: #9b9b9b;
             margin-bottom: 12px;
         }
         .btn {
             span {
                 padding: 3px 20px;
                 background-color:red;
                 color: #fff;
                 font-size: 12px;
                 border-radius: 20px;
             }
         }
      }
      .left {
         border-right: 1px solid #f6f6f6;
      }
      .right {
         .btn {
             span {
                 background-color: #fff;
                 color: red;
                 border: 1px solid red;
             }
         }
      }
     }
     //主要选项
     .selectbox {
        width: 100%;
        margin-top: 14px;
         .selec_item {
            .cut {
                 .icon-kaiguan {
                    transform: rotate(180deg);
                 }
            }
            width: 100%;
            height: 50px;
            line-height: 50px;
            display: flex;
            font-size: 18px;
            color: #868686;
            position: relative;
            .iconfont {
                 font-size: 26px;
                 color: #c2c2c2;
                 margin: 0px 18px;
            } 
            .jiantou {
                 position: absolute;
                 right: 10px;
                 top: 0px;
                 margin: 0px;
            }
         }
     }
  }
  
</style>