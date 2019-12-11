<template>
  <view class="uni-flex uni-column outout">
    <!-- <view class="name">德飞测试停车场</view> -->
    <view>
      <view class="tt1">{{$t('m.parkname')}}：{{parkName}}</view>
      <view class="tt1">{{$t('m.parklocknum')}}：{{parkLockNum}}</view>
      <view class="tt1">{{$t('m.parklockstate')}}：{{parkLockState}}</view>
    </view>
    <view class="CC1">{{$t('m.basecontrol')}}</view>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom ('COpen')"
        >{{$t('m.forceopen')}}</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom ('CClose')"
        >{{$t('m.forceclose')}}</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom ('CNormal')"
        >{{$t('m.renormal')}}</button>
      </view>
    </view>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom ('CStop')"
        >{{$t('m.cease')}}</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom ('Reboot')"
        >{{$t('m.parklockrestart')}}</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom ('CClearErr')"
        >{{$t('m.clean')}}</button>
      </view>
    </view>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom ('CLVDReboot')"
        >{{$t('m.detectorrestart')}}</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="selectM()"
        >{{$t('m.selectM')}}</button>
      </view>
      <!-- <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="handpay()"
        >手动付费</button>
      </view> -->
    </view>

    <view class="CC2">
      {{$t('m.emergencycontrol')}}
    </view>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom ('CServerCheckLock')"
        >{{$t('m.selectlink')}}</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom (
          COpenBus)"
        >{{$t('m.startbusiness')}}</button>
      </view>
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="slockcom ('CCloseBus')"
        >{{$t('m.closebusiness')}}</button>
      </view>
    </view>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <button
          type="primary"
          class="nbt1"
          @click="handin"
        >{{$t('m.handinpark')}}</button>
      </view>

    </view>
    <!-- <view style="height: 400px;"></view> -->
    <uni-popup
      ref="showpopup"
      :type="type"
      @change="change"
    >
      <view class="popup-content">
        {{ content }}
        <view style="text-align: center;margin-right:20upx;">
          <image
            v-if="content=='请等待'||content=='please wait'"
            class="loadingimg"
            src="../../../static/img/loading.gif"
          >
        </view>
      </view>

    </uni-popup>
    <uni-popup
      ref="showtip"
      :type="type"
      :mask-click="false"
      @change="change"
    >
      <view class="uni-tip">
        <text class="uni-tip-title">{{$t('m.payment')}}</text>

        <view class="uni-tip-content">
          <div>{{$t('m.Transactionnumber')}}：{{selectMback.shouldPay}}</div>
          <div>{{$t('m.parklocknum')}}：{{selectMback.parkLockNum}}</div>
          <div>{{$t('m.intime')}}：{{selectMback.inTm}}</div>
          <div>{{$t('m.staytime')}}：{{selectMback.stayTm}}</div>
          <div>{{$t('m.Preferentialamount')}}：{{selectMback.dscountPay}}</div>

          {{$t('m.Youneedtopay')}}{{selectMback.shouldPay}}{{$t('m.yuan')}}
        </view>
        <view class="uni-tip-group-button">
          <text
            class="uni-tip-button"
            @click="cancel('tip')"
          >{{$t('m.cancel')}}</text>
          <text
            class="uni-tip-button"
            @click="handpay()"
          >{{$t('m.handpay')}}</text>
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script>
export default {

  data () {
    return {
      time: "",
      lol: "lol",
      type: '',
      content: 'popup',
      parkName: {},
      parkLockState: {},
      parkLockId: {},
      parkLockNum: "",
      slockinfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "parkLockId": "",
          "command": "",
          "devType": "1"
        }
      },
      selectMinfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "parkLockId": "",
        }
      },
      selectMback: {},
      handininfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "parkLockId": "",
          "inTm": ""
        }
      },
      handinback: {},
      handpayinfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "parkLockId": "",
          "dealId": "",//交易流水号
          "stayTm": "",//停留时间(分)
          "shouldPay": "",//应收金额
          "dscountPay": "",//优惠金额
          "realPay": "",//实收金额

        }
      },
      handpayback: {}
    }
  },
  onLoad (options) {
    let parkLockId1 = options.parkLockId;
    let parkLockNum1 = options.parkLockNum
    let parkLockState = options.parkLockState;
    let parkName = options.parkName
    console.log(parkLockId1)

    this.parkLockId = parkLockId1
    this.parkLockNum = parkLockNum1
    this.parkLockState = parkLockState
    this.parkName = parkName
  },
  methods: {
    slockcom (value) {
      this.togglePopup('center', 'popup', this.$t('m.plzwait'))
      // 从localStorage的Token中获取userCode：U1
      let userC = JSON.parse(localStorage.token)
      let userCode = JSON.stringify(userC.userCode).replace(/"/g, "")
      console.log("从token中获取的userCode:" + userCode)
      this.slockinfo.datas.userId = userCode
      this.slockinfo.datas.parkLockId = this.parkLockId
      this.slockinfo.datas.command = value
      let submit = {}
      submit = JSON.stringify(this.slockinfo)
      console.log(submit)
      this.$axios({
        method: 'post',
        url: '/ParkLockControlHandler.ashx?method=POST&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            console.log(res.data.message)
            this.togglePopup('center', 'popup', this.$t('m.optionsuccess'))
          } else {
            this.togglePopup('center', 'popup', res.data.message)
          }
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })

    },
    selectM () {
      // 从localStorage的Token中获取userCode：U1
      let userC = JSON.parse(localStorage.token)
      let userCode = JSON.stringify(userC.userCode).replace(/"/g, "")
      // console.log("从token中获取的userCode:" + userCode)
      this.selectMinfo.datas.userId = userCode

      this.selectMinfo.datas.parkLockId = this.parkLockId
      let submit = {}
      submit = JSON.stringify(this.selectMinfo)
      console.log(submit)
      this.$axios({
        method: 'post',
        url: '/ParkLockManualPayHandler.ashx?method=GET&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            this.selectMback = JSON.parse(res.data.datas)
            console.log(this.selectMback)
            this.togglePopup('center', 'tip', "您需要支付" + this.selectMback.shouldPay + "元")
          } else {
            this.togglePopup('center', 'popup', res.data.message)
          }
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })

    },
    handin () {
      this.togglePopup('center', 'popup', this.$t('m.plzwait'))
      // 从localStorage的Token中获取userCode：U1
      let userC = JSON.parse(localStorage.token)
      let userCode = JSON.stringify(userC.userCode).replace(/"/g, "")
      // console.log("从token中获取的userCode:" + userCode)
      this.handininfo.datas.userId = userCode

      this.handininfo.datas.parkLockId = this.parkLockId
      this.getnow()
      this.handininfo.datas.inTm = this.time
      let submit = {}
      submit = JSON.stringify(this.handininfo)
      console.log(submit)
      this.$axios({
        method: 'post',
        url: '/ParkLockManualEntryHandler.ashx?method=POST&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            this.togglePopup('center', 'popup', res.data.message)
          } else {
            this.togglePopup('center', 'popup', res.data.message)
          }
        })
        .catch(err => {
          this.togglePopup('top', 'popup', '出现了错误' + err)
        })
    },
    handpay () {
      this.cancel('tip')
      this.togglePopup('center', 'popup', this.$t('m.plzwait'))
      // 从localStorage的Token中获取userCode：U1
      let userC = JSON.parse(localStorage.token)
      let userCode = JSON.stringify(userC.userCode).replace(/"/g, "")
      // console.log("从token中获取的userCode:" + userCode)

      this.handpayinfo.datas.userId = userCode
      this.handpayinfo.datas.parkLockId = this.parkLockId
      this.handpayinfo.datas.dealId = this.selectMback.dealId
      this.handpayinfo.datas.stayTm = this.selectMback.stayTm
      this.handpayinfo.datas.shouldPay = this.selectMback.shouldPay
      this.handpayinfo.datas.dscountPay = this.selectMback.dscountPay
      // this.handpayinfo.datas.realPay = this.selectMback.realPay

      let submit = {}
      submit = JSON.stringify(this.handpayinfo)
      console.log(submit)
      this.$axios({
        method: 'post',
        url: '/ParkLockManualPayHandler.ashx?method=POST&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            this.togglePopup('center', 'popup', res.data.message)
          } else {
            this.togglePopup('center', 'popup', res.data.message)
          }
        })
        .catch(err => {
          this.togglePopup('top', 'popup', '出现了错误' + err)
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
    },
    changetabbar () {
      uni.setNavigationBarTitle({
        title: this.$t('m.slockcontrol')
      });    }
  },
  onBackPress () {
    this.$refs['showpopup'].close()
    this.$refs['showtip'].close()
    this.$refs['showimage'].close()
    this.$refs['showshare'].close()
  },
  mounted () {
    this.changetabbar()
  }
}
</script>
<style lang="scss">
@import url('popup.css');
.outout {
  width: 90%;
  margin-left: 5%;
  // text-align: center;
}
.name {
  text-align: center;
  font-size: 16px;
}
.CC1 {
  text-align: center;
  margin-top: 2%;
  line-height: 100upx;
  background-color: black;
  color: white;
  font-size: 16px;
  font-weight: bold;
}
.CC2 {
  text-align: center;
  margin-top: 2%;
  line-height: 100upx;
  background-color: black;
  color: white;
  font-size: 16px;
  font-weight: bold;
}
.nbt1 {
  margin-top: 20upx;
  margin-left: 10upx;
  margin-right: 10upx;
}

.flex-item {
  width: 33.3%;
  height: 120upx;
  text-align: center;
  line-height: 120upx;
}

.flex-item-V {
  width: 100%;
  height: 150upx;
  text-align: center;
  line-height: 120upx;
}

.text {
  margin: 15upx 10upx;
  padding: 0 20upx;
  background-color: #ebebeb;
  height: 70upx;
  line-height: 70upx;
  text-align: center;
  color: #777;
  font-size: 16upx;
}
button {
  background-color: rgba(0, 0, 0, 0);
  color: black;
  font-size: 14px;
  height: 75%;
  width: 90%;
  // text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
}
.tt1 {
  font-size: 16px;
  line-height: 35px;
}
.popup-content {
  width: 500upx;
  height: 400upx;
  font-size: 20px;
  align-items: center;
  // display: flex;
  // justify-content: center;
}
.loadingimg {
  width: 100%;
}
.desc {
  /* text-indent: 40upx; */
}
</style>