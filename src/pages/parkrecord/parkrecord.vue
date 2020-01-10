<template>
  <div>
    <!-- {{resultInfo.from}}
    {{resultInfo.to}} -->
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <view
          class="tab"
          :class="{'active':index==tabIndex}"
          @tap="toggleTab(item,index)"
          v-for="(item,index) in tabList"
          :key="index"
        >{{item.name}}</view>
        <w-picker
          mode="range"
          startYear="2017"
          endYear="2030"
          :defaultVal="['2019','01','01','-','2019','12','31']"
          :current="false"
          @confirm="onConfirm"
          ref="range"
          themeColor="#f00"
        ></w-picker>
      </view>
      <uni-search-bar
        radius="100"
        :placeholder="$t('m.plzinput2')"
        @confirm="search"
        class="flex-item2"
      />
    </view>

    <view class="uni-flex uni-row">
      <view class="flex-item1">
        <picker
          @change="bindPickerChange1"
          :value="index1"
          :range="parkarray"
        >
          <view class="uni-input">{{parkarray[index1]}}</view>
        </picker>
      </view>

      <view class="flex-item1">
        <picker
          @change="bindPickerChange2"
          :value="index2"
          :range="devicearray"
        >
          <view class="uni-input">{{devicearray[index2]}}</view>
        </picker>
      </view>
    </view>

    <uni-list>
      <uni-list-item
        :show-badge="true"
        :show-arrow="false"
        v-for="(item, index) in showlist"
        :key="index"
        class="newbtn"
      >
        <view>
          <view class="uni-flex uni-column">
            <view class="uni-flex uni-row">
              <view class="flex-item td3">{{item.parkName}}</view>
              <view class="flex-item">{{item.parkLockId}}</view>
              <view
                class="flex-item"
                v-if="item.payState=='已支付'"
                style="color:green"
              >{{item.payState}}</view>
              <view
                class="flex-item"
                v-if="item.payState!='已支付'"
                style="color:red"
              >{{item.payState}}</view>
              <view
                class="flex-item"
                v-if="item.outState=='未出场'"
                style="color:red"
              >{{item.outState}}</view>
              <view
                class="flex-item"
                v-if="item.outState!='未出场'"
                style="color:green"
              >{{item.outState}}</view>
            </view>
            <view class="uni-flex uni-row">
              <view class="flex-item td1">{{$t('m.intime')}}：{{item.inTm}}</view>
              <view class="flex-item td2">{{$t('m.staytime')}}：</view>
            </view>
            <view class="uni-flex uni-row">
              <view class="flex-item td1">{{$t('m.outtime')}}：{{item.outTm}}</view>
              <view class="flex-item td2">{{$t('m.realpay')}}：{{item.realpay}}</view>
            </view>
          </view>
        </view>
      </uni-list-item>

    </uni-list>

  </div>
