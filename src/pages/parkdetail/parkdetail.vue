<template>
  <view class="content">
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
        badge-text="2"
        @click="goindetail()"
      >
        <view style="white-space：nowrap;">
          <span>{{$t('m.parkname')}}</span>
          <span style="padding-left:80rpx;">{{$t('m.totalnum')}}</span>
          <view>
            <span>{{$t('m.hadstopednum')}}</span>
            <span>{{$t('m.remainnum')}}</span>
          </view>
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
      ]
    }
  },
  onLoad () {

  },
  methods: {
    result (val) {
      console.log('filter_result:' + JSON.stringify(val));
      this.filterResult = JSON.stringify(val, null, 2)
    }
  }
}
</script>

<style>
.text {
  margin-top: 50px;
  margin-left: 20px;
  width: 100%;
}
</style>
