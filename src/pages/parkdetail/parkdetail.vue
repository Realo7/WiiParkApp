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
        :placeholder="$t('m.plzinput')"
        @confirm="search"
        class="flex-item2"
      />
    </view>

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
        :show-badge="true"
        title=""
        badge-text=""
        v-for="(item, index) in lockBack"
        :key="index"
        @click="goincontrol(index)"
      >
        <view>

          <table id="tb1">
            <tr>
              <td class="td1">{{$t('m.SpaceNo')}} {{item.parkLockNum}}</td>
              <td class="td1">{{$t('m.SpaceState')}} {{item.carState}}</td>
            </tr>
            <tr>
              <td class="td1">{{$t('m.SpaceLockNo')}}
                <div> {{item.parkLockId}}</div>
              </td>
              <td class="td1">{{$t('m.linkState')}} {{item.onlineState}}</td>
            </tr>
            <tr>
              <td class="td1">{{$t('m.SpaceLockState')}} {{item.parkLockState}}</td>
              <td class="td1">{{$t('m.runState')}} {{item.runState}}</td>
            </tr>
            <tr>
              <td class="td1">{{$t('m.controlStyle')}} {{item.priority}}</td>
              <td class="td1"></td>
            </tr>
          </table>

        </view>
      </uni-list-item>
    </uni-list>

    <view class="text">
      <text>{{filterResult}}</text>
    </view>
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
      themeColor: '#000000',
      titleColor: '#666666',
      filterResult: '',
      menuList: [{
        'title': '设备类型',
        'detailTitle': '请选择设备类型（可多选）',
        'isMutiple': true,
        'key': 'jobType',
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
        },
        {
          'title': '节点',
          'value': '节点'
        }
        ]

      },
      {
        'title': '全部状态',
        'key': 'salary',
        'isMutiple': true,
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
        'key': 'single',
        'isMutiple': false,
        'detailTitle': '请选择（单选）',
        'reflexTitle': true,
        'defaultSelectedIndex': 0,
        'detailList': [{
          'title': '不限',
          'value': ''
        },
        {
          'title': '条件1',
          'value': 'test_1'
        },
        {
          'title': '条件2',
          'value': 'test_2'
        },
        {
          'title': '条件3',
          'value': 'test_3'
        },
        {
          'title': '条件4',
          'value': 'test_4'
        },
        {
          'title': '条件5',
          'value': 'test_5'
        },
        {
          'title': '条件6',
          'value': 'test_6'
        },
        {
          'title': '条件7',
          'value': 'test_7'
        },
        {
          'title': '条件8',
          'value': 'test_8'
        },
        ]
      },
      {
        'title': '排序',
        'key': 'sort',
        'isSort': true,
        'reflexTitle': true,
        'defaultSelectedIndex': 0,
        'detailList': [{
          'title': '默认排序',
          'value': ''
        },
        {
          'title': '发布时间',
          'value': 'add_time'
        },
        {
          'title': '薪资最高',
          'value': 'wages_up'
        },
        {
          'title': '离我最近',
          'value': 'location'
        }
        ]
      }
      ],
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
      lockBack: []
    }

  },
  onLoad (options) {
    let parkId = options.parkId;
    console.log(parkId)
    this.lockInfo.datas.parkId = parkId
  },
  methods: {
    result (val) {
      console.log('filter_result:' + JSON.stringify(val));
      this.filterResult = JSON.stringify(val, null, 2)
    },
    chosepark () {
      uni.switchTab({
        url: '../main/main',
      });
    },
    goincontrol (index) {
      console.log(this.lockBack[index].parkLockNum)
      uni.navigateTo({
        url: '../parkdetail/detailcontrol/sLockcontrol?parkLockId=' + this.lockBack[index].parkLockId + '&parkName=' + this.lockBack[index].parkName + '&parkLockState=' + this.lockBack[index].parkLockState,
      });
    },
    getlockInfo () {
      // 从localStorage的Token中获取userCode：U1
      let userC = JSON.parse(localStorage.token)
      let userCode = JSON.stringify(userC.userCode).replace(/"/g, "")
      // console.log("从token中获取的userCode:" + userCode)
      this.lockInfo.datas.userId = userCode
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
            console.log(this.lockBack)
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
    this.getlockInfo()
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
