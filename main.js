import App from './App'
import store from '@/store/index.js'
// 引用通用工具类
import * as comm from '@/utils/common.js'
// 引入正则
import validate from '@/utils/validate.js';
// 从localStorage中存储数据
import * as db from '@/utils/db.js';

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

Vue.prototype.$comm = comm;
Vue.prototype.$store = store;
Vue.prototype.$validate = validate;
Vue.prototype.$db = db;

App.mpType = 'app'
const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif