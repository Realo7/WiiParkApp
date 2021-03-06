import Vue from 'vue'
import App from './App'
import VueI18n from "vue-i18n"
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
import uniSection from '@/components/uni-section/uni-section.vue'
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
import wPicker from "@/components/w-picker/w-picker.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import store from './store'
import vTable from "@/components/no-bad-table/table.vue"


Vue.config.productionTip = false

import url from '../src/common/config.js';

Vue.component("uniPopup",uniPopup);
Vue.component("wPicker",wPicker);
Vue.component('uniSearchBar',uniSearchBar);
Vue.component('uniSection',uniSection);
Vue.component('uniList',uniList);
Vue.component('uniListItem',uniListItem);
Vue.component('vTable',vTable);
Vue.config.productionTip = false

Vue.use(VueI18n)

Vue.config.productuinTip = false 

Vue.prototype.$baseurl=url.BaseUrl;

Vue.prototype.$store = store;

App.mpType = 'app'


const i18n = new VueI18n({
    locale: 'zh-CN',    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
      'zh-CN': require('./common/lang/zh'),   // 中文语言包
      'en-US': require('./common/lang/en')    // 英文语言包
    },
    silentTranslationWarn:true
})
Vue.prototype._i18n = i18n


const app = new Vue({
    i18n,
    store,
    ...App
})
app.$mount()
