<template>
  <view>
    <!-- 自定义导航 -->
    <van-nav-bar :title="city_start + '-' + city_end" left-arrow safe-area-inset-top="true" :placeholder="true"
      @click-left="onClickLeft" :border="false">
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <!-- 半圆包裹 -->
    <view class="cart-bar">
      <view class="main-contents">
        <!-- 通知栏 -->
        <van-notice-bar left-icon="volume-o" text="温馨提示 : 注意当地疫情防范" background="rgba(47, 172, 239, 0.3)" color="#eee"/>
        <!-- 购物车列表 -->
        <ticket :tickets="solo"></ticket>
      </view>
    </view>
  </view>
</template>

<script>
  // import goodsCard from "@/components/goodsCard.vue"
  // import WaterfallsFlow from '@/components/WaterfallsFlow/WaterfallsFlow.vue'
  export default {
    // components:{goodsCard,WaterfallsFlow},
    data() {
      return {
        city_start: '',
        city_end: '',
        tickets: [], //车票详情
        i: null, //票的下标，方便获取唯一
      }
    },
    computed: {
      solo() {
        // 获取第一个对象
        let obj = this.tickets[this.i]
        // 创建一个空数组
        let arr = []
        // 将对象放入数组返回
        arr.push(obj)
        return arr
      }
    },
    onLoad(options) {
      console.log("我是index   load");
      console.log(options);
      console.log(options.index);
      console.log(typeof(parseInt(options.index)))
      this.i = parseInt(options.index)
      // let arr = this.tickets[this.i]
      // console.log(arr)
      // this.solo.push(arr)
      this.flowList = []
      this.addRandomData();
    },
    onShow() {
      console.log("我是index   show");
      // 获取导航城市
      this.city_start = getApp().globalData.city_start
      this.city_end = getApp().globalData.city_end
      // 获取票的详细信息
      this.tickets = this.$store.state.tickets

    },
    methods: {
      // 导航栏返回
      onClickLeft() {
        uni.navigateBack({})
      },
      addRandomData() {
        setTimeout(() => {
          this.flowList = this.list
        }, 200);
      },
    }
  }
</script>

<style lang="scss">
  // 自定义导航栏
  /deep/ .van-nav-bar {
    background: linear-gradient(to right, #4f8ef6, #4654EA);
    color: #eee !important;

    // 因为style标签上有 lang='less'  所以.van-nav-bar__title 可以嵌套到.van-nav-bar里面
    /* /deep/ 就是把data-v-hash值选择器写到类名的前面 */
    .van-nav-bar__title {
      color: #eee;
    }

    .van-icon {
      color: #eee !important;
    }

    .van-navbar__content {
      border: 0 none !important;
    }
  }
  
  // 半圆图层
  .cart-bar {
    background: linear-gradient(to right, #4f8ef6, #4654EA);
    border-radius: 0rpx 0rpx 50rpx 50rpx;
    height: 240rpx;
    position: relative;
  }
  
  // 通知栏
  .van-notice-bar{
    margin-bottom: 30upx;
  }
  

  page {
    background-color: #F3F3F3;
    // padding-bottom: 120rpx;
  }



  .main-contents {
    position: absolute;
    left: 0rpx;
    right: 0rpx;
    top: 30rpx;
    // #ifdef H5
    padding-bottom: 220rpx;
    // #endif
    // #ifndef H5
    padding-bottom: 120rpx;
    // #endif
  }



  .guess {
    display: flex;
    align-items: center;
    justify-content: center;



    text {
      color: #333333;
      font-size: 24rpx;
      margin-left: 5rpx;
    }
  }
</style>
