<template>
  <view>
    <!-- 自定义导航 -->
    <van-nav-bar :title="city_start + '-' + city_end" left-arrow safe-area-inset-top="true" placeholder="false"
      @click-left="onClickLeft" border="false">
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <!-- 场地预定 -->
    <view class="reserve_top">
      <view class="top_view">
        <view class="top_date" v-for="(item,index) in weekArray" v-bind:key="index"
          :class="[index,{top_date_active:weekIndex==index}]" @click="resetSeat(index)">
          <text>{{item.weekDay}}</text>
        </view>
      </view>
    </view>
    <!-- 自定义tag选择时间 -->
    <!-- 正常 -->
    <!-- 每条item -->
    <ticket :tickets="tickets" v-if="update" @getIndex="getIndex">
    </ticket>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        tickets: [], //车票详情
        active: 0, //初始索引
        update: true,
        city_start: '',
        city_end: '',
        // 场地预定
        weekArray: [], // 周时间数组
        weekIndex: 0, // 周时间下标
        colArray: [], //场次列数组，例如：1号场，2号场，3号场
        venueList: [],
        venueArray: [], //场次的二维数组,1为空场次，2为已选场次，3为占用场次，4为空白，即背景色
        venueArrayType: [], //场次的状态记录
        venueRow: 0, //场次行数
        venueCol: 0, //场次列数
        chooseNum: 0, // 已选场次的数量
        choosePrice: '', //价格
        chooseArray: [], // 已选场次的数组
        chooseList: [], // 添加预定的数组
        chooseTime: '', //添加预定的时间
        selectTime: '', //查询预定的时间

        phoneNum: '',
        venueName: '',
        venueid: '',
        typeID: '',
        showBtn: true,
        starttime: 0, //开始时间
        middleWidth: 0
      }
    },

    onLoad(options) {
      // 我是onload
      console.log("我是onload");
      // 获取时间
      this.weekIndex = 0
      this.venueName = 'xxx'
      this.typeID = 3
      this.venueid = 1
      this.phoneNum = 17688886666
      this.venueCol = 2
      this.venueRow = 15

      if (this.venueCol < 6) {
        this.middleWidth = 750
      } else {
        this.middleWidth = 750 + (this.venueCol - 6) * 100
      }

      this.getNum();
      this.getWeekTime();
      this.chooseTime = this.weekArray[this.weekIndex].dayTime

    },

    onShow() {
      console.log("我是show");
      // 获取导航城市
      this.city_start = getApp().globalData.city_start
      this.city_end = getApp().globalData.city_end
      // 获取票的详细信息
      this.tickets = this.$store.state.tickets
      this.update = false
      this.update = true

      console.log(this.tickets)
    },

    methods: {
      // 导航栏返回
      onClickLeft() {
        uni.navigateBack({})
      },
      // 获取子组件index
      getIndex(i) {
        console.log("给我跳转");
        uni.navigateTo({
          url: '/subpkg/progress/index?index=' + i,
        })

      },
      // 点击选票跳转购买
      select(index) {
        console.log("哈哈");
        console.log(index)
      },
      // 获取一周日期
      getWeekTime() {
        var showDate = [];
        var newDate = [];
        var siteDate = [];
        for (var i = 0; i < 7; i++) {
          var weekDayArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
          var myDate = new Date()
          var year = myDate.getFullYear()
          var milliseconds = myDate.getTime() + 1000 * 60 * 60 * 24 * i;
          var newMyDate = new Date(milliseconds);
          var weekDay = newMyDate.getDay();
          var month = newMyDate.getMonth() + 1;
          var day = newMyDate.getDate();
          showDate.push(weekDayArr[weekDay] + "\n" + month + '-' + day)
          newDate.push(year + '' + (month >= 10 ? month : "0" + month) + '' + (day >= 10 ? day : "0" + day))
          siteDate.push(year + '-' + (month >= 10 ? month : "0" + month) + '-' + (day >= 10 ? day : "0" + day))
        }

        for (var i = 0; i < showDate.length; i++) {
          this.weekArray.push({
            weekDay: showDate[i],
            dayTime: newDate[i],
            selectTime: siteDate[i]
          })
        }
      },
      // 获取一天时间
      getNum: function() {
        this.starttime = 7
      },
      // 重置数组状态
      resetSeat: function(index) {
        this.chooseArray = [];
        this.chooseList = [];
        this.chooseNum = 0; // 选择数量置为0,价格自动变为0
        this.weekIndex = index; // 根据下标改变class的颜色
        this.chooseTime = this.weekArray[index].dayTime; // 格式化后的时间

        // 将所有的值变为0
        let oldArray = this.venueArrayType.slice();
        for (let i = 0; i < this.venueRow; i++) {
          for (let j = 0; j < this.venueCol; j++) {
            if (oldArray[i][j] !== 4) {
              oldArray[i][j] = 1
            }
          }
        }
        let newArray = oldArray.slice();

        var selectTime = this.weekArray[this.weekIndex].selectTime;

        let siteData = {
          venueid: this.venueid,
          sporttype: this.typeID,
          datetime: selectTime
        }

        this.venueList = '0-0,0-1,0-2,0-3,0-4,0-5,0-6,0-7,1-0,1-1,1-2,1-3,1-4,1-5,1-6,1-7'
        var test = this.venueList.split(',')
        // 初始化已经购买的,状态为3
        for (var item of test) {
          let oldArr = this.venueArrayType[item.split("-")[1]];
          let newArr = oldArr.slice(0);
          newArr[item.split("-")[0]] = 3;
          this.$set(this.venueArrayType, [item.split("-")[1]], newArr)
        }
      },

    },
  }
