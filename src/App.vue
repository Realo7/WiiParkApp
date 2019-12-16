<script>
export default {
  onLaunch: function () {
    console.log('App Launch');
    // setTimeout(() => {
    //   uni.setTabBarBadge({ //在tabbar的第index元素上显示未读消息数量
    //     index: 1,
    //     text: '1'
    //   });
    //   uni.showTabBarRedDot({ //在tabbar的第index元素上显示红点
    //     index: 0
    //   });
    // }, 1000);
  },
  onShow: function () {
    console.log('App Show');
  },
  onHide: function () {
    console.log('App Hide');
  }

}
</script>

<style>
/* 头条小程序需要把 iconfont 样式放到组件外 */
@import 'components/m-icon/m-icon.css';

/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import './common/uni.css';
</style>
