<template>
  <view class="uni-flex uni-column">
    <view class="name">XX咪表</view>
    <view>
      <table>
        <tr>
          <td>ServerID:</td>
          <td>设备名称:</td>
        </tr>
      </table>
    </view>
    <view class="CC">纸币接收</view>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <view class="noV">1块张数</view>
        <view class="noV">188</view>
      </view>
      <view class="flex-item">
        <view class="noV">5块张数</view>
        <view class="noV">188</view>
      </view>
      <view class="flex-item">
        <view class="noV">10块张数</view>
        <view class="noV">188</view>
      </view>
    </view>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <view class="noV">20块张数</view>
        <view class="noV">188</view>
      </view>
      <view class="flex-item">
        <view class="noV">50块张数</view>
        <view class="noV">188</view>
      </view>
      <view class="flex-item">
        <view class="noV">100块张数</view>
        <view class="noV">188</view>
      </view>
    </view>
    <view class="CC">硬币模块</view>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <view class="noV">5角个数</view>
        <view class="noV">100</view>
      </view>
      <view class="flex-item">
        <view class="noV">一元个数</view>
        <view class="noV">188</view>
      </view>
    </view>
    <view class="CC">模块状态</view>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <view class="noV">打印机模块</view>
        <view
          class="noV"
          style="color:green"
        >正常</view>
      </view>
      <view class="flex-item">
        <view class="noV">接收模块</view>
        <view
          class="noV"
          style="color:green"
        >正常</view>
      </view>
    </view>
    <view class="flex-item">
      <view class="noV">找零模块</view>
      <view
        class="noV"
        style="color:green"
      >正常</view>
    </view>
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
  line-height: 80rpx;
  font-size: 20px;
  font-weight: bold;
}

.flex-item {
  width: 33.3%;
  height: 150upx;
  text-align: center;
  line-height: 150upx;
}
.noV {
  padding-top: 15upx;
  font-size: 18px;
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
.tx1 {
  font-size: 18px;
}
table {
  width: 100%;
  tr {
    td {
      width: 50%;
      font-size: 18px;
    }
  }
}
.desc {
  /* text-indent: 40upx; */
}
</style>