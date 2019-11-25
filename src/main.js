import Vue from 'vue'
import App from './App'
import VueI18n from "vue-i18n"

import store from './store'


Vue.config.productionTip = false

Vue.use(VueI18n)

Vue.prototype.$store = store

App.mpType = 'app'

const i18n = new VueI18n({
    locale: 'zh-CN',    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
      'zh-CN': require('./common/lang/zh'),   // 中文语言包
      'en-US': require('./common/lang/en')    // 英文语言包
    }
})

const app = new Vue({
    i18n,
    store,
    ...App
})
app.$mount()
