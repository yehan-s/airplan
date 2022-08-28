<template>

  <view class="page">
    <view class='avatar-wrapper'>
      <img :src="avatarUrl" alt="" class="avatar" v-if="avatarUrl">
      <view class="nickName">
        {{nickName}}
      </view>
    </view>
    <!-- <image src="/static/images/weilogo.png" ></image> -->
<!--    <view style="height: 20upx;width: 100%;background: #FFFFFF;"></view> -->

<!--    <view class="weiLogo" v-if="userInfo">
      <view>
        <image :src="avatarUrl"></image>
      </view>
      <view style="margin-left: 30upx;">{{nickName}}</view>
    </view> -->

    <!-- 分割线 -->
    <view style="height: 30upx;"></view>

    <!-- 上方四个 订单付款 -->
    <van-grid clickable column-num="4">
      <van-grid-item icon="balance-pay" link-type="navigateTo" url="/pages/dashboard/index" text="我的订单" />
      <van-grid-item icon="pending-payment" link-type="navigateTo" url="/pages/dashboard/index" text="待付款" />
      <van-grid-item icon="send-gift-o" link-type="navigateTo" url="/pages/dashboard/index" text="待出行" />
      <van-grid-item icon="comment-o" link-type="navigateTo" url="/pages/dashboard/index" text="带点评" />
    </van-grid>

    <!-- 分割线 -->
    <view style="height: 30upx;"></view>

    <!-- 小标题 我的服务 -->
    <view class="content">
      <view class="card-hader">
        <van-icon name="apps-o" size="25px" />
        <text style="margin-left: 20rpx;">我的服务</text>
      </view>
    </view>
    <!-- 下方十个跳转 -->
    <van-grid clickable column-num="5">
      <van-grid-item icon="bill-o" link-type="navigateTo" url="/pages/dashboard/index" text="我的行程" />
      <van-grid-item icon="medal-o" link-type="navigateTo" url="/pages/dashboard/index" text="信用分" />
      <van-grid-item icon="friends-o" link-type="navigateTo" url="/pages/dashboard/index" text="常用信息" />
      <van-grid-item icon="newspaper-o" link-type="navigateTo" url="/pages/dashboard/index" text="我的发票" />
      <van-grid-item icon="service-o" link-type="navigateTo" url="/pages/dashboard/index" text="我的客服" />
      <van-grid-item icon="star-o" link-type="navigateTo" url="/pages/dashboard/index" text="收藏/浏览" />
      <van-grid-item icon="down" link-type="navigateTo" url="/pages/dashboard/index" text="下载APP" />
      <van-grid-item icon="coupon-o" link-type="navigateTo" url="/pages/dashboard/index" text="领券中心" />
      <van-grid-item icon="setting-o" link-type="navigateTo" url="/pages/dashboard/index" text="设置" />
      <van-grid-item icon="ellipsis" link-type="navigateTo" url="/pages/dashboard/index" text="更多工具" />
    </van-grid>
  </view>
</template>

<script>
  // import uniIcons from "@/components/uni-icons/uni-icons.vue"
  // import {logout,getMyPageTotal } from"@/api/index.js"
  export default {
    // components:{
    // 	uniIcons
    // },
    data() {
      return {
        list: [{
            name: 'photo',
            title: '图片'
          },
          {
            name: 'lock',
            title: '锁头'
          },
          {
            name: 'star',
            title: '星星'
          },
          {
            name: 'hourglass',
            title: '沙漏'
          },
          {
            name: 'home',
            title: '首页'
          },
          {
            name: 'star',
            title: '音量'
          },
        ],
        // 昵称
        nickName: "",
        // 头像链接
        avatarUrl: "",
        weiUser: false,
        userInfo: false,

      }
    },
    onLoad() {

    },
    onShow() {
    // 从缓存中获取头像和昵称
      try {
        this.avatarUrl = JSON.parse(uni.getStorageSync('avatarUrl'))
        this.nickName = JSON.parse(uni.getStorageSync('nickName')) || ''
      } catch {
        uni.showToast({
          title: '头像获取有误'
        });
      }



      console.log("my页面渲染中");

      let _this = this
      try {
        let isLoading = uni.getStorageSync('isLoading')

        if (!isLoading) {
          uni.navigateTo({
            url: '/subpkg/login/login'
          })
          console.log("未登录")
        } else {
          console.log("已登陆")
        }
      } catch {
        console.log("isLoading storage有误")
      }
    },
    methods: {
      openPhone(e) {
        uni.makePhoneCall({
          phoneNumber: e //仅为示例
        });
      },
      getMyPageTotal() {
        getMyPageTotal().then(res => {
          if (res.returnCode == 0) {
            this.totalGoodOrderNum = res.result.totalGoodOrderNum
            this.totalHsOrderNum = res.result.totalHsOrderNum
            this.totalWeight = res.result.totalWeight
          }

        })
      },



    }
  }
</script>

<style scoped lang="scss">
  page {
    background: #DEDEDE;
  }

  .avatar-wrapper {
    width: 100%;
    height: 170upx;
    background: #5a64e3;
    padding: 30upx;
    display: flex;
    align-items: center;
    color: #ffffff;
  }

  .avatar {
    width: 150upx;
    height: 150upx;
    border-radius: 100%;
    margin-right: 40rpx;
    font-size: 16rpx
  }

  .page {
    background: #F5F5F5;
    height: auto;
  }

  .weiLogo {
    width: 100%;
    height: 140upx;
    background: #FFFFFF;
    padding: 30upx;
    display: flex;
  }

  .weiLogo image {
    width: 140upx;
    height: 140upx;
    border-radius: 50%;
  }



  // 我的服务
  .content {
    font-size: 25rpx;
    // margin-top: 70rpx;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #F8F8F8;
  }

  .card-hader {
    font-size: 30rpx;
    text-align: left;
    width: 92vw;
    margin: 0 500upx;
    padding: 15rpx 20rpx 40rpx 20rpx;
    background-color: #FFFFFF;
    border: 1rpx solid #FDF6EC;
    display: flex;
    align-items: flex-end;
  }

  .card-body {
    width: 92vw;
    margin: 0 500upx;
    padding: 15upx 20upx;
    background-color: #FFFFFF;
    border: 1upx solid #FDF6EC;
    border-top: none;
  }
</style>