</script>

<style lang="scss">
  page {
    background: #dedede;
    // padding-left: 20rpx;
    // padding-right: 20rpx;
    // width: 667rpx;
    // width: 750upx;
    box-sizing: border-box;
    width: 100%;
    height: 100%;

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
    }

    // 自定义tag
    .van-tabs {
      width: 100%;
    }

  }

  // 场地预定
  .venue_reserve {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .reserve_top {
    // height: 200upx;
  }

  .top_view {
    display: flex;
    justify-content: space-around;
  }

  .top_date {
    float: left;
    width: 13%;
    height: 35px;
    color: #666;
    background-color: #F5F5F8;
    list-style: none;
    padding-top: 5px;
    padding-bottom: 5px;
    border-color: #ccc;
    border-style: solid;
    border-width: 1px;
    text-align: center;
    font-size: 12px;
  }

  .top_date_active {
    background-color: #FFFFFF;
    border: 1px solid #007BFF;
    color: #007BFF;
  }

  .reserve_legend {
    display: flex;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }

  .dp {
    display: flex;
  }

  /* 图例样式 */
  .reserve_legend_view {
    font-size: 12px;
    display: flex;
    justify-content: center;
    width: 250rpx;
    margin: auto;
  }

  .reserve_legend_view_i {
    width: 30rpx;
    height: 30rpx;
    margin-right: 20rpx;
  }

  .bg_one {
    background-color: #6acb6c;
  }

  .bg_two {
    background-color: #CCCCCC;
  }

  .bg_three {
    background-color: #007BFF;
  }

  /* 图例样式 */



  /* 底部提交按钮样式 */
  .reserve_bottom {
    display: flex;
    color: #fff;
    line-height: 100rpx;
    flex: 0 0 100rpx;
  }

  .btm_txt {
    background-color: #FFFFFF;
    width: 70%;
    height: 100rpx;
    line-height: 100rpx;
    display: flex;
    padding-left: 20rpx;
  }

  .btm_price {
    font-size: 16px;
    color: #A5A5A5;
  }

  .btm_nums {
    font-size: 22px;
    color: #FF0000;
  }

  .btm_order {
    display: flex;
    width: 30%;
    line-height: 100rpx;
    justify-content: center;
  }

  .btm_gray {
    background-color: #BCBBBB;
    color: #FFFFFF;
  }

  .btm_blue {
    background-color: #007BFF;
    color: #FFFFFF;
  }
</style>
