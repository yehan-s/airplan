import Vue from 'vue'
import Vuex from 'vuex'
import * as db from '@/utils/db.js'
Vue.use(Vuex);
let userInfo = db.get('userInfo') || {}
let token = db.get('token') || ''

export default new Vuex.Store({
  state: {
    userInfo: userInfo,
    token: token,
    orderInfo: {},
    // hasLogin: false, // 登录状态
    // userInfo: {}, // 用户信息
    tickets: [{
        time1: '17:55',
        time2: '20:10',
        city1: '武汉',
        city2: '上海',
        price: '300'
      },
      {
        time1: '18:25',
        time2: '20:20',
        city1: '武汉',
        city2: '上海',
        price: '280'
      }
    ],
  },
  mutations: {
    // setHasLogin(state, value){
    //     state.hasLogin = value
    //     console.log(state.hasLogin)
    // }
  },
  actions: {},
  getters: {}
})
