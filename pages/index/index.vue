<template>
  <view class="">
    <view class="container">
      <van-tabs :active="active" @click="onChange" color="#5a64e3" title-active-color="#5a64e3"
        title-inactive-color="#363636">
        <!-- 标签1：国内 -->
        <van-tab title="国内">
          <!-- 选择城市 -->
          <view class="city-wrapper">
            <van-transition name="fade-up">
              <view class="city-1" @click="startClick()">
                {{city1}}
              </view>
            </van-transition>

            <!-- 交换icon -->
            <!-- <throttle @click.stop="thTap"> -->
            <i class="iconfont icon-jiaohuan" @click="rotate" id="jiaohuan"
              :style="{'transform':'rotate(' + deg + 'deg)'}"></i>
            <!-- </throttle> -->
            <!-- 渐变动画 -->
            <van-transition name="fade-up">
              <view class="city-2" @click="endClick()">
                {{city2}}
              </view>
            </van-transition>
          </view>

          <!-- 分割线 -->
          <view class="divider-wrapper">
            <van-divider customStyle="border-color: #ccc; font-size: 20px;" />
          </view>


          <!-- 日期 -->
          <view class="date-wrapper">
            <!-- {{currentdate}} -->
            <!--   <view class="">
              {{date}}
              123
            </view> -->
            <!-- 日历控件 -->
            <view class="calendar-wrapper">
              <!-- 日历插件 -->
              <uni-calendar ref="calendar" :insert="false" @confirm="confirm" />
              <view @click="open">{{date}}</view>
            </view>
            <view class="date-text">
              今日出发
            </view>
          </view>

          <!-- 分割线 -->
          <view class="divider-wrapper">
            <van-divider customStyle="border-color: #ccc; font-size: 20px;" />
          </view>

          <!-- 按钮 -->
          <view class="search-btn-wrapper">
            <van-button class="btn" @click="goSearch()" type="primary" size="large" round
              color="linear-gradient(to right, #4f8ef6 , #4654EA)">飞机票查询</van-button>
          </view>

        </van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
        <van-tab title="标签 4">内容 4</van-tab>
      </van-tabs>
    </view>
  </view>
</template>

<script>
  // 获取当前时间戳的工具
  let util = require('../../utils/utils.js')
  import {
    Throttle
  } from '@/utils/throttle.js'

  export default {
    data() {
      return {
        // 初始标签索引
        active: 0,
        // 模拟城市选择
        city1: "武汉",
        city2: "上海",
        // 日期组件
        date: '',
        // 日历是否展示
        show: false,
        // 交换图标的角度
        deg: 0,
      };
    },
    methods: {
      // 查找城市
      startClick() {
        console.log("我是更换城市");
        this.$comm.navigateTo('/subpkg/selectCity/selectCity')
        uni.$once('emitCity', (res) => {
          this.city1 = res
        })
      },
      endClick() {
        this.$comm.navigateTo('/subpkg/selectCity/selectCity')
        uni.$once('emitCity', (res) => {
          this.city2 = res
        })
      },
      //
      onChange() {
        console.log("12");
      },
      // 跳转search页面
      goSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },
      // 获取当前时间戳
      // getdate() {
      //   var date = new Date();
      // },
      //日历展示 
      open() {
        this.$refs.calendar.open();
      },
      // 日历改变
      confirm(e) {
        console.log(e);
        let date = e.fulldate;
        let dateArr = date.split('-')
        console.log(dateArr);
        this.date = `${dateArr[1]}月${dateArr[2]}日`
      },
      // 旋转
      rotate: Throttle(function() {
        console.log(this + '内部');
        this.deg += 180;
        [this.city1, this.city2] = [this.city2, this.city1]
      }, 500),

    },
    onLoad() {
      // 获取页面属性
      uni.getSystemInfo({
        success: function(res) {
          let windowHeight = res.windowHeight;
          let windowWidth = res.windowWidth
          console.log(windowWidth)
          console.log(windowHeight)
        }
      })

      //获取当前时间戳 
      let time = util.formatTime(new Date())
      console.log(time)
      let timeArr = time.split('/')
      console.log(timeArr)
      let currentTime = `${timeArr[1]}月${timeArr[2]}日`
      this.date = currentTime
    }


  }
</script>

<style lang="scss">
  // vant内置样式
  // @import url("@/wxcomponents/vant/dist/common/index.css");
  // 自带的字体
  @import url("@/static/fonts/iconfont.css");

  // 设置背景色灰色
  page {
    background: #dedede;
    padding-left: 20rpx;
    padding-right: 20rpx;
    // width: 667rpx;
    width: 750upx;
    box-sizing: border-box;
  }

  // 标签容器
  .container {
    background: #fff;

    // 分界线
    .divider-wrapper {
      margin-left: 55upx;
      margin-right: 55upx;
    }

    // 城市选择容器
    .city-wrapper {
      // background-color: red;
      display: flex;
      flex-direction: row;
      font-size: 54rpx;
      color: #2A2A2A;
      align-items: center;
      justify-content: space-between;
      // width: 667rpx;
      // 和上方标签对称
      padding-left: 52upx;
      padding-right: 52upx;
      box-sizing: border-box;
      background: #fff;
      margin-top: 25upx;
      font-weight: 600;

      // 交换icon
      i {
        color: #5a64e3;
        font-size: 60rpx;
        transition: all 0.8s;
        // transform: rotate(45deg)
      }

      // i:active{
      //   // transform: rotateX(1turn);
      //   // transform: translateX(50px);
      //   transform: rotate(180deg)
      //   // tra
      // }
    }

    // 日期容器
    .date-wrapper {
      margin-left: 55upx;
      margin-right: 55upx;
      font-size: 40upx;
      display: flex;
      align-items: baseline;
      color: #2A2A2A;
      font-weight: bold;

      // 今日出发
      .date-text {
        font-size: 28upx;
        margin-left: 20upx;
        color: #2A2A2A;
        font-weight: normal;
      }
    }

    // 飞机票查询按钮
    .search-btn-wrapper {
      margin-left: 55upx;
      margin-right: 55upx;
      font-weight: bold;
      letter-spacing: 3upx;

      .btn {
        // box-shadow: #5a5e66;
        // box-shadow: 0.1em 0.1em 0.5em #124;
      }

    }
  }
</style>
