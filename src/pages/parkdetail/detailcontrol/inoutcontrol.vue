<template>

  <view class="uni-padding-wrap uni-common-mt">
    <view class="uni-flex uni-column">
      <view class="tx">点击按钮控制杆的抬起</view>
      <view
        class="flex-item flex-item-V open"
        @click="inoutCon()"
      >开</view>
      <view class="blank"></view>
      <!-- <view class="flex-item flex-item-V close">关</view> -->
    </view>
  </view>

</template>

<script>
export default {
  data () {
    return {
      title: 'Hello',
      devAdr: "",
      parkName: "",
      inoutinfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "deviceAdr": "",
          "dealtype": "",
          "serialNum": "",
          "reason": "",
          "callId": "",
          "reasonId": "",

        }
      },
      inoutback: [],
    }
  },
  onLoad (options) {
    let devAdr = options.devAdr;
    let parkName = options.parkName;
    console.log(devAdr)
    console.log(parkName)
    this.devAdr = devAdr
    this.parkName = parkName

  },
  methods: {
    inoutCon () {
      // 从localStorage的Token中获取userCode：U1
      let userC = JSON.parse(localStorage.token)
      let userCode = JSON.stringify(userC.userCode).replace(/"/g, "")
      console.log("从token中获取的userCode:" + userCode)

      this.inoutinfo.datas.userId = userCode
      this.inoutinfo.datas.deviceAdr = this.devAdr
      // this.inoutinfo.datas.reasonId = "1"


      let submit = {}
      submit = JSON.stringify(this.inoutinfo)
      console.log("sub" + submit)
      this.$axios({
        method: 'post',
        url: '/OpenGateFuncHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            // this.recordBack = JSON.parse(JSON.parse(res.data.datas).list)
            console.log(res.data.message)
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },

  },
  mounted () {

  }
}
</script>
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