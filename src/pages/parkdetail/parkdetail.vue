<template>
  <view class="content">
    <view class="uni-flex uni-row">
      <view
        class="flex-item"
        @click="chosepark"
      >
        <text>选择停车场</text>
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
    <uni-list>
      <uni-list-item
        v-if="grid=='slock'||grid=='inout'"
        :show-badge="true"
        title=""
        badge-text=""
        v-for="(item, index) in showlist"
        :key="index"
        @click="goincontrol(index)"
      >
        <view>

          <table id="tb1">
            <tr>
              <td
                v-if="item.parkLockNum"
                class="td1"
              >{{$t('m.SpaceNo')}} {{item.parkLockNum}}</td>
              <td
                v-if="item.devAdr"
                class="td1"
              >设备号： {{item.devAdr}}</td>
              <td
                v-if="item.carState"
                class="td1"
              >{{$t('m.SpaceState')}} {{item.carState}}</td>
              <td
                v-if="item.deviceType"
                class="td1"
              >{{item.deviceType}}</td>
            </tr>
            <tr>
              <td
                v-if="item.parkLockId"
                class="td1"
              >{{$t('m.SpaceLockNo')}}
                <div> {{item.parkLockId}}</div>
              </td>
              <td
                v-if="item.devName"
                class="td1"
              >设备名称： {{item.devName}}
              </td>
              <td
                v-if="item.onlineState=='脱机'"
                class="td1"
                style="color:red"
              >{{$t('m.linkState')}} {{item.onlineState}}</td>
              <td
                v-if="item.onlineState!='脱机'"
                class="td1"
                style="color:green"
              >{{$t('m.linkState')}} {{item.onlineState}}</td>
            </tr>
            <tr>
              <td
                v-if="item.parkLockState"
                class="td1"
              >{{$t('m.SpaceLockState')}} {{item.parkLockState}}</td>

              <td
                v-if="item.runState&&item.runState=='脱机'"
                class="td1"
                style="color:red"
              >{{$t('m.runState')}} {{item.runState}}</td>
              <td
                v-if="item.runState&&item.runState!='脱机'"
                class="td1"
                style="color:red"
              >{{$t('m.runState')}} {{item.runState}}</td>
              <td
                v-if="item.parkAreaName"
                class="td1"
              >停车场区域名： {{item.parkAreaName}}</td>
            </tr>
            <tr>
              <td
                v-if="item.priority"
                class="td1"
              >{{$t('m.controlStyle')}} {{item.priority}}</td>
              <td class="td1"></td>
            </tr>
          </table>

        </view>
      </uni-list-item>
      <uni-list-item
        v-if="grid=='zzj'"
        :show-badge="true"
        title=""
        badge-text=""
        v-for="(item, index) in showlist"
        :key="index"
        @click="goincontrol(index)"
      >
        <view>
          <table id="tb1">
            <tr>
              <td class="td1">地址：{{item.address}}</td>
              <td class="td1">{{item.parkName}}</td>
            </tr>
            <tr>
              <td class="td1">设备Id：{{item.deviceId}}</td>
              <td class="td1">
                <div>区域名称：</div>
                {{item.parkAreaName}}
              </td>
            </tr>
            <tr>
              <td class="td1">位置属性：{{item.locationType}}</td>
              <td class="td1">连接状态：{{item.onlineState}}</td>
            </tr>
          </table>
        </view>
      </uni-list-item>
    </uni-list>

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
          'title': '设备类型',
          'detailTitle': '请选择设备类型（单选）',
          'isMutiple': false,
          'key': 'Type',
          'defaultSelectedIndex': [0],
          'detailList': [{
            'title': '不限',
            'value': ''
          },
          {
            'title': '车位锁',
            'value': '车位锁'
          },
          {
            'title': '出入口',
            'value': '出入口'
          },
          {
            'title': '自助机',
            'value': '自助机'
          }
          ]

        },
        {
          'title': '全部状态',
          'key': 'states',
          'isMutiple': false,
          'detailList': [{
            'title': '全部状态',
            'value': ''
          },
          {
            'title': '空闲',
            'value': '空闲'
          },
          {
            'title': '新车入场',
            'value': '新车入场'
          },
          {
            'title': '计费中',
            'value': '计费中'
          },
          {
            'title': '已缴费',
            'value': '已缴费'
          },
          {
            'title': '缴费未离开',
            'value': '缴费未离开'
          },
          {
            'title': '缴费已超时',
            'value': '缴费已超时'
          },
          {
            'title': '脱机',
            'value': '脱机'
          },
          {
            'title': '上升遇阻',
            'value': '上升遇阻'
          },
          {
            'title': '下降遇阻',
            'value': '下降遇阻'
          },
          {
            'title': '车检器误报',
            'value': '车检器误报'
          },
          {
            'title': '其它',
            'value': '其它'
          }
          ]

        },
        {
          'title': '单选',
          'key': 'jiedian',
          'isMutiple': false,
          'detailTitle': '请选择（单选）',
          'reflexTitle': true,
          'defaultSelectedIndex': 0,
          'detailList': [{
            'title': '选择节点',
            'value': ''
          },
          {
            'title': '条件1',
            'value': 'test_1'
          },
          {
            'title': '',
            'value': ''
          },
          {
            'title': '',
            'value': ''
          },
          {
            'title': '',
            'value': ''
          },
          {
            'title': '',
            'value': ''
          },
          {
            'title': '',
            'value': ''
          },
          {
            'title': '',
            'value': ''
          },
          {
            'title': '',
            'value': ''
          },
          {
            'title': '',
            'value': ''
          },
          {
            'title': '',
            'value': ''
          }
          ]
        }
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
      jiedianback: [],
      searchVal: ""
    }

  },
  onLoad (options) {
    let parkId = options.parkId;
    console.log(parkId)
    this.parkId = parkId
  },
  methods: {
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
          if (case1 == "车位锁") {
            this.getlockInfo()

          } else if (case1 == "出入口") {
            console.log("crk")
            this.getcrkInfo()
          } else if (case1 == "自助机") {
            console.log("zzj")
            this.getzzjInfo()
          }
        }
      } else if (JSON.parse(this.filterResult).states) {
        // 筛选设备状态
        let case2 = JSON.parse(this.filterResult).states
        console.log(case2)

      } else if (JSON.parse(this.filterResult).jiedian) {
        //筛选节点
        let case3 = JSON.parse(this.filterResult).jiedian
        console.log(case3)
        this.lockInfo.datas.deviceId = case3
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
          url: url + '?parkLockId=' + this.lockBack[index].parkLockId + '&parkName=' + this.lockBack[index].parkName + '&parkLockState=' + this.lockBack[index].parkLockState,
        });
      } else if (this.grid == "inout") {
        uni.navigateTo({
          url: url + '?devAdr=' + this.crkBack[index].devAdr + '&parkName=' + this.crkBack[index].parkName,
        });
      } else if ((this.grid == "zzj")) {
        uni.navigateTo({
          url: url + '?devAdr=' + this.zzjBack[index].devAdr + '&parkName=' + this.crkBack[index].parkName,
        });
      }
    },
    getlockInfo () {
      // 从localStorage的Token中获取userCode：U1
      let userC = JSON.parse(localStorage.token)
      let userCode = JSON.stringify(userC.userCode).replace(/"/g, "")
      // console.log("从token中获取的userCode:" + userCode)
      this.lockInfo.datas.userId = userCode
      this.lockInfo.datas.parkId = this.parkId
      // 搜索需要的信息
      this.lockInfo.datas.parkLockNum = this.searchVal
      let submit = {}
      submit = JSON.stringify(this.lockInfo)
      console.log(submit)
      this.$axios({
        method: 'post',
        url: '/GetParkLockListInfoHandler.ashx?method=GET&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            this.lockBack = JSON.parse(JSON.parse(res.data.datas).list)
            this.showlist = this.lockBack
            // console.log(this.lockBack)
            this.tourl = "detailcontrol/sLockcontrol"
            this.grid = "slock"
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    getcrkInfo () {
      // 从localStorage的Token中获取userCode：U1
      let userC = JSON.parse(localStorage.token)
      let userCode = JSON.stringify(userC.userCode).replace(/"/g, "")
      // console.log("从token中获取的userCode:" + userCode)
      this.crkInfo.datas.userId = userCode
      this.crkInfo.datas.parkId = this.parkId

      let submit = {}
      submit = JSON.stringify(this.crkInfo)
      console.log(submit)
      this.$axios({
        method: 'post',
        url: '/GetConnDeviceListInfoHandler.ashx?method=GET&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
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
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    getzzjInfo () {
      // 从localStorage的Token中获取userCode：U1
      let userC = JSON.parse(localStorage.token)
      let userCode = JSON.stringify(userC.userCode).replace(/"/g, "")
      // console.log("从token中获取的userCode:" + userCode)
      this.zzjInfo.datas.userId = userCode
      this.zzjInfo.datas.parkId = this.parkId

      let submit = {}
      submit = JSON.stringify(this.zzjInfo)
      console.log(submit)
      this.$axios({
        method: 'post',
        url: '/GetPayStationListInfoHandler.ashx?method=GET&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            this.zzjBack = JSON.parse(JSON.parse(res.data.datas).list)
            console.log(this.zzjBack)
            this.showlist = this.zzjBack
            // console.log(this.lockBack)
            this.tourl = "detailcontrol/micontrol"
            this.grid = "zzj"
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    getjiedianInfo () {
      // 从localStorage的Token中获取userCode：U1
      let userC = JSON.parse(localStorage.token)
      let userCode = JSON.stringify(userC.userCode).replace(/"/g, "")
      // console.log("从token中获取的userCode:" + userCode)
      this.jiedianInfo.datas.userId = userCode
      this.jiedianInfo.datas.parkId = this.parkId

      let submit = {}
      submit = JSON.stringify(this.jiedianInfo)
      console.log(submit)
      this.$axios({
        method: 'post',
        url: '/GetParkLockNodeListInfoHandler.ashx?method=GET&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            this.jiedianBack = JSON.parse(JSON.parse(res.data.datas).list)
            console.log(this.jiedianBack)
            console.log(this.jiedianBack[0].deviceName)
            for (var i = 0; i < this.jiedianBack.length; i++) {
              this.menuList[2].detailList[i + 1].title = this.jiedianBack[i].deviceName
              this.menuList[2].detailList[i + 1].value = this.jiedianBack[i].deviceId
            }
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log('出现了错误' + err)
        })
    },
    input (res) {
      this.searchVal = res.value
    },


  },
  mounted () {
    this.getlockInfo()
    this.getjiedianInfo()
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
  background: url('../../static/img/分割线.png');
  background-repeat: no-repeat;
  background-position-y: bottom; /*背景图片在纵向的最下方显示*/
  background-size: 100% 30%;
}
.flex-item {
  width: 25%;
  text-align: center;
  padding-top: 25rpx;
}
.flex-item2 {
  width: 72%;
  text-align: center;
}
#tb1 {
  // border: 1px solid #f00;
  width: 100%;
  tr {
    .td1 {
      width: 60%;
      // border: 1px solid #f00;
    }
    .td2 {
      width: 40%;
      // border: 1px solid #f00;
    }
  }
}
</style>