</template>
<script>
export default {
  data () {

    return {
      title: 'Hello',
      startYear: new Date().getFullYear(),
      mode: "range",
      defaultVal: [0, 0, 0, 0, 0, 0, 0],
      tabList: [{
        mode: "range",
        name: this.$t('m.chosedate')
      }],
      tabIndex: 0,
      selectList: [{
        label: "男",
        value: 0
      }, {
        label: "女",
        value: 1
      }],
      resultInfo: {
        result: "2019-12-20 10:00:00"
      },
      wantInfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "pageIndex": "1",
          "pageSize": "10",
          "parkId": "",
          "parkName": "",
          "payMode": "-1",//支付方式
          "payState": "-1",//支付状态
          "outState": "-1",//交易状态
          "payStationType": "-2",//支付设备类型
          "inTmS": "",//起始入场时间
          "inTmE": "",//截止入场时间
          "payTmS": "",//起始付费时间
          "payTmE": "",//截止付费时间
          "outTmS": "",//起始出场时间
          "outTmE": "",//截止出场时间
          "infoType": "0"//数据来源 0:临时信息 1:历史信息 
        }
      },
      recordBack: [],
      LPRInfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "pageIndex": "1",
          "pageSize": "10",
          "parkId": "",
          "parkName": "",
          "payState": "-1",//支付状态
          "outState": "-1",//交易状态
          "inTmS": "",//起始入场时间
          "inTmE": "",//截止入场时间
          "outTmS": "",//起始出场时间
          "outTmE": "",//截止出场时间
          "code": ""//票号/车牌/用户名,进行模糊查询
        }
      },
      LPRBack: [],
      GetParkInfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "pageIndex": "1",
          "pageSize": "10",
          "parkName": "",
          "longitude": "",//经度  
          "latitude": "",//纬度
          "provinceId": "",//省ID
          "cityId": "",//市ID
          "districtId": "",//县ID
          "companyId": "",//公众号或者小程序Id
        }
      },
      parkInfoBack: [],
      showlist: [],
      title: 'picker',
      parkarray: ['选择停车场'],
      devicearray: ['车位锁', '出入口设备'],
      index1: 0,
      index2: 0,
    }
  },
  methods: {
    bindPickerChange1: function (e) {
      console.log('picker发送选择改变，携带值为', e.target.value)
      this.index1 = e.target.value
      this.wantInfo.datas.parkId = this.parkInfoBack[e.target.value].parkId
      // console.log(this.wantInfo.datas.parkId)
      this.getrecordInfo()

    },
    bindPickerChange2: function (e) {
      console.log('picker发送选择改变，携带值为', e.target.value)
      this.index2 = e.target.value
      if (e.target.value == 0) {
        this.getrecordInfo()
      } else if (e.target.value == 1) {
        this.LPRInfo.datas.parkId = this.parkInfoBack[e.target.value].parkId
        this.getLPRInfo()
      }
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
    getparkInfo () {
      // console.log("基础URL" + this.$baseurl)
      console.log("从token中获取的userCode:" + this.getuserCode())
      this.GetParkInfo.datas.userCode = this.getuserCode()
      // this.GetParkInfo.datas.parkName = this.searchVal
      let submit = {}
      submit = JSON.stringify(this.GetParkInfo)
      uni.request({
        method: 'POST',
        url: this.$baseurl + '/GetParkInfoHandler.ashx?method=POST&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: submit,
        success: (res => {
          // console.log("成功" + res)
          console.log(res)
          if (res.data.statusCode == '200') {
            this.parkInfoBack = JSON.parse(JSON.parse(res.data.datas).list)
            console.log(this.parkInfoBack)
            for (let i = 0; i < this.parkInfoBack.length; i++) {
              this.parkarray[i] = this.parkInfoBack[i].name
            }
          } else {
            console.log(res.data.message)
          }
        }),
        fail: (err => {
          console.log('出现了错误' + err)
        })
      })
    },
    search () {
      alert("搜索")
    },
    getrecordInfo () {
      this.wantInfo.datas.userId = this.getuserCode()
      let submit = {}
      submit = JSON.stringify(this.wantInfo)
      console.log("sub提交" + submit)
      uni.request({
        method: 'POST',
        url: this.$baseurl + '/GetParkLockDealInfoHandler.ashx?method=GET&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: submit,
        success: (res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            this.recordBack = JSON.parse(JSON.parse(res.data.datas).list)
            console.log(this.recordBack)
            this.showlist = this.recordBack
          } else {
            alert(res.data.message)
          }
        }),
        fail: (err => {
          console.log('出现了错误' + err)
        })
      })
    },
    getLPRInfo () {
      this.LPRInfo.datas.userId = this.getuserCode()
      let submit = {}
      submit = JSON.stringify(this.LPRInfo)
      console.log("sub提交" + submit)
      uni.request({
        method: 'POST',
        url: this.$baseurl + '/GetPlateDealInfoHandler.ashx?method=GET&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: submit,
        success: (res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            this.LPRBack = JSON.parse(JSON.parse(res.data.datas).list)
            console.log(this.LPRBack)
            this.showlist = this.LPRBack
          } else {
            alert(res.data.message)
          }
        }),
        fail: (err => {
          console.log('出现了错误' + err)
        })
      })
    },
    toggleTab (item, index) {
      this.tabIndex = index;
      this.mode = item.mode;
      this.defaultVal = item.value;
      this.$refs[item.mode].show();
    },
    onConfirm (val) {
      console.log(val);
      this.wantInfo.datas.inTmS = this.resultInfo.from
      this.wantInfo.datas.outTmS = this.resultInfo.to
      this.getrecordInfo()
      this.resultInfo = val;
    },
    changetabbar () {
      uni.setNavigationBarTitle({
        title: this.$t('m.parkrecord')
      });    }
  },
  mounted () {
    this.getrecordInfo()
    this.changetabbar()
    this.getparkInfo()
  },
  //监听下拉状态
  onPullDownRefresh () {
    this.getrecordInfo()
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 1000);
  },
  // 页面滚动到底部的事件
  onReachBottom: function () {
    var that = this;
    that.wantInfo.datas.pageIndex = that.wantInfo.datas.pageIndex * 1 + 1
    that.getrecordInfo()
    //将数据拼接在一起
    // showwList.concat(res.data)
  }
}
</script>
<style lang="scss" scoped>
.pickerStyle {
  // font-size: 26upx;
  // border-bottom: 1px solid #4c83d6;
  // display: inline-block;
  // padding: 10upx 20upx;
}
picker {
  margin-top: -8px;
}
.text {
  margin-top: 50px;
  margin-left: 20px;
  width: 100%;
  font-family: Microsoft-YaHei;
}
.newbtn {
  white-space: nowrap;
  background-color: #f9f9f9;
  margin-top: 5%;
}
.flex-item {
  width: 25%;
  text-align: left;
  padding-top: 25rpx;
}
.flex-item1 {
  width: 50%;
  text-align: center;
}
.flex-item2 {
  width: 72%;
  text-align: center;
}
.td1 {
  width: 70%;
}
.td2 {
  width: 30%;
}
.td3 {
  width: 35%;
}
</style>