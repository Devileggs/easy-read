<template>
  <div class="login">
    <div class="loginNav">
      <router-link tag="div" to="host" class="back">
        <span class="iconfont icon-chacha"></span>
      </router-link>
      <div class="title">登录</div>
      <div class="kong"></div>
    </div>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="btn" style="margin: 16px" @click="logins">
          <van-button round block type="info" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
      <div class="opear">
         <div class="splie">
            忘记密码
         </div>
         <router-link tag="div" to="/regin" class="regin">
            手机号注册
         </router-link>
      </div>
    </div>
    <div class="footer">
        <div class="contbox">
            <div class="cont-title">
                <div class="item">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-weixin"></use>
                    </svg>
                </div>
                <div class="item">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-weibo"></use>
                    </svg>
                </div>
                <div class="item">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mail"></use>
                    </svg>
                </div>
            </div>
            <div class="agreen">
                <input type="checkbox">
                <div class="treaty">
                    您已经同意“<span>服务条款</span>”、“ <span>隐私政策</span> ”和“ <span>网易云阅读儿童个人信息保护规则及监护人须知</span> ”
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script src="./iconfont.js"></script>
<script>
import {Toast} from "vant";
export default {
    
  data() {
    return {
      phone: "",
      password: "",
      userinfo:"",
    };
  },
  methods: {
      onSubmit(values) {
     // console.log("submit", values);
     this.userinfo = values;
     console.log(this.userinfo);
    },
   
    //取消登录注册
    // goback(){
    //      this.$router.go(-1);
    // },
    logins(){
         if (this.phone != "" && this.password != "") {
         let userInfoes = JSON.parse(localStorage.getItem("userInfoes"));
             
          let flag=userInfoes.filter((item)=>{
                 return item.userphone==this.phone && item.userpass == this.password;
             })
             console.log(flag);
        if(flag !=""){
             Toast("登录成功！");
             localStorage.setItem("token",200);
             this.$router.push({name:'host'});
        }else {
             Toast("用户不存在,请正确输入或前往注册");
        }
             
              
      } else {
        return;
      }
    }
  },
};
</script>

<style lang="less" scoped>

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.login {
  background-color: #fafafa;
  width: 100%;
  height: 100%;
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
    .kong {
       width: 40px;
       height: 34px;
    }
  }
  .content {
    width: 85.6%;
    margin: 0 auto;
    padding-top: 76px;
    .van-cell {
      background: #fafafa;
      border: 1px solid #e8e8e8;
      border-radius: 30px;
      margin-bottom: 10px;
    }
    
    .van-button--info {
    color: #fff;
    background-color: #f0a494;
    border: 1px solid #f0a494;
   }
    .opear {
         display: flex;
         justify-content: space-between;
         font-size: 14px;
         color: #898989;
         .regin {
             color: #e96f56;
         }
    }
  }
  .footer {
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 0px;
    box-sizing: border-box;
    padding: 8px 16px;
     .contbox {
         .cont-title {
             display: flex;
             justify-content: space-around;
             .item {
                 width: 50px;
                 height: 40px;
                 line-height: 40px;
                 text-align: center;
                 .icon {
                     font-size: 24px;
                 }
             }
         }
         .agreen {
             width: 100%;
             height: 50px;
             display: flex;
            .treaty {
                 margin-left: 4px;
                 span {
                     color: #79ace3;
                 }
            }
         }
     }

  }
}
</style>