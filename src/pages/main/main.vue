<template>
  <view class="content">
    <view
      v-if="hasLogin"
      class="hello"
    >
      <view class="title">
        您好 {{userName}}，您已成功登录。
        下拉刷新，lsit列表，搜索
      </view>

    </view>
    <view
      v-if="!hasLogin"
      class="hello"
    >
      <view class="title">
        您好 游客。
      </view>
      <uni-list>
        <uni-list-item
          :show-badge="true"
          title="列表右侧带箭头 + 角标"
          badge-text="2"
          @click=""
        />
      </uni-list>
      <view class="ul">
        <span v-text="$t('m.tip1')"></span>
      </view>
    </view>
  </view>
</template>

<script>
import {
  mapState
} from 'vuex'
import uniSection from '@/components/uni-section/uni-section.vue'
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
export default {
  components: {
    uniSection,
    uniList,
    uniListItem
  },
  computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
  data () {
    return {
      extraIcon1: {
        color: '#007aff',
        size: '22',
        type: 'gear-filled'
      },
      extraIcon2: {
        color: '#4cd964',
        size: '22',
        type: 'image'
      }
    }
  },
  methods: {
    switchChange (e) {
      uni.showToast({
        title: 'change:' + e.value,
        icon: 'none'
      })
    }
  },
  onLoad () {
    if (!this.hasLogin) {
      uni.showModal({
        title: '未登录',
        content: '您未登录，需要登陆之后才能继续浏览主页',
        /**
         * 如果需要强制登录，不显示取消按钮
         */
        showCancel: !this.forcedLogin,
        success: (res) => {
          if (res.confirm) {
            /**
             * 如果需要强制登录，使用reLaunch方式
             */
            if (this.forcedLogin) {
              uni.reLaunch({
                url: '../login/login'
              });
            } else {
              uni.navigateTo({
                url: '../login/login'
              });
            }
          }
        }
      });
    }
  }
}
</script>

<style lang="scss">
.popup-btn {
  margin-top: 10px;
}
.hello {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.title {
  color: #8f8f94;
  margin-top: 25px;
}

.ul {
  font-size: 15px;
  color: #8f8f94;
  margin-top: 25px;
}

.ul > view {
  line-height: 25px;
}

/* #ifdef MP-TOUTIAO */
@font-face {
  font-family: uniicons;
  font-weight: normal;
  font-style: normal;
  src: url('~@/static/uni.ttf') format('truetype');
}

/* #endif */

/* #ifndef APP-NVUE */
page {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #efeff4;
  min-height: 100%;
  height: auto;
}

view {
  font-size: 28rpx;
  line-height: inherit;
}

.example {
  padding: 0 30rpx 30rpx;
}

.example-info {
  padding: 30rpx;
  color: #3b4144;
  background: #ffffff;
}

.example-body {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  font-size: 14rpx;
  background-color: #ffffff;
}

/* #endif */
.example {
  padding: 0 30rpx;
}

.example-info {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  padding: 30rpx;
  color: #3b4144;
  background-color: #ffffff;
  font-size: 30rpx;
}

.example-info-text {
  font-size: 28rpx;
  line-height: 36rpx;
}

.example-body {
  flex-direction: column;
  padding: 30rpx;
  background-color: #ffffff;
}

.word-btn-white {
  font-size: 18px;
  color: #ffffff;
}

.word-btn {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  height: 48px;
  margin: 15px;
  background-color: #007aff;
}

.word-btn--hover {
  background-color: #4ca2ff;
}
</style>
