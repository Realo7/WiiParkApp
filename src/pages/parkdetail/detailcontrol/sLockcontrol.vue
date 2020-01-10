<template>
  <view class="uni-flex uni-column outout">
    <!-- <view class="name">德飞测试停车场</view> -->
    <view>
      <view class="tt1">{{$t('m.parkname')}}：{{parkName}}</view>
      <view class="tt1">{{$t('m.parklocknum')}}：{{parkLockNum}}</view>
      <view class="tt1">{{$t('m.parklockstate')}}：{{parkLockState}}</view>
    </view>
    <view class="CC1">
      <view class="inCC1text">{{$t('m.basecontrol')}}</view>
      <view class="inCC1">
        <view class="uni-flex uni-row">
          <view class="flex-item">
            <button
              class="nbt1"
              @click="slockcom ('COpen')"
            >{{$t('m.forceopen')}}</button>
          </view>
          <view class="flex-item">
            <button
              class="nbt1"
              @click="slockcom ('CClose')"
            >{{$t('m.forceclose')}}</button>
          </view>
          <view class="flex-item">
            <button
              class="nbt1"
              @click="slockcom ('CNormal')"
            >{{$t('m.renormal')}}</button>
          </view>
        </view>
        <view class="uni-flex uni-row">
          <view class="flex-item">
            <button
              class="nbt1"
              @click="slockcom ('CStop')"
            >{{$t('m.cease')}}</button>
          </view>
          <view class="flex-item">
            <button
              class="nbt1"
              @click="slockcom ('Reboot')"
            >{{$t('m.parklockrestart')}}</button>
          </view>
          <view class="flex-item">
            <button
              class="nbt1"
              @click="slockcom ('CClearErr')"
            >{{$t('m.clean')}}</button>
          </view>
        </view>
        <view class="uni-flex uni-row">
          <view class="flex-item">
            <button
              class="nbt1"
              @click="slockcom ('CLVDReboot')"
            >{{$t('m.detectorrestart')}}</button>
          </view>
          <view class="flex-item">
            <button
              class="nbt1"
              @click="selectM()"
            >{{$t('m.selectM')}}</button>
          </view>
          <!-- <view class="flex-item">
        <button
          
          class="nbt1"
          @click="handpay()"
        >手动付费</button>
      </view> -->
        </view>
      </view>
    </view>
    <view class="CC2">
      <view class="inCC2text">
        {{$t('m.emergencycontrol')}}
      </view>
      <view class="inCC2">
        <view class="uni-flex uni-row">
          <view class="flex-item">
            <button
              class="nbt1"
              @click="slockcom ('CServerCheckLock')"
            >{{$t('m.selectlink')}}</button>
          </view>
          <view class="flex-item">
            <button
              class="nbt1"
              @click="slockcom (
          COpenBus)"
            >{{$t('m.startbusiness')}}</button>
          </view>
          <view class="flex-item">
            <button
              class="nbt1"
              @click="slockcom ('CCloseBus')"
            >{{$t('m.closebusiness')}}</button>
          </view>
        </view>
        <view class="uni-flex uni-row">
          <view class="flex-item">
            <button
              class="nbt1"
              @click="handin"
            >{{$t('m.handinpark')}}</button>
          </view>

          <!-- 日期选择 -->
          <picker
            mode="date"
            :value="date"
            :start="time"
            @change="bindDateChange"
          >
            <view class="uni-input">{{date}}</view>
          </picker>

          <!-- 时间选择 -->

          <picker
            mode="time"
            :value="time0"
            start="09:01"
            end="21:01"
            @change="bindTimeChange"
          >
            <view class="uni-input">{{time0}}</view>
          </picker>

        </view>
      </view>
    </view>
    <!--
            <view
            style="height: 400px;"
          >
        </view> -->
    <!-- showpopup只是一个通知框而已 -->
    <uni-popup
      v-if="popstate=='success'"
      ref="showpopup"
      :type="type"
      @change="change"
    >
      <text class="popup-content popup-content1">
        {{ content }}
      </text>
    </uni-popup>
    <uni-popup
      v-if="popstate=='fail'"
      ref="showpopup"
      :type="type"
      @change="change"
    >
      <text class="popup-content popup-content2">
        {{ content }}
      </text>
    </uni-popup>
    <uni-popup
      v-if="popstate=='wait'"
      ref="showpopup"
      :type="type"
      @change="change"
    >
      <!-- <text class="popup-content3">
        {{ content}}
      </text> -->
      <div class="loader-inner ld1">
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
      </div>
    </uni-popup>
    <uni-popup
      ref="showtip"
      :type="type"
      :mask-click="false"
      @change="change"
    >
      <view class="uni-tip tipback">
        <text class="uni-tip-title">{{$t('m.payment')}}</text>

        <view class="uni-tip-content tipcontent">
          <div>{{$t('m.Transactionnumber')}}：{{selectMback.dealId}}</div>
          <div>{{$t('m.parklocknum')}}：{{selectMback.parkLockNum}}</div>
          <div>{{$t('m.intime')}}：{{selectMback.inTm}}</div>
          <div>{{$t('m.staytime')}}：{{selectMback.stayTm}}</div>
          <div>{{$t('m.Preferentialamount')}}：{{selectMback.dscountPay}}</div>

          {{$t('m.Youneedtopay')}}{{selectMback.shouldPay}}{{$t('m.yuan')}}
        </view>
        <view class="uni-tip-group-button tipbottom">
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
      popstate: "",
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
      date: "2020-01-01",
      time0: "00:00",
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
    slockcom (value) {
      // 改变弹出框状态
      this.popstate = 'wait'
      this.togglePopup('center', 'popup', this.$t('m.plzwait'))

      this.slockinfo.datas.userId = this.getuserCode()
      this.slockinfo.datas.parkLockId = this.parkLockId
      this.slockinfo.datas.command = value
      let submit = {}
      submit = JSON.stringify(this.slockinfo)
      console.log(submit)
      uni.request({
        method: 'POST',
        url: this.$baseurl + '/ParkLockControlHandler.ashx?method=POST&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: submit,
        success: (res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            console.log(res.data.message)
            // 改变弹出框状态
            this.popstate = 'success'
            this.togglePopup('center', 'popup', this.$t('m.optionsuccess'))
          } else {
            // 改变弹出框状态
            this.popstate = 'fail'
            this.togglePopup('center', 'popup', res.data.message)
          }
        }),
        fail: (err => {
          console.log('出现了错误' + JSON.stringify(err))
        })
      })
    },
    selectM () {
      this.selectMinfo.datas.userId = this.getuserCode()
      this.selectMinfo.datas.parkLockId = this.parkLockId
      let submit = {}
      submit = JSON.stringify(this.selectMinfo)
      console.log(submit)
      uni.request({
        method: 'POST',
        url: this.$baseurl + '/ParkLockManualPayHandler.ashx?method=GET&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: submit,
        success: (res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            this.selectMback = JSON.parse(res.data.datas)
            console.log(this.selectMback)

            this.togglePopup('center', 'tip', "您需要支付" + this.selectMback.shouldPay + "元")
          } else {
            // 改变弹出框状态
            this.popstate = 'fail'
            this.togglePopup('center', 'popup', res.data.message)
          }
        }),
        fail: (err => {
          // 改变弹出框状态
          this.popstate = 'fail'
          console.log('出现了错误' + err)
        })
      })
    },
    handin () {
      // 改变弹出框状态
      this.popstate = 'wait'
      this.togglePopup('center', 'popup', this.$t('m.plzwait'))

      this.handininfo.datas.userId = this.getuserCode()
      this.handininfo.datas.parkLockId = this.parkLockId
      this.getnow()
      this.handininfo.datas.inTm = this.time
      let submit = {}
      submit = JSON.stringify(this.handininfo)
      console.log(submit)
      uni.request({
        method: 'POST',
        url: this.$baseurl + '/ParkLockManualEntryHandler.ashx?method=POST&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: submit,
        success: (res) => {
          console.log(res)
          if (res.data.statusCode == '200') {
            // 改变弹出框状态
            this.popstate = 'success'
            this.togglePopup('center', 'popup', res.data.message)
          } else {
            // 改变弹出框状态
            this.popstate = 'fail'
            this.togglePopup('center', 'popup', res.data.message)
          }
        },
        fail: (err => {
          // 改变弹出框状态
          this.popstate = 'fail'
          this.togglePopup('center', 'popup', '出现了错误' + err)
        })
      })
    },
    handpay () {
      this.cancel('tip')
      // 改变弹出框状态
      this.popstate = 'wait'
      this.togglePopup('center', 'popup', this.$t('m.plzwait'))

      this.handpayinfo.datas.userId = this.getuserCode()
      this.handpayinfo.datas.parkLockId = this.parkLockId
      this.handpayinfo.datas.dealId = this.selectMback.dealId
      this.handpayinfo.datas.stayTm = this.selectMback.stayTm
      this.handpayinfo.datas.shouldPay = this.selectMback.shouldPay
      this.handpayinfo.datas.dscountPay = this.selectMback.dscountPay
      // this.handpayinfo.datas.realPay = this.selectMback.realPay

      let submit = {}
      submit = JSON.stringify(this.handpayinfo)
      console.log(submit)
      uni.request({
        method: 'POST',
        url: this.$baseurl + '/ParkLockManualPayHandler.ashx?method=POST&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: submit,
        success: (res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            // 改变弹出框状态
            this.popstate = 'success'
            this.togglePopup('center', 'popup', res.data.message)
          } else {
            // 改变弹出框状态
            this.popstate = 'fail'
            this.togglePopup('center', 'popup', res.data.message)
          }
        }),
        fail: (err => {
          // 改变弹出框状态
          this.popstate = 'fail'
          this.togglePopup('top', 'popup', '出现了错误' + err)
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
  },
  mounted () {
    this.changetabbar()
  }
}
</script>
<style lang="scss">
@import url('popup.css');
@import url('../../../common/rainbowloading.css');
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
  background: url('../../../static/img/slock (2).png');
  background-size: 100% 100%;
  color: white;
  font-size: 16px;
  font-weight: bold;
  height: 500upx;
}
.inCC1 {
  width: 97%;
  margin: 0 auto;
}
.inCC1text {
  background: url('../../../static/img/slock (1).png');
  background-size: 45% 100%;
  background-repeat: no-repeat;
  background-position-x: 50%;
  font-size: 16px;
}
.CC2 {
  text-align: center;
  margin-top: 2%;
  line-height: 100upx;
  background: url('../../../static/img/slock (2).png');
  background-size: 100% 100%;
  color: white;
  font-size: 16px;
  font-weight: bold;
  height: 380upx;
}
.inCC2 {
  width: 97%;
  margin: 0 auto;
  button {
    border: 1px solid #ff5a20;
    border-radius: 8px;
  }
}
.inCC2text {
  background: url('../../../static/img/slock (1).png');
  background-size: 45% 100%;
  background-repeat: no-repeat;
  background-position-x: 50%;
  font-size: 16px;
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
  background-color: white;
  color: black;
  font-size: 14px;
  height: 75%;
  width: 92%;
  // text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  border: 1px solid #4ca2ff;
  border-radius: 5px;
}
.tt1 {
  font-size: 16px;
  line-height: 35px;
}
.popup-content1 {
  width: 500upx;
  height: 400upx;
  font-size: 20px;
  display: flex;
  justify-content: center;
  // 以下是框内元素垂直居中
  align-items: center;
  background: url('../../../static/img/ok1.png');
  background-size: 100% 100%;
}
.popup-content2 {
  width: 500upx;
  height: 400upx;
  font-size: 20px;
  display: flex;
  justify-content: center;
  // 以下是框内元素垂直居中
  align-items: center;
  background: url('../../../static/img/fail1.png');
  background-size: 100% 100%;
}
.popup-content3 {
  width: 500upx;
  height: 400upx;
  font-size: 20px;
  display: flex;
  justify-content: center;
  // 以下是框内元素垂直居中
  // align-items: center;

  // background: url('../../../static/img/plzwait.gif');
  background-size: 100% 100%;
}

.loadingimg {
  width: 100%;
}
.desc {
  /* text-indent: 40upx; */
}
.tipback {
  background: url('../../../static/img/pay.png');
  background-size: 100% 100%;
  height: 550upx;
}
.tipcontent {
  padding-top: 120upx;
}
.tipbottom {
  padding-top: 50upx;
}
.uni-input {
  margin-top: 20upx;
  height: 60upx;
  margin-left: 10upx;
  border: 1px solid #4ca2ff;
  border-radius: 8px;
  color: black;
}
</style>