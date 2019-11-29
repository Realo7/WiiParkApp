<template>
  <view class="uni-flex uni-column">
    <view class="name">停车场名称</view>
    <view>
      <view>停车场：</view>
      <view>车位号：</view>
      <view>车位锁状态：</view>
    </view>
    <view class="CC">基本控制</view>
    <view class="uni-flex uni-row">
      <view
        class="flex-item uni-bg-red"
        @click="forceopen"
      >强制开</view>
      <view class="flex-item uni-bg-green">强制关</view>
      <view class="flex-item uni-bg-blue">恢复正常</view>
    </view>
    <view class="uni-flex uni-row">
      <view class="flex-item uni-bg-green">停止</view>
      <view class="flex-item uni-bg-blue">车位锁重启</view>
      <view class="flex-item uni-bg-red">清除</view>
    </view>
    <view class="uni-flex uni-row">
      <view class="flex-item uni-bg-blue">检测器重启</view>

    </view>

    <view class="CC">应急控制</view>
    <view class="uni-flex uni-row">
      <view class="flex-item uni-bg-red">查询联机</view>
      <view class="flex-item uni-bg-green">开始营业</view>
      <view class="flex-item uni-bg-blue">关闭营业</view>
    </view>
    <view class="uni-flex uni-row">
      <view class="flex-item uni-bg-green">手动入场</view>

    </view>
  </view>
</template>
<script>
export default {

  data () {
    return {
      lol: "lol"
    }
  },
  methods: {
    forceopen () {
      alert("强制卡")
    }

  }

}
</script>
<style lang="scss">
.name {
  text-align: center;
  font-size: 20px;
}
.CC {
  text-align: center;
  line-height: 80rpx;
  background-color: aqua;
}

.flex-item {
  width: 33.3%;
  height: 150upx;
  text-align: center;
  line-height: 200upx;
}

.flex-item-V {
  width: 100%;
  height: 150upx;
  text-align: center;
  line-height: 150upx;
}

.text {
  margin: 15upx 10upx;
  padding: 0 20upx;
  background-color: #ebebeb;
  height: 70upx;
  line-height: 70upx;
  text-align: center;
  color: #777;
  font-size: 26upx;
}

.desc {
  /* text-indent: 40upx; */
}
</style>