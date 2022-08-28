<template>
  <view>
   <van-tabs :active="active" bind:change="onChange" sticky title-active-color="black" color="#5a64e3">
     <!-- 第一个标签：待出行 -->
      <van-tab title="待出行的订单">
        <van-empty
          class="custom-image"
          image="/static/order/order-1-1.png"
          description="暂无订单"
        />
      </van-tab>
      <!-- 第二个标签：全部订单 -->
      <van-tab title="全部订单">
        <van-empty
          class="custom-image"
          image="/static/order/order-2-1.png"
          description="暂无可用订单"
        />
      </van-tab>
    </van-tabs>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        active: 1
      };
    },
    // 标签切换
    onChange(event) {
      wx.showToast({
        title: `切换到标签 ${event.detail.name}`,
        icon: 'none',
      });
    },
  }
</script>

<style lang="scss">

</style>
