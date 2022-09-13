<template>
    <div class="localbook">
           <div class="loginNav">
      <router-link tag="div" to="host" class="back">
        <span class="iconfont icon-chacha"></span>
      </router-link>
      <div class="title">本地书</div>
      <div class="kong"></div>
    </div>
    <div class="books" v-if="localbooklist">
      <ul>
        <li v-for="(item,index) in localbooklist" :key="index">
          <div class="img" @click="godetail(item.id,item.title)">
            <img :src="item.cover" alt="" />
          </div>
          <div class="info">
            <h3 class="name">{{ item.title }}</h3>
            <p class="count">{{ item.author }}</p>
          </div>
          <div class="del" @click="remove">移出本地</div>
        </li>
      </ul>
    </div> 
      <div class="booknull" v-if="!localbooklist">
         暂无本地书
      </div>
    </div>
</template>

<script>
    export default {
         data(){
             return {
                 localbooklist:[],//本地书列表
             }
         },
         
         methods:{
             getbooklist(){
                 this.localbooklist = JSON.parse(localStorage.getItem("localbooks"));
                 //console.log(this.localbooklist);
             },
             //删除
             remove(e){
                 e.path[1].remove();
              },
                //页面跳转
    godetail(id,title){
       this.$router.push({name:'bookdetail',query:{id:id,title:title}});
    },
         },
         created(){
             this.getbooklist();
         }
    }
</script>

<style lang="less" scoped>
 .localbook {

     .loginNav {
    width: 100%;
    height: 34px;
    line-height: 34px;
    display: flex;
    background: #fff;
    .iconfont {
      display: block;
      width: 40px;
      text-align: center;
      color: #aeadab;
      height: 34px;
      font-size: 20px;
    }
    .title {
      font-size: 18px;
      flex: 1;
      font-weight: 600;
      text-align: center;
      color: #000;
    }
    .kong{
       width: 40px;
       height: 34px;
    }
  }
.books {
    width: 100%;
    padding: 0px 14px;
    box-sizing: border-box;
    margin-top: 20px;

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        margin-bottom: 10px;
        margin-right: 23px;
        &:nth-child(3n) {
          margin-right: 0px;
        }
        .del {
             font-size: 12px;
             color: red;
             text-align: center;
        }
        .img {
          width: 100px;
          height: 138px;
          margin-bottom: 10px;
          img {
            width: 100px;
            height: 138px;
          }
        }
        .name {
          font-size: 12px;
          color: #555555;
          width: 100px;
          height: 15px;
          line-height: 15px;
          white-space: nowrap; /* 强制文本在一行中显示 */
          overflow: hidden; /* 溢出隐藏*/
          text-overflow: ellipsis; /* 文本超出后显示省略号*/
        }
        .count {
          width: 100px;
          margin-top: 17px;
          font-size: 12px;
          color: #c7c7c7;
          white-space: nowrap; /* 强制文本在一行中显示 */
          overflow: hidden; /* 溢出隐藏*/
          text-overflow: ellipsis; /* 文本超出后显示省略号*/
        }
      }
    }
  }
 .booknull {
     width: 100%;
     height: 94.9vh;
     background-color: #c7c7c7;
     color: #000;
     text-align: center;
     font-size: 16px;
 }
     }
</style>