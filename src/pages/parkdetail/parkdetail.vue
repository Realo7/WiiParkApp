<template>
  <view class="content">
    <view class="uni-flex uni-row">
      <view
        class="flex-item"
        @click="chosepark"
      >
        <text>{{$t('m.chosepark')}}</text>
      </view>
      <uni-search-bar
        radius="100"
        :placeholder="$t('m.plzinput2')"
        @input="input"
        @confirm="getlockInfo"
        class="flex-item2"
      />
    </view>
    <!-- {{filterResult}} -->
    <sl-filter
      :independence="true"
      :color="titleColor"
      :themeColor="themeColor"
      :menuList.sync="menuList"
      @result="result"
    >
    </sl-filter>
    <uni-list v-if="showlist">
      <uni-list-item
        v-if="grid=='slock'"
        v-for="(item, index) in showlist"
        :key="index"
        @click="goincontrol(index)"
      >

        <div style="text-align:center;font-weight:bold;">{{item.parkName}}</div>
        <view class="uni-flex uni-column">
          <view>
            <view class="uni-flex uni-row">
              <view class="flex-item ">{{item.parkLockNum}}</view>
              <view class="flex-item ">{{item.carState }}</view>
              <view
                v-if="item.onlineState=='脱机'"
                class="flex-item "
                style="color:red"
              >{{item.onlineState}}</view>
              <view
                v-if="item.onlineState!='脱机'"
                class="flex-item "
                style="color:green"
              >{{item.onlineState}}</view>

              <view class="flex-item ">{{item.priority}}</view>
              <view class="flex-item ">{{item.parkLockState}}</view>
            </view>
          </view>
          <view>
            <view class="uni-flex uni-row">
              <view
                class="flex-item"
                style="width:60%"
              >{{item.parkLockId}}</view>
              <view
                v-if="item.runState&&item.runState=='脱机'"
                class="flex-item"
                style="color:red;width:40%;"
              >{{$t('m.runState')}} {{item.runState}}
              </view>
              <view
                v-if="item.runState&&item.runState!='脱机'"
                class="flex-item"
                style="color:green;width:40%;"
              >{{$t('m.runState')}} {{item.runState}}
              </view>
            </view>
          </view>
        </view>

      </uni-list-item>
      <!-- //出入口设备的列表样式 -->
      <uni-list-item
        v-if="grid=='inout'"
        v-for="(item, index) in showlist"
        :key="index"
        @click="goincontrol(index)"
      >
        <view>
          <div style="text-align:center;font-weight:bold;">{{item.parkName}}</div>
          <view class="uni-flex uni-column">
            <view class="uni-flex uni-row">
              <view class="flex-item inoutflex">{{$t('m.deviceid')}}： {{item.devAdr}}</view>
              <view class="flex-item inoutflex">{{item.deviceType}}</view>
            </view>

            <view class="uni-flex uni-row">
              <view class="flex-item inoutflex">{{$t('m.devicename')}}： {{item.devName}}</view>
              <view
                v-if="item.onlineState=='脱机'"
                class="flex-item inoutflex"
                style="color:red"
              >{{$t('m.linkState')}}：{{item.onlineState}}</view>
              <view
                v-if="item.onlineState!='脱机'"
                class="flex-item inoutflex"
                style="color:green"
              >{{$t('m.linkState')}}：{{item.onlineState}}</view>
            </view>

            <view class="flex-item inoutflex">
              {{$t('m.parkareaname')}}：{{item.parkAreaName}}
            </view>
          </view>
        </view>
      </uni-list-item>
      <!-- //自助机 -->
      <uni-list-item
        v-if="grid=='zzj'"
        v-for="(item, index) in showlist"
        :key="index"
        @click="goincontrol(index)"
      >
        <view>
          <div style="text-align:center;font-weight:bold;">{{item.parkName}}</div>
          <view class="uni-flex uni-column">
            <view class="uni-flex uni-row">
              <view class="flex-item inoutflex">{{$t('m.address')}}：{{item.address}}</view>
              <view class="flex-item inoutflex">{{item.deviceId}}</view>
            </view>
            <view class="uni-flex uni-row">
              <view class="flex-item inoutflex">
                {{item.parkAreaName}}
              </view>
              <view class="flex-item inoutflex">{{$t('m.linkstate')}}：{{item.onlineState}}</view>
            </view>
          </view>
        </view>
      </uni-list-item>
      <!-- 节点 -->
      <uni-list-item
        v-if="grid=='jiedian'"
        v-for="(item, index) in showlist"
        :key="index"
        @click="goincontrol(index)"
      >
        <view>
          <div style="text-align:center;font-weight:bold;">{{item.parkName}}</div>
          <view class="uni-flex uni-column">
            <view class="uni-flex uni-row">
              <view class="flex-item inoutflex">{{item.deviceId}}</view>
              <view class="flex-item inoutflex">{{item.address}}</view>
            </view>
            <view class="uni-flex uni-row">
              <view class="flex-item inoutflex">{{$t('m.devicename')}}：{{item.deviceName}}</view>
              <view class="flex-item inoutflex">
                {{item.parkAreaName}}
              </view>
            </view>
            <view class="uni-flex uni-row">
              <view class="flex-item inoutflex">{{$t('m.linkstate')}}：{{item.onlineState}}</view>
            </view>
          </view>
        </view>
      </uni-list-item>
    </uni-list>
    <image
      v-if="!showlist"
      src="../../static/img/logo_huxiaor.png"
      alt="未有相关数据"
    >
  </view>
