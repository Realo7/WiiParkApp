<template>
  <view class="content">
    <!-- {{searchVal}} -->
    <uni-search-bar
      radius="100"
      @input="input"
      :placeholder="$t('m.plzinput1')"
      @confirm="getInfo"
    />
    <!-- badge-text小绿点 -->
    <uni-list>
      <uni-list-item
        v-for="(item, index) in parkInfoBack"
        :key="index"
        @click="goindetail(index)"
      >
        <view class="uni-flex uni-column">

          <view class="uni-flex uni-row">
            <view class="flex-item td1">{{item.name}}</view>
            <view class="flex-item td1">
              {{$t('m.totalnum')}}：
              {{item.totalSpace}}
            </view>

          </view>

          <view class="uni-flex uni-row">
            <view class="flex-item td2">
              {{$t('m.hadstopednum')}}：
              {{item.totalSpace-item.availableSpace}}
            </view>
            <view class="flex-item td2">
              {{$t('m.remainnum')}}：
              {{item.availableSpace}}
            </view>

          </view>
        </view>
      </uni-list-item>
    </uni-list>

  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
  data () {
    return {
      GetParkInfo: {
        "appId": "",
        "privatekey": "",
        "datas": {
          "userId": "",
          "pageIndex": "1",
          "pageSize": "",
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
      searchVal: ""
    }
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
    getInfo () {
      // console.log("基础URL" + this.$baseurl)
      console.log("从token中获取的userCode:" + this.getuserCode())
      this.GetParkInfo.datas.userCode = this.getuserCode()
      this.GetParkInfo.datas.parkName = this.searchVal
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
    goindetail (index) {
      console.log(this.parkInfoBack[index].parkId)
      uni.navigateTo({
        url: '../parkdetail/parkdetail?parkId=' + this.parkInfoBack[index].parkId,
        // params: {
        //   parkId: this.parkInfoBack[index].parkId
        // }
      });
    },
    changetabbar () {
      uni.setNavigationBarTitle({
        title: this.$t('m.parkmanagement')
      });
      uni.setTabBarItem({
        index: 0,
        text: this.$t('m.parkmanagement')
      })
      uni.setTabBarItem({
        index: 1,
        text: this.$t('m.parkrecord')
      })
      uni.setTabBarItem({
        index: 3,
        text: this.$t('m.InfoQuery')
      })
      uni.setTabBarItem({
        index: 4,
        text: this.$t('m.me')
      })
    }
  },
  mounted () {
    this.getInfo()
    this.changetabbar()

  },
  //newVue之前自动触发beforeCreate
  beforeCreate () {
    // 获取token
    uni.getStorage({
      key: "token",
      success (e) {
      },
      //token 不存在 ->登录
      fail (e) {
        uni.navigateTo({
          url: '../login/login',
        });
      }
    })

    //if token 存在 ->继续渲染组件
  },
  //监听下拉状态
  onPullDownRefresh () {
    this.getInfo()
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 1000);
  },
  onReachBottom: function () {
    var that = this;
    that.GetParkInfo.pageSize = that.GetParkInfo.pageSize * 1 + 5
    that.getInfo()
  }
}
</script>

<style lang="scss">
.popup-btn {
  margin-top: 10px;
}
.hello {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.title {
  color: #8f8f94;
  margin-top: 25px;
}

.ul {
  font-size: 15px;
  color: #8f8f94;
  margin-top: 25px;
}

.ul > view {
  line-height: 25px;
}

/* #ifdef MP-TOUTIAO */
@font-face {
  font-family: uniicons;
  font-weight: normal;
  font-style: normal;
  src: url('~@/static/uni.ttf') format('truetype');
}

/* #endif */

/* #ifndef APP-NVUE */
page {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #efeff4;
  min-height: 100%;
  height: auto;
}

view {
  font-size: 28rpx;
  line-height: inherit;
}

.example {
  padding: 0 30rpx 30rpx;
}

.example-info {
  padding: 30rpx;
  color: #3b4144;
  background: #ffffff;
}

.example-body {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  font-size: 14rpx;
  background-color: #ffffff;
}

/* #endif */
.example {
  padding: 0 30rpx;
}

.example-info {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  padding: 30rpx;
  color: #3b4144;
  background-color: #ffffff;
  font-size: 30rpx;
}

.example-info-text {
  font-size: 28rpx;
  line-height: 36rpx;
}

.example-body {
  flex-direction: column;
  padding: 30rpx;
  background-color: #ffffff;
}

.word-btn-white {
  font-size: 18px;
  color: #ffffff;
}

.word-btn {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  height: 48px;
  margin: 15px;
  background-color: #007aff;
}

.word-btn--hover {
  background-color: #4ca2ff;
}

.td1 {
  width: 50%;
}
.td2 {
  width: 50%;
}
</style>
