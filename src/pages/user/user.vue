<template>
  <view class="content">
    <view class="btn-row">
      <button
        v-if="!hadlogin"
        type="primary"
        class="primary"
        @tap="bindLogin"
      >{{$t('m.login')}}</button>
      <button
        v-if="hadlogin"
        type="primary"
        class="primary"
        @tap="bindLogout"
      >{{$t('m.loginout')}}</button>
    </view>
  </view>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'

export default {
  data () {
    return {
      state: false,
      hadlogin: "",
    }
  },
  computed: {
  },
  methods: {
    getuserCode () {
      var userCode
      uni.getStorage({
        key: "token",
        success (e) {
          let userC = JSON.parse(e.data)
          
          userCode = userC.userCode
          console.log("从token中取出" + userCode)

        }
      })
      return userCode
    },
    bindLogin () {
      uni.navigateTo({
        url: '../login/login',
      });
    },
    //退出登录
    bindLogout () {
      //清除token
      uni.clearStorage()
      //提示
      // this.$message.success('退出成功')
      //来到login组件
      uni.reLaunch({
        url: '../login/login',
      });

    },
    changetabbar () {
      this.hadlogin = this.getuserCode()
      uni.setNavigationBarTitle({
        title: this.$t('m.me')
      });
    }
  },
  mounted () {
    this.changetabbar()
  }
}
</script>

<style>
.primary {
  width: 80%;
  margin-top: 90%;
}
.content {
  display: flex;
  flex: 1;
  flex-direction: column;

  padding: 10px;
}
</style>
