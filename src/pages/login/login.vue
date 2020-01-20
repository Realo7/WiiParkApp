<template>
  <view class="content">
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
      <!-- 记住密码 -->
      <view class="remember-psw">
        <checkbox-group>
          <label>
            <checkbox
              value="psw"
              :checked='rememberPsw'
              @tap="rememberPsw =! rememberPsw"
              color="#09CC86"
            />记住密码</label>
        </checkbox-group>
      </view>

      <view class="btn-row">
        <button
          type="primary"
          class="btnlogin"
          @tap="bindLogin"
        >{{i18n.login}}</button>
      </view>
      <div class="div1">
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
    </view>

  </view>
</template>

<script>
import mInput from '../../components/m-input.vue'
export default {
  computed: {
    i18n () {
      return this.$t('m')
    }
  },
  components: {
    mInput,
  },
  data () {
    return {
      rememberPsw: true,
      enactive: false,
      cnactive: true,
      providerList: [],
      hasProvider: false,
      account: '',
      password: '',

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
      },
      textArr: [
        { text: this.$t('m.parkmanagement') },
        { text: this.$t('m.parkrecord') },
        { text: this.$t('m.InfoQuery') },
        { text: this.$t('m.me') }
      ],
      titleArr: [
        { text: this.$t('m.login') },
        { text: this.$t('m.parkmanagement') },
        { text: this.$t('m.me') },
        { text: this.$t('m.parkrecord') },
        { text: this.$t('m.Other') },
        { text: this.$t('m.querymessage') },
        { text: this.$t('m.parkabout') },
        { text: this.$t('m.slockcontrol') },
        { text: this.$t('m.inoutcontrol') },
        { text: this.$t('m.micontorl') },
      ]
    }
  },

  methods: {
    bindLogin () {
      const that = this
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
       * 检测用户账号密码是否在已注册的用户列表中
       * 使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
       */
      this.loginInfo.datas.userCode = this.account
      this.loginInfo.datas.passWord = this.password

      let submit = {}
      submit = JSON.stringify(this.loginInfo)
      uni.request({
        method: 'POST',
        url: this.$baseurl + '/CustomerLogInHandler.ashx?method=POST&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: submit,
        success: (res => {
          console.log("成功" + res)
          //保存后台返回的token到Storage
          // localStorage.setItem('token', res.data.datas)
          uni.setStorage({
            key: "token",
            data: res.data.datas,
          })
          // console.log("wesadw")
          //跳转home
          if (res.data.statusCode == '200') {
            //登录成功将用户名密码存储到用户本地
            this.toMain()
            if (this.rememberPsw) {//用户勾选“记住密码”
              uni.setStorageSync('userName', this.account);
              uni.setStorageSync('userPsw', this.password);
            } else {//用户没有勾选“记住密码”
              uni.removeStorageSync('userName');
              uni.removeStorageSync('userPsw');
              this.account = "";
              this.password = "";
            }
          } else {
            alert('账号或者密码错误')
          }
        }),
        fail: (err => {
          console.log('出现了错误' + err)
        })
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

      uni.setNavigationBarTitle({
        title: this.$t('m.login')
      });
    },
    changecn () {
      this.lang = 'zh-CN';
      this.$i18n.locale = this.lang;//关键语句
      this.enactive = !this.enactive
      this.cnactive = !this.cnactive

      uni.setNavigationBarTitle({
        title: this.$t('m.login')
      });
    }
  }, //方法体的结尾
  onReady () {
    // this.initPosition();

  },
  mounted () {
    let that = this;
    //页面加载完成，获取本地存储的用户名及密码
    const userName = uni.getStorageSync('userName');
    const userPsw = uni.getStorageSync('userPsw');
    if (userName && userPsw) {
      that.account = userName;
      that.password = userPsw;
    } else {
      that.account = "";
      that.password = "";
    }
  },
}
</script>

<style lang="scss" scoped>
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
  width: 600rpx;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
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
.div1 {
  margin-top: 63%;
}
.enbtn {
  width: 35%;
  margin-left: 15%;
  float: left;
  background-color: #007aff;
  color: #fff;
}
.cnbtn {
  width: 35%;
  margin-right: 15%;
  float: left;
  background-color: #007aff;
  color: #fff;
}
.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #efeff4;
  padding: 10px;
  min-height: 100%;
}
page {
  background-color: #efeff4;
  min-height: 100%;
  display: flex;
  font-size: 16px;
}

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
  margin-left: 5%;
  width: 90%;
}

.input-group::before {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}

.input-group::after {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}

.input-row {
  display: flex;
  flex-direction: row;
  font-size: 18px;
  line-height: 40px;
  margin-top: 8px;
}

.input-row .title {
  width: 72px;
  padding-left: 15px;
}

.input-row.border::after {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}

.btn-row {
  margin-top: 25px;
  padding: 10px;
}
.remember-psw {
  margin-top: 30upx;
  margin-left: 70%;
}

button.primary {
  background-color: #0faeff;
}
</style>
