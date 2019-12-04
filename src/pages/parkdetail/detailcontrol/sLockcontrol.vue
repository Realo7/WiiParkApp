<template>
  <view class="uni-flex uni-column">
    <!-- <view class="name">德飞测试停车场</view> -->
    <view>
      <view class="tt1">停车场：绿地之窗停车场</view>
      <view class="tt1">车位号：001</view>
      <view class="tt1">车位锁状态：上升到位</view>
    </view>
    <view class="CC">基本控制</view>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom (COpen)"
        >强制开</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom (CClose)"
        >强制关</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom (CNormal)"
        >恢复正常</button>
      </view>
    </view>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom (CStop)"
        >停止</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom (Reboot)"
        >车位锁重启</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom (CClearErr)"
        >清除</button>
      </view>
    </view>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom (CLVDReboot)"
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
          @click="slockcom (CServerCheckLock)"
        >查询联机</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom (COpenBus)"
        >开始营业</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom (CCloseBus)"
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
      lol: "lol",
      slockinfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "parkLockId": "",
          "command": "",
          "devType": "1"
        }
      }

    }
  },
  onLoad (options) {
    let parkLockNum = options.parkLockNum;
    console.log(parkLockNum)
    this.slockInfo.datas.parkLockId = parkLockNum
  },
  methods: {
    slockcom (value) {
      // 从localStorage的Token中获取userCode：U1
      let userC = JSON.parse(localStorage.token)
      let userCode = JSON.stringify(userC.userCode).replace(/"/g, "")
      // console.log("从token中获取的userCode:" + userCode)
      this.slockInfo.datas.userId = userCode

      this.slockinfo.datas.command = value
      let submit = {}
      submit = JSON.stringify(this.slockInfo)
      console.log(submit)
      this.$axios({
        method: 'post',
        url: '/ParkLockControlHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            console.log(res.data.message)
            this.togglePopup('bottom', 'popup')
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })

    },
    togglePopup (type, open) {
      switch (type) {
        case 'top':
          this.content = '顶部弹出 popup'
          break

        case 'bottom':
          this.content = '操作成功'
          break
        case 'center':
          this.content = '居中弹出 popup'
          break
      }
      this.type = type
      this.$nextTick(() => {
        this.$refs['show' + open].open()
      })
    },
    cancel (type) {
      this.$refs['show' + type].close()
    },
    change (e) {
      console.log('是否打开:' + e.show)
    }
  },
  onBackPress () {
    this.$refs['showpopup'].close()
    this.$refs['showtip'].close()
    this.$refs['showimage'].close()
    this.$refs['showshare'].close()
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