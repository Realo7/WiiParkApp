<template>

  <view class="uni-padding-wrap uni-common-mt">
    <view class="uni-flex uni-column">
      <view class="tx">点击按钮控制杆的抬起</view>
      <view class="flex-item flex-item-V open">开</view>
      <view class="blank"></view>
      <view class="flex-item flex-item-V close">关</view>
    </view>
  </view>

</template>
<style lang="scss">
.open {
  background: url('../../../static/img/openinout.png');
  background-size: 50% 70%;
  background-repeat: no-repeat;
  background-position: center center;
}
.close {
  background: url('../../../static/img/closeinout.png');
  background-size: 50% 70%;
  background-repeat: no-repeat;
  background-position: center center;
}
.blank {
  line-height: 50upx;
  margin-top: 50upx;
}
.tx {
  font-size: 26px;
  font-family: MicroSoft-YaHei;
  text-align: center;
}
.flex-item {
  width: 100%;
  height: 480upx;
  text-align: center;
  line-height: 480upx;
}

.flex-item-V {
  width: 100%;
  height: 480upx;
  text-align: center;
  line-height: 480upx;
  font-size: 50upx;
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
</style>