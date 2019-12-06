<template>

  <view class="uni-padding-wrap uni-common-mt">
    <view class="uni-flex uni-column">
      <view class="tx">点击按钮控制杆的抬起</view>
      <view
        class="flex-item flex-item-V open"
        @click="inoutCon()"
      >开</view>
      <view class="blank"></view>
      <view class="flex-item">
        <button
          v-if="deviceType=='入口'"
          @click="inspace()"
        >手动入场(车牌识别)</button>
        <br>
        <button @click="spay()">查询费用(车牌识别)</button>
        <br>
        <button @click="handpay()">手动付费(车牌识别)</button>
      </view>
    </view>
  </view>

</template>

<script>
export default {
  data () {
    return {
      title: 'Hello',
      time: "",
      devAdr: "",
      deviceType: "",
      parkName: "",
      inplate: "",
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

      inspaceinfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "devAdr": "",
          "inTm": "",
          "codeType": ""
        }
      },
      inspaceback: "",

      spayinfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "ticketCode": "",
          "plate": "",
        }
      },
      spayback: {},

      handpayinfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "dealId": "",//交易流水号
          "ticketCode": "",//票号
          "stayTm": "",//停留时间
          "shouldPay": "",//应收金额
          "dscountPay": "",//优惠金额
          "realPay": "",//实收金额
          "parkId": "",//停车场ID
          "payMode": "",//支付方式
        }
      },
      handpayback: "",

    }
  },
  onLoad (options) {
    let devAdr = options.devAdr;
    let parkName = options.parkName;
    let deviceType = options.deviceType;
    console.log(devAdr)
    console.log(parkName)
    console.log(deviceType)
    this.devAdr = devAdr
    this.parkName = parkName
    this.deviceType = deviceType

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
    // 手动入场
    inspace () {
      // 从localStorage的Token中获取userCode：U1
      let userC = JSON.parse(localStorage.token)
      let userCode = JSON.stringify(userC.userCode).replace(/"/g, "")
      console.log("从token中获取的userCode:" + userCode)

      this.inspaceinfo.datas.userId = userCode
      this.inspaceinfo.datas.devAdr = this.devAdr
      this.getnow()
      this.inspaceinfo.datas.inTm = this.time
      this.inspaceinfo.datas.codeType = "2"

      let submit = {}
      submit = JSON.stringify(this.inspaceinfo)
      console.log("sub" + submit)
      this.$axios({
        method: 'post',
        url: '/PlateManualEntryHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            this.inspaceback = JSON.parse(res.data.datas).ticketCode
            console.log(res.data.message)
            console.log(this.inspaceback)
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    // 查询费用
    spay () {
      // 从localStorage的Token中获取userCode：U1
      let userC = JSON.parse(localStorage.token)
      let userCode = JSON.stringify(userC.userCode).replace(/"/g, "")
      console.log("从token中获取的userCode:" + userCode)

      this.spayinfo.datas.userId = userCode
      this.spayinfo.datas.ticketCode = this.inspaceback
      this.spayinfo.datas.plate = this.inplate

      let submit = {}
      submit = JSON.stringify(this.spayinfo)
      console.log("sub" + submit)
      this.$axios({
        method: 'post',
        url: '/PlateManualPayHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            this.spayBack = JSON.parse(res.data.datas)
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    //手动付款
    handpay () {
      // 从localStorage的Token中获取userCode：U1
      let userC = JSON.parse(localStorage.token)
      let userCode = JSON.stringify(userC.userCode).replace(/"/g, "")
      console.log("从token中获取的userCode:" + userCode)

      this.handpayinfo.datas.userId = userCode
      this.handpayinfo.datas.ticketCode = this.spayback.ticketCode
      this.handpayinfo.datas.stayTm = this.spayback.stayTm
      this.handpayinfo.datas.shouldPay = this.spayback.shouldPay
      this.handpayinfo.datas.dscountPay = this.spayback.dscountPay
      this.handpayinfo.datas.parkId = this.spayback.parkId
      let submit = {}
      submit = JSON.stringify(this.inoutinfo)
      console.log("sub" + submit)
      this.$axios({
        method: 'post',
        url: '/PlateManualPayHandler.ashx?method=POST&lan=zh-CN&type=app&compress=00',
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
    getnow () {
      var now = new Date()
      let year = now.getFullYear()
      let month = now.getMonth() + 1
      let date = now.getDate()
      let hours = now.getHours()
      let minutes = now.getMinutes()
      let seconds = now.getSeconds()

      var nowtime =
        year + '-' + this.conver(month) + '-' + this.conver(date) + ' ' + this.conver(hours) + ':' + this.conver(minutes) + ':' + this.conver(seconds)

      this.time = nowtime.toString()
      return nowtime.toString()
    },
    conver (a) {
      return a < 10 ? '0' + a : a
    },
    togglePopup (type, open, value) {
      switch (type) {
        case 'top':
          this.content = value
          break
        case 'bottom':
          this.content = value
          break
        case 'center':
          this.content = value
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
  font-size: 50upx;
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
  line-height: 20upx;
}

.flex-item-V {
  width: 100%;
  height: 480upx;
  text-align: center;
  line-height: 480upx;
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