<template>
  <div>
    {{resultInfo.result}}
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
    <uni-list>
      <uni-list-item
        :show-badge="true"
        :show-arrow="false"
        v-for="(item, index) in recordBack"
        :key="index"
        class="newbtn"
      >
        <view>
          <table id="tb1">
            <tr>
              <td class="td1">{{item.parkName}}</td>
              <td class="td1">{{item.parkLockId}}</td>
            </tr>
            <tr>
              <td class="td1">入场时间：{{item.inTm}}</td>
              <td class="td1">{{item.payState}}</td>
            </tr>
            <tr>
              <td class="td1">停留时间：{{item.payTm}}</td>
              <td class="td1"></td>
            </tr>
            <tr>
              <td class="td1">出场时间：{{item.outTm}}</td>
              <td class="td1">状态：{{item.outState}}</td>
            </tr>
          </table>
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
        name: "选择区间日期"
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
          "parkId": "PK0067",
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
      recordBack: []
    }
  },
  methods: {
    search () {
      alert("搜索")
    },
    getrecordInfo () {
      // 从localStorage的Token中获取userCode：U1
      let userC = JSON.parse(localStorage.token)
      let userCode = JSON.stringify(userC.userCode).replace(/"/g, "")
      console.log("从token中获取的userCode:" + userCode)
      this.wantInfo.datas.userId = userCode
      let submit = {}
      submit = JSON.stringify(this.wantInfo)
      // console.log("sub" + submit)
      this.$axios({
        method: 'post',
        url: '/GetParkLockDealInfoHandler.ashx?method=GET&lan=zh-CN&type=app&compress=00',
        // headers: { 'Content-Type': 'application/json' },
        data: submit,
        emulateJSON: true
      })
        .then(res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            this.recordBack = JSON.parse(JSON.parse(res.data.datas).list)
            console.log(this.recordBack)
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log('出现了错误' + err)
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
      //如果页面需要调用多个mode类型，可以根据mode处理结果渲染到哪里;
      // switch(this.mode){
      // 	case "date":
      // 		break;
      // }
      this.resultInfo = val;
    }
  },
  mounted () {
    this.getrecordInfo()
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
.text {
  margin-top: 50px;
  margin-left: 20px;
  width: 100%;
  font-family: Microsoft-YaHei;
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
  text-align: center;
  padding-top: 25rpx;
}
.flex-item2 {
  width: 72%;
  text-align: center;
}
#tb1 {
  width: 100%;
  tr {
    .td1 {
      width: 70%;
    }
    .td2 {
      width: 30%;
    }
  }
}
</style>