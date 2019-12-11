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
    bindLogin () {
      uni.navigateTo({
        url: '../login/login',
      });
    },
    //退出登录
    bindLogout () {
      //清除token
      localStorage.clear()
      //提示
      // this.$message.success('退出成功')
      //来到login组件
      uni.reLaunch({
        url: '../login/login',
      });

    },
    changetabbar () {
      let userC = JSON.parse(localStorage.token)
      let userCode = JSON.stringify(userC.userCode).replace(/"/g, "")
      this.hadlogin = userCode
      uni.setNavigationBarTitle({
        title: this.$t('m.me')
      });    }
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
