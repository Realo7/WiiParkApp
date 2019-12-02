<template>
  <div>
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
          :defaultVal="['2017','12','31','-','2019','12','31']"
          :current="false"
          @confirm="onConfirm"
          ref="range"
          themeColor="#f00"
        ></w-picker>
      </view>
      <uni-search-bar
        radius="100"
        :placeholder="$t('m.plzinput')"
        @confirm="search"
        class="flex-item2"
      />
    </view>
    停车记录页面
    <uni-list class="newbtn">
      <uni-list-item
        :show-badge="true"
        :show-arrow="false"
        @click="goincontrol()"
      >
        <view>
          <table id="tb1">
            <tr>
              <td class="td1">{{$t('m.SpaceNo')}}</td>
              <td class="td1">{{$t('m.SpaceState')}}</td>
            </tr>
            <tr>
              <td class="td1">{{$t('m.SpaceLockNo')}}</td>
              <td class="td1">{{$t('m.linkState')}}</td>
            </tr>
            <tr>
              <td class="td1">{{$t('m.SpaceLockState')}}</td>
              <td class="td1">{{$t('m.runState')}}</td>
            </tr>
            <tr>
              <td class="td1">{{$t('m.controlStyle')}}</td>
              <td class="td1"></td>
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
    }
  },
  methods: {
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
  width: 100%;
  tr {
    .td1 {
      width: 60%;
    }
    .td2 {
      width: 40%;
    }
  }
}
</style>