</template>

<script>
import slFilter from '../../components/sl-filter/sl-filter.vue';
export default {
  components: {
    slFilter
  },
  data () {
    return {
      showlist: [],
      themeColor: '#000000',
      titleColor: '#666666',
      filterResult: '',
      tourl: "",
      grid: "",//用来判断状态
      menuList: [
        {
          'title': this.$t('m.deviceclass'),
          'detailTitle': this.$t('m.plzchosedeviceclass'),
          'isMutiple': false,
          'key': 'Type',
          'defaultSelectedIndex': [0],
          'detailList': [
            {
              'title': this.$t('m.parklock'),
              'value': this.$t('m.parklock')
            },
            {
              'title': this.$t('m.inout'),
              'value': this.$t('m.inout')
            },
            {
              'title': this.$t('m.selfhelpmachine'),
              'value': this.$t('m.selfhelpmachine')
            },
            {
              'title': this.$t('m.node'),
              'value': this.$t('m.node')
            }
          ]

        },
        //状态筛选
        // {
        //   'title': this.$t('m.AllStates'),
        //   'key': 'states',
        //   'isMutiple': false,
        //   'detailList': [{
        //     'title': this.$t('m.AllStates'),
        //     'value': ''
        //   },
        //   {
        //     'title': this.$t('m.Free'),
        //     'value': this.$t('m.Free')
        //   },
        //   {
        //     'title': this.$t('m.Newcarentrance'),
        //     'value': this.$t('m.Newcarentrance')
        //   },
        //   {
        //     'title': this.$t('m.Billing'),
        //     'value': this.$t('m.Billing')
        //   },
        //   {
        //     'title': this.$t('m.Paid'),
        //     'value': this.$t('m.Paid')
        //   },
        //   {
        //     'title': this.$t('m.PaidNotLeft'),
        //     'value': this.$t('m.PaidNotLeft')
        //   },
        //   {
        //     'title': this.$t('m.Paymentisoverdue'),
        //     'value': this.$t('m.Paymentisoverdue')
        //   },
        //   {
        //     'title': this.$t('m.offline'),
        //     'value': this.$t('m.offline')
        //   },
        //   {
        //     'title': this.$t('m.Riseandfall'),
        //     'value': this.$t('m.Riseandfall')
        //   },
        //   {
        //     'title': this.$t('m.Dropinresistance'),
        //     'value': this.$t('m.Dropinresistance')
        //   },
        //   {
        //     'title': this.$t('m.Falsealarmofvehicledetector'),
        //     'value': this.$t('m.Falsealarmofvehicledetector')
        //   },
        //   {
        //     'title': this.$t('m.Other'),
        //     'value': this.$t('m.Other')
        //   }
        //   ]

        // },
      ],
      parkId: "",
      lockInfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "parkId": "",
          "parkName": "",
          "deviceId": "",//节点Id
          "deviceName": "",//节点名称
          "parkLockNum": "",//车位号
        }
      },
      lockBack: [],
      crkInfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "parkId": "",
          "parkName": "",
          "parkAreaId": "",//区域Id
          "parkAreaName": "",//区域名称
          "deviceName": "",//设备名称
          "deviceType": "",//出入口类型 1 : 入口  2 : 出口
        }
      },
      crkBack: [],
      zzjInfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "parkId": "",
          "parkName": "",
          "deviceName": "",//设备名称
        }
      },
      zzjBack: [],
      jiedianInfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "parkId": "",
          "parkName": "",
          "deviceName": "",//节点名称
        }
      },
      jiedianBack: [],
      searchVal: ""
    }

  },
  onLoad (options) {
    let parkId = options.parkId;
    console.log(parkId)
    this.parkId = parkId
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
    result (val) {
      console.log('filter_result:' + JSON.stringify(val));
      this.filterResult = JSON.stringify(val, null, 2)
      this.filterinfo()
    },
    filterinfo () {
      if (JSON.parse(this.filterResult).Type) {
        // 筛选设备类型
        let case1 = JSON.parse(this.filterResult).Type
        console.log(case1)
        {
          if (case1 == "车位锁" || case1 == "ParkLock") {
            this.getlockInfo()

          } else if (case1 == "出入口" || case1 == "Entry and exit") {
            console.log("crk")
            this.getcrkInfo()
          } else if (case1 == "自助机" || case1 == "Self help machine") {
            console.log("zzj")
            this.getzzjInfo()
          } else if (case1 == "节点" || case1 == "Node") {
            console.log("jd")
            this.getjiedianInfo()
          }
        }
      } else if (!JSON.parse(this.filterResult).Type) {
        // 筛选设备状态,重置为不限
        // let case2 = JSON.parse(this.filterResult).Type
        // console.log(case2)
        this.getlockInfo()
      }
    },
    chosepark () {
      uni.switchTab({
        url: '../main/main',
      });
    },
    goincontrol (index) {
      // console.log(this.lockBack[index].parkLockNum)
      var url = this.tourl
      if (this.grid == "slock") {
        uni.navigateTo({
          url: url + '?parkLockId=' + this.lockBack[index].parkLockId + '&parkName=' + this.lockBack[index].parkName + '&parkLockState=' + this.lockBack[index].parkLockState + '&parkLockNum=' + this.lockBack[index].parkLockNum,
        });
      } else if (this.grid == "inout") {
        uni.navigateTo({
          url: url + '?devAdr=' + this.crkBack[index].devAdr + '&parkName=' + this.crkBack[index].parkName + '&deviceType=' + this.crkBack[index].deviceType,
        });
      } else if ((this.grid == "zzj")) {
        alert("自助机没有详情")

      }
    },
    getlockInfo () {

      this.lockInfo.datas.userId = this.getuserCode()
      this.lockInfo.datas.parkId = this.parkId
      // 搜索需要的信息
      this.lockInfo.datas.parkLockNum = this.searchVal
      let submit = {}
      submit = JSON.stringify(this.lockInfo)
      console.log(submit)
      uni.request({
        method: 'POST',
        url: this.$baseurl + '/GetParkLockListInfoHandler.ashx?method=GET&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: submit,
        success: (res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            this.lockBack = JSON.parse(JSON.parse(res.data.datas).list)
            this.showlist = this.lockBack
            console.log(this.lockBack)
            this.tourl = "detailcontrol/sLockcontrol"
            this.grid = "slock"
          } else {
            alert(res.data.message)
          }
        }),
        fail: (err => {
          console.log('出现了错误' + err)
        })
      })
    },
    getcrkInfo () {
      this.crkInfo.datas.userId = this.getuserCode()
      this.crkInfo.datas.parkId = this.parkId

      let submit = {}
      submit = JSON.stringify(this.crkInfo)
      console.log(submit)
      uni.request({
        method: 'POST',
        url: this.$baseurl + '/GetConnDeviceListInfoHandler.ashx?method=GET&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: submit,
        success: (res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            this.crkBack = JSON.parse(JSON.parse(res.data.datas).list)
            console.log(this.crkBack)
            this.showlist = this.crkBack
            // console.log(this.lockBack)
            this.tourl = "detailcontrol/inoutcontrol"
            this.grid = "inout"
          } else {
            alert(res.data.message)
          }
        }),
        fail: (err => {
          console.log('出现了错误' + err)
        })
      })
    },
    getzzjInfo () {
      this.zzjInfo.datas.userId = this.getuserCode()
      this.zzjInfo.datas.parkId = this.parkId

      let submit = {}
      submit = JSON.stringify(this.zzjInfo)
      console.log(submit)
      uni.request({
        method: 'POST',
        url: this.$baseurl + '/GetPayStationListInfoHandler.ashx?method=GET&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: submit,
        success: (res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            this.zzjBack = JSON.parse(JSON.parse(res.data.datas).list)
            console.log(this.zzjBack)
            this.showlist = this.zzjBack
            // console.log(this.lockBack)
            // this.tourl = "detailcontrol/micontrol"
            this.grid = "zzj"
          } else {
            alert(res.data.message)
          }
        }),
        fail: (err => {
          console.log('出现了错误' + err)
        })
      })
    },
    getjiedianInfo () {

      this.jiedianInfo.datas.userId = this.getuserCode()
      this.jiedianInfo.datas.parkId = this.parkId

      let submit = {}
      submit = JSON.stringify(this.jiedianInfo)
      console.log(submit)
      uni.request({
        method: 'POST',
        url: this.$baseurl + '/GetParkLockNodeListInfoHandler.ashx?method=GET&lan=' + this.$t('m.lan') + '&type=app&compress=00',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: submit,
        success: (res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            this.jiedianBack = JSON.parse(JSON.parse(res.data.datas).list)
            console.log(this.jiedianBack)
            console.log(this.jiedianBack[0].deviceName)
            this.grid = "jiedian"
            this.showlist = this.jiedianBack
            // for (var i = 0; i < this.jiedianBack.length; i++) {
            //   this.menuList[2].detailList[i + 1].title = this.jiedianBack[i].deviceName
            //   this.menuList[2].detailList[i + 1].value = this.jiedianBack[i].deviceId
            // }
          } else {
            alert(res.data.message)
          }
        }),
        fail: (err => {
          console.log('出现了错误' + err)
        })
      })
    },
    input (res) {
      this.searchVal = res.value
    },
    changetabbar () {
      uni.setNavigationBarTitle({
        title: this.$t('m.parkabout')
      });    }

  },
  mounted () {
    this.getlockInfo()
    this.changetabbar()
  },
  //监听下拉状态
  onPullDownRefresh () {
    // 对当前选中进行判断
    // this.getlockInfo()
    this.filterinfo()

    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
.text {
  margin-top: 50px;
  margin-left: 20px;
  width: 100%;
}
.newbtn {
  white-space: nowrap;
  background: url('../../static/img/fengexian.png');
  background-repeat: no-repeat;
  background-position-y: bottom; /*背景图片在纵向的最下方显示*/
  background-size: 100% 30%;
}
.flex-item {
  width: 25%;
  text-align: left;
  padding-top: 25rpx;
}
.flex-item2 {
  width: 72%;
  text-align: center;
}
.inoutflex {
  text-align: left;
  width: 50%;
}
</style>
