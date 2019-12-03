<template>
  <view class="uni-flex uni-column">
    <view class="name">德飞测试停车场</view>
    <view>
      <view class="tt1">停车场：</view>
      <view class="tt1">车位号：</view>
      <view class="tt1">车位锁状态：</view>
    </view>
    <view class="CC">基本控制</view>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="forceopen"
        >强制开</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
        >强制关</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
        >恢复正常</button>
      </view>
    </view>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
        >停止</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
        >车位锁重启</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
        >清除</button>
      </view>
    </view>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
        >检测器重启</button>
      </view>

    </view>

    <view class="CC">
      应急控制
    </view>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
        >查询联机</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
        >开始营业</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
        >关闭营业</button>
      </view>
    </view>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
        >手动入场</button>
      </view>

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
  margin-top: 2%;
  line-height: 100upx;
  background-color: deepskyblue;
  color: white;
  font-size: 24px;
}
.nbt1 {
  margin-top: 20upx;
  margin-left: 10upx;
  margin-right: 10upx;
}

.flex-item {
  width: 33.3%;
  height: 150upx;
  text-align: center;
  line-height: 150upx;
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
button {
  background-color: deepskyblue;
  font-size: 16px;
  height: 85%;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
}
.tt1 {
  font-size: 18px;
}

.desc {
  /* text-indent: 40upx; */
}
</style>