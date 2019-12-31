<template>

  <view class="uni-padding-wrap uni-common-mt">
    <!-- <image src="../../../static/img/openinout.png"></image> -->
    <view class="uni-flex uni-column">
      <span class="tx">{{parkName}} {{deviceType}}</span>
      <!-- <view class="tx1">{{$t('m.controlopen')}}</view> -->

      <!-- <view class="uni-list-cell"> -->
      <!-- <view class="uni-list-cell-left ">
            {{$t('m.choseopenreason')}}
          </view> -->
      <!-- <view class="uni-list-cell-db reason"> -->

      <picker
        @change="PickerChange"
        :value="index"
        :range="array"
        range-key="name"
        class="pickreason"
      >
        <view class="uni-input">{{array[index].name}}</view>
      </picker>

      <!-- </view> -->

      <view
        class="flex-item flex-item-V open"
        @click="inoutCon()"
      >{{$t('m.open')}}</view>

      <view class="blank"></view>
      <view class="flex-item">
        <button
          v-if="deviceType=='入口'"
          @click="inspace()"
        >{{$t('m.inbyhand')}}</button>

        <view>
          票号
          <switch @change="switch1Change" />
          车牌号
        </view>
        <view
          v-if="deviceType=='出口'"
          class="uni-flex uni-row"
        >

          <view class="flex-item-ipt">
            <input
              v-if="switch1==false"
              class="uni-input"
              v-model="inpt1"
              :placeholder="$t('m.plzinticket')"
            />
            <input
              v-if="switch1==true"
              class="uni-input"
              v-model="inpt2"
              :placeholder="$t('m.plzinplate')"
            />
          </view>
          <view class="flex-item-btn">
            <button
              type="primary"
              class="newbtn"
              @click="spay()"
            >{{$t('m.querycost')}}</button>
          </view>
        </view>

        <br>
        <!-- <button
          v-if="deviceType=='出口'"
          @click="handpay()"
        >手动付费(车牌识别)</button> -->
      </view>
    </view>
    <!-- <view style="height: 400px;"></view> -->
    <uni-popup
      ref="showpopup"
      :type="type"
      @change="change"
    >
      <text class="popup-content">
        {{ content1 }}
        <br>
        {{content2}}
      </text>
    </uni-popup>
    <uni-popup
      ref="showtip"
      :type="type"
      :mask-click="false"
      @change="change"
    >
      <view class="uni-tip">
        <text class="uni-tip-title">{{$t('m.querycost')}}</text>
        <text class="uni-tip-content">{{$t('m.Youneedtopay')}}{{spayback.shouldPay}}{{$t('m.yuan')}}</text>
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
      title: 'Hello',
      inpt1: "",
      inpt2: "",
      type: '',
      content1: 'popup',
      content2: "",
      time: "",
      devAdr: "",
      deviceType: "",
      parkName: "",
      inplate: "",
      array: [{ name: this.$t('m.reason1') }, { name: this.$t('m.reason2') }, { name: this.$t('m.reason3') }],
      index: 0,
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
      switch1: false,

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
    switch1Change: function (e) {
      console.log('switch1 发生 change 事件，携带值为', e.target.value)
      this.switch1 = e.target.value
      console.log(this.switch1)
    },
    getuserCode () {
      var userCode
      uni.getStorage({
        key: "token",
        success (e) {
          let userC = JSON.parse(e.data)

          userCode = userC.userCode
          console.log("从token中取出" + userCode)

        }
      })
      return userCode
    },
    PickerChange: function (e) {
      this.index = e.target.value
      let index = this.index
      this.inoutinfo.reason = this.array[index].name

    },
    inoutCon () {
      this.togglePopup('center', 'popup', this.$t('m.plzwait'))

      this.inoutinfo.datas.userId = this.getuserCode()
      this.inoutinfo.datas.deviceAdr = this.devAdr
      // this.inoutinfo.datas.reasonId = "1"
      let submit = {}
      submit = JSON.stringify(this.inoutinfo)
      console.log("sub" + submit)
      uni.request({
        method: 'POST',
        url: this.$baseurl + '/OpenGateFuncHandler.ashx?method=POST&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: submit,
        success: (res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            // this.recordBack = JSON.parse(JSON.parse(res.data.datas).list)
            console.log(res.data.message)
            this.togglePopup('center', 'popup', this.$t('m.taigan') + res.data.message)
          } else {
            this.togglePopup('center', 'popup', this.$t('m.taigan') + res.data.message)
          }
        }),
        fail: (err => {
          console.log('出现了错误' + err)
        })
      })
    },
    // 手动入场
    inspace () {
      this.togglePopup('center', 'popup', this.$t('m.plzwait'))

      this.inspaceinfo.datas.userId = this.getuserCode()
      this.inspaceinfo.datas.devAdr = this.devAdr
      this.getnow()
      this.inspaceinfo.datas.inTm = this.time
      this.inspaceinfo.datas.codeType = "2"

      let submit = {}
      submit = JSON.stringify(this.inspaceinfo)
      console.log("sub" + submit)
      uni.request({
        method: 'POST',
        url: this.$baseurl + '/PlateManualEntryHandler.ashx?method=POST&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: submit,
        success: (res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            this.inspaceback = JSON.parse(res.data.datas).ticketCode
            console.log(res.data.message)
            console.log(this.inspaceback)
            this.togglePopup('center', 'popup', this.$t('m.handinpark') + res.data.message, this.$t('m.ticketnum') + this.inspaceback)
          } else {
            this.togglePopup('center', 'popup', this.$t('m.handinpark') + res.data.message)
          }
        }),
        fail: (err => {
          console.log('出现了错误' + err)
        })
      })
    },
    // 查询费用
    spay () {
      this.togglePopup('center', 'popup', this.$t('m.plzwait'))

      this.spayinfo.datas.userId = this.getuserCode()
      if (this.inspaceback) {
        this.spayinfo.datas.ticketCode = this.inspaceback
      } else if (switch1 = flase) {
        this.spayinfo.datas.ticketCode = this.inpt1
      } else {
        this.spayinfo.datas.plate = this.inpt2
      }
      this.spayinfo.datas.plate = this.inplate

      let submit = {}
      submit = JSON.stringify(this.spayinfo)
      console.log("sub" + submit)
      uni.request({
        method: 'POST',
        url: this.$baseurl + '/PlateManualPayHandler.ashx?method=GET&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        data: submit,
        success: (res => {
          console.log(res)
          if (res.status == '200') {
            if (res.data.datas != null) {
              this.spayback = JSON.parse(res.data.datas)
              console.log(this.spayback)
              this.togglePopup('center', 'tip', this.$t('m.Youneedtopay') + this.spayback.shouldPay + "元")
            } else {
              this.togglePopup('center', 'popup', res.data.message)
            }
          } else {
            this.togglePopup('center', 'popup', this.$t('m.selectcostmode') + res.data.message)
          }
        }),
        fail: (err => {
          console.log('出现了错误' + err)
        })
      })
    },
    //手动付款
    handpay () {
      this.togglePopup('center', 'popup', this.$t('m.plzwait'))

      this.handpayinfo.datas.userId = this.getuserCode()
      this.handpayinfo.datas.ticketCode = this.spayback.ticketCode
      this.handpayinfo.datas.stayTm = this.spayback.stayTm
      this.handpayinfo.datas.shouldPay = this.spayback.shouldPay
      this.handpayinfo.datas.dscountPay = this.spayback.dscountPay
      this.handpayinfo.datas.parkId = this.spayback.parkId
      let submit = {}
      submit = JSON.stringify(this.handpayinfo)
      console.log("sub" + submit)
      uni.request({
        method: 'POST',
        url: this.$baseurl + '/PlateManualPayHandler.ashx?method=POST&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: submit,
        success: (res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            // this.recordBack = JSON.parse(JSON.parse(res.data.datas).list)
            console.log(res.data.message)
            this.togglePopup('center', 'popup', this.$t('m.handpay') + res.data.message)
          } else {
            this.togglePopup('center', 'popup', this.$t('m.handpay') + res.data.message)
          }
        }),
        fail: (err => {
          console.log('出现了错误' + err)
        })
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
    togglePopup (type, open, value1, value2) {
      switch (type) {
        case 'top':
          this.content1 = value1
          this.content2 = value2
          break
        case 'bottom':
          this.content1 = value1
          this.content2 = value2
          break
        case 'center':
          this.content1 = value1
          this.content2 = value2
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
        title: this.$t('m.inoutcontrol')
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
.open {
  background: url('../../../static/img/openinout.png');
  // background-color: #00bfff;
  // border-radius: 50%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
  font-size: 90upx;
  margin: 0 auto;
  color: white;
  margin-top: 50px;
  margin-bottom: 30px;
}

.blank {
  line-height: 50upx;
  margin-top: 50upx;
}
.tx {
  font-size: 26px;
  font-family: MicroSoft-YaHei;
  text-align: center;
  margin-bottom: 20px;
}
.tx1 {
  font-size: 18px;
  font-family: MicroSoft-YaHei;
  text-align: center;
  margin-bottom: 20px;
}
.flex-item {
  width: 100%;
  height: 380upx;
  text-align: center;
  line-height: 20upx;
}
.flex-item-ipt {
  padding-top: 3px;
  width: 65%;
  // border: 1px solid #4ca2ff;
  // border-radius: 8px;
}
.uni-input {
  border: 1px solid #4ca2ff;
  border-radius: 8px;
}

.flex-item-btn {
  // width: 35%;
  // background-color: #4ca2ff;
}
.flex-item-V {
  width: 400upx;
  height: 400upx;
  text-align: center;
  line-height: 400upx;
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
.popup-content {
  width: 500upx;
  height: 400upx;
  font-size: 20px;
  align-items: center;
  display: flex;
  justify-content: center;
  background: url('../../../static/img/ok1.png');
  background-size: 100% 100%;
}
.choose {
  margin-top: 5%;
}
.reason {
  text-align: center;
  background-color: #ebebeb;
  border: 1px solid #4ca2ff;
  border-radius: 8px;
  outline: none;
}
.pickreason {
  text-align: center;
  // border: 1px solid #4ca2ff;
  color: black;
  width: 100%;
}

.uni-list-cell {
  border: none;
}
.newbtn {
  border: 1px solid #4ca2ff;
  border-radius: 8px;
  margin-top: 2%;
  height: 85%;
}
.uni-popup {
}
</style>