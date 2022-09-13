<template>
  <div class="login">
    <div class="loginNav">
      <div class="back" @click="goback">
        <span class="iconfont icon-chacha"></span>
      </div>
      <div class="title">手机号注册</div>
      <div class="kong"></div>
    </div>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
          v-model="Phone"
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
        <div class="btn" style="margin: 16px" @click="addUser">
          <van-button round block type="info" native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script src="./iconfont.js"></script>
<script>
import { Toast } from "vant";
export default {
  name: "regin",
  data() {
    return {
      Phone: "",
      password: "",
    };
  },
  methods: {
    onSubmit(values) {
      // console.log("submit", values);
    },
    //取消注册
    goback() {
      this.$router.go(-1);
    },
    //注册提交数据

    addUser() {
      if (this.phone != "" || this.password != "") {
        let userInfo = {
          userphone: this.Phone,
          userpass: this.password,
        };

        let userInfoes = JSON.parse(localStorage.getItem("userInfoes"));
        if (userInfoes) {
          userInfoes.unshift(userInfo);
          localStorage.setItem("userInfoes", JSON.stringify(userInfoes));
        } else {
          localStorage.setItem("userInfoes", JSON.stringify([userInfo]));
        }
        Toast("注册成功");
        setTimeout(() => {
          this.$router.push({ name: "login" });
        }, 2000);
      }
    },
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
    .kong{
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
  }
}
</style>