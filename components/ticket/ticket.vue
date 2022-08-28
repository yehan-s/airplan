<template>
  <view>
    <!-- <view class="choose-wrapper"> -->
    <view class="choose-wrapper" v-for="(item, index) in tickets"  @click="toIndex(index)" :key="index">
      <view class="left-wrapper">
        <!-- item左侧容器 -->
        <view class="time-left">
          <!-- 左侧时间 -->
          <view class="time1 time">
            {{item.time1}}
            <!-- <slot name="time1"></slot> -->
          </view>
          <!-- 左侧城市 -->
          <view class="city1 city">
            {{item.city1}}
          </view>
        </view>
        <!-- 横线 - 连接线 -->
        <view class="connection">
        </view>
        <!-- 右侧选择 -->
        <view class="time-right">
          <!-- 右侧时间 -->
          <view class="time2 time">
            {{item.time2}}
          </view>
          <!-- 右侧城市 -->
          <view class="city2 city">
            {{item.city2}}
          </view>
        </view>
      </view>
      <!-- item右侧容器 -->
      <view class="right-wrapper">
        ￥
        <view class="price">
          {{item.price}}
        </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
  export default {
    name: "ticket",
    props: ['tickets'],
    data() {
      return {
        // sTickets: this.tickets
      };
    },
    methods:{
      // 子传父index
      toIndex(i){
        console.log("ticket" + i);
        this.$emit('getIndex', i)
      }
    }
  }
</script>

<style lang="scss">
  // 每条item
  .choose-wrapper {
    background: #fff;
    display: flex;
    box-sizing: border-box;
    border-radius: .4rem;
    height: 180upx;
    padding: 30upx 40upx 20upx 40upx;
    justify-content: space-between;
    margin-top: 15upx;
    margin-bottom: 15upx;
    // align-items: center;
    // transform:translateY(-50%);
    margin-left: 20upx;
    margin-right: 20upx;
    // width: 667rpx;
    width: 710upx;

    // item左侧
    .left-wrapper {
      // position: relative;
      width: 430upx;
      display: flex;
      justify-content: space-between;

      // 左侧城市时间
      // 时间
      .time {
        color: #2A2A2A;
        font-size: 46upx;
        font-weight: 600;
      }

      // 城市
      .city {
        color: #7A7A7A;
      }

      // 横线 - 连接线
      .connection {
        // position: absolute;
        // left: 40%;
        // top:50%;
        background: #b5b5b5;
        width: 25%;
        height: 5upx;
        transform: translateY(50upx);
      }
    }

    // 右侧容器
    .right-wrapper {
      line-height: 120upx;
      font-weight: 600;
      color: orange;
      display: flex;
      vertical-align: baseline;
    }

    .price {
      font-size: 46upx;
      vertical-align: baseline;
      // color: red;
    }
  }
</style>
