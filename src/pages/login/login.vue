<template>
  <view class="content">
    <div>
      <button
        class="enbtn"
        @click="changeen()"
        :disabled="enactive"
      >English</button>
      <button
        class="cnbtn"
        @click="changecn()"
        :disabled="cnactive"
      >中文</button>
    </div>

    <image
      class="logo"
      src="/static/img/logo_huxiaor.png"
    ></image>
    <view class="input-group">
      <view class="input-row border">
        <image
          class="logo left"
          src="/static/img/yonghuming.png"
        ></image>
        <m-input
          class="m-input"
          type="text"
          clearable
          focus
          v-model="account"
          :placeholder="$t('m.pleaseinputyouraccount')"
        ></m-input>
      </view>
      <view class="input-row">
        <image
          class="logo left"
          src="/static/img/mima.png"
        ></image>
        <m-input
          type="password"
          displayable
          v-model="password"
          :placeholder="$t('m.pleaseinputyourpassword')"
        ></m-input>
      </view>
    </view>
    <view class="btn-row">
      <button
        type="primary"
        class="btnlogin"
        @tap="bindLogin"
      >{{$t('m.login')}}</button>
    </view>

  </view>
</template>

<script>
import service from '../../service.js';
import {
  mapState,
  mapMutations
} from 'vuex'
import mInput from '../../components/m-input.vue'

export default {
  components: {
    mInput
  },
  data () {
    return {
      enactive: false,
      cnactive: true,
      providerList: [],
      hasProvider: false,
      account: '',
      password: '',
      positionTop: 0,
      loginInfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userCode": "",
          "loginType": "1",
          "passWord": "",
          "SMSCode": "",
          "userType": "2",
        }
      }
    }
  },
  computed: mapState(['forcedLogin']),
  methods: {
    ...mapMutations(['login']),

    initPosition () {
      /**
       * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
       * 反向使用 top 进行定位，可以避免此问题。
       */
      this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
    },
    bindLogin () {
      /**
       * 客户端对账号信息进行一些必要的校验。
       * 根据业务需要进行处理，这里仅做示例。
       */
      if (this.account.length < 3) {
        uni.showToast({
          icon: 'none',
          title: '账号最短为 3 个字符'
        });
        return;
      }
      if (this.password.length < 6) {
        uni.showToast({
          icon: 'none',
          title: '密码最短为 6 个字符'
        });
        return;
      }
      /**
       * 下面简单模拟下服务端的处理
       * 检测用户账号密码是否在已注册的用户列表中
       * 使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
       */
      this.loginInfo.datas.userCode = this.account
      this.loginInfo.datas.passWord = this.password
      let submit = {}
      submit = JSON.stringify(this.loginInfo)
      this.$axios({
        method: 'post',
        url: '/CustomerLogInHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          console.log(res)
          //保存后台返回的token到localStorage
          localStorage.setItem('token', res.data.datas)
          // localStorage.setItem('user', this.formdata.datas.userCode)
          //跳转home
          if (res.data.statusCode == '200') {
            this.toMain()
          } else {
            alert('账号或者密码错误')
          }
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })

    },

    toMain () {
      uni.reLaunch({
        url: '../main/main',
      });


    },
    // 切换语言
    changeen () {
      this.lang = 'en-US';
      this.$i18n.locale = this.lang;//关键语句
      this.enactive = !this.enactive
      this.cnactive = !this.cnactive
    },
    changecn () {
      this.lang = 'zh-CN';
      this.$i18n.locale = this.lang;//关键语句
      this.enactive = !this.enactive
      this.cnactive = !this.cnactive
    }
  }, //方法体的结尾
  onReady () {
    this.initPosition();
  }
}
</script>

<style lang="scss" scoped>
.action-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.action-row navigator {
  color: #007aff;
  padding: 0 10px;
}

.oauth-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.oauth-image {
  width: 50px;
  height: 50px;
  border: 1px solid #dddddd;
  border-radius: 50px;
  margin: 0 20px;
  background-color: #ffffff;
}

.oauth-image image {
  width: 30px;
  height: 30px;
  margin: 10px;
}
.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 100rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 150rpx;
}
.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.btnlogin {
  width: 400rpx;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
  background-color: black;
}

.inp {
  width: 500rpx;
  background: none;
  border: none;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10%;
  margin-left: auto;
  font-size: 26rpx;
}

.content_input {
  display: flex;
  flex-direction: row;
  margin: 3%;
}

.left {
  width: 50rpx;
  height: 50rpx;
  display: flex;
  flex-direction: column;
  margin: 5px;
}

.right {
  width: 500rpx;
  height: 70rpx;
  display: flex;
  flex-direction: column;
  margin: 5px;
}
.enbtn {
  width: 35%;
  margin-left: 15%;
  float: left;
  background-color: black;
  color: #fff;
}
.cnbtn {
  width: 35%;
  margin-right: 15%;
  float: left;
  background-color: black;
  color: #fff;
}
.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #efeff4;
  padding: 10px;
}
page {
  min-height: 100%;
  display: flex;
  font-size: 16px;
}

/* 每个页面公共css */

/* #ifdef MP-BAIDU */
page {
  width: 100%;
  height: 100%;
  display: block;
}

swan-template {
  width: 100%;
  min-height: 100%;
  display: flex;
}

/* 原生组件模式下需要注意组件外部样式 */
custom-component {
  width: 100%;
  min-height: 100%;
  display: flex;
}

/* #endif */

/* #ifdef MP-ALIPAY */
page {
  min-height: 100vh;
}

/* #endif */

/* 原生组件模式下需要注意组件外部样式 */
m-input {
  width: 100%;
  /* min-height: 100%; */
  display: flex;
  flex: 1;
}

.input-group {
  background-color: #efeff4;
  margin-top: 0px;
  position: relative;
  margin-left: 5%;
  width: 90%;
}

.input-group::before {
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  height: 1px;
  content: '';
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}

.input-group::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  content: '';
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}

.input-row {
  display: flex;
  flex-direction: row;
  position: relative;
  font-size: 18px;
  line-height: 40px;
  margin-top: 8px;
}

.input-row .title {
  width: 72px;
  padding-left: 15px;
}

.input-row.border::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 8px;
  height: 1px;
  content: '';
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}

.btn-row {
  margin-top: 25px;
  padding: 10px;
}

button.primary {
  background-color: #0faeff;
}
</style>
