<template>
  <view class="content">
    <uni-search-bar
      radius="100"
      :placeholder="$t('m.plzinput')"
      @confirm="search"
    />
    <uni-list>
      <uni-list-item
        :show-badge="true"
        title=""
        badge-text="2"
        @click="goindetail()"
      >
        <table id="tb1">
          <tr>
            <td class="td1">{{$t('m.parkname')}}</td>
            <td class="td1">{{$t('m.totalnum')}}</td>
          </tr>
          <tr>
            <td class="td1">{{$t('m.hadstopednum')}}</td>
            <td class="td1">{{$t('m.remainnum')}}</td>
          </tr>
        </table>
      </uni-list-item>
    </uni-list>
    <!-- 测试i18n的用法，回头移除 -->
    <view class="ul">
      <span v-text="$t('m.tip1')"></span>
    </view>

  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
  data () {
    return {

    }
  },
  methods: {
    goindetail () {
      uni.navigateTo({
        url: '../parkdetail/parkdetail',
      });
    },

  },

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
#tb1 {
  // border: 1px solid #f00;
  width: 100%;
  tr {
    .td1 {
      width: 50%;
      // border: 1px solid #f00;
    }
    .td2 {
      width: 50%;
      // border: 1px solid #f00;
    }
  }
}
</style>
