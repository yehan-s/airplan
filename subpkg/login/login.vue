<template>
  <view class="content">
    <view class="login-wrapper">
      
      <view class="logo">
        <image mode="heightFix" src="/static/logo.png"></image>

      </view>

      <view class="jiangqie-login-btn">
        <view class="jiangqie-button" @click="clickWalk()">随便逛逛</view>
      </view>

    </view >
 <!--  <button class='bottom' type='primary' @click="getUserInfo" withCredentials="true" lang="zh_CN">
      授权登录
    </button> -->
  <van-button color="linear-gradient(to right, #4f8ef6 , #4b57f8)" class="login-btn" size="large" @click="getUserInfo">
      授权登录
    </van-button>
  </view>
</template>

<script>


  export default {
    data() {
      return {
        background: '',

        code: undefined,
        // nickName: uni.getStorage({
        //   key:
        // }),
        nickName: null,
        avatarUrl: null,
        // isloading: uni.getStorageSync('isloading') || true, //默认为true
      };
    },

    onLoad(options) {
      
      
      console.log("正在获取地址")
   
    },

    methods: {
      clickLogin(e) {
        wx.getUserProfile({
          desc: '用于完善会员资料',
          success: res => {
            let userInfo = res.userInfo;
            this.login(userInfo.nickName, userInfo.avatarUrl);
          },
          fail: (err) => {
            console.log(err);
          }
        })
      },

      getUserInfo() {
        let that = this;
        uni.getUserProfile({
          desc: '用于完善会员资料',
          provider: 'weixin',
          success: function(infoRes) {
            console.log(infoRes)
            that.nickName = infoRes.userInfo.nickName; //获取用户登录昵称
            that.avatarUrl = infoRes.userInfo.avatarUrl; //获取用户头像
            try {
              // uni.setStorageSync('isloading', false); //记录是否第一次授权  false:表示不是第一次授权
 
              console.log(getApp().globalData.isLoading)
              // getApp().globalData.isLoading = true
              uni.setStorageSync('isLoading', JSON.stringify(true));
              uni.setStorageSync('avatarUrl', JSON.stringify(that.avatarUrl));
              uni.setStorageSync('nickName', JSON.stringify(that.nickName));
              // that.updateUserInfo();
              
              // 返回
              uni.navigateBack()
            } catch (e) {
              console.log(e)
            }
          },
          fail(res) {
            console.log("未授权")
          }
        });
        
      },

      clickWalk() {
        // Util.navigateBack();
        console.log(getApp());
        console.log(getApp().globalData);
      },


    }
  }
</script>

<style lang="scss">
  @import "@/style/style.scss";
  page{
    width: 750px;
    
    .login-wrapper {
      position: fixed;
      height: 100%;
      width: 100%;
      text-align: center;
      background-size: cover;
      background-position: center;
    }
    
    .logo {
      padding-top: 360rpx;
    }
    
    .logo image {
      height: 200upx;
      // border-radius: 0%;
    }
    
    .logo view {
      line-height: 4rem;
      color: $Q-login-color;
    }
    
    .jiangqie-login-btn {
      position: absolute;
      width: 100%;
      bottom: 140rpx;
    }
    
    .jiangqie-button {
      margin: 0 100rpx;
      line-height: 2.6rem;
      border-radius: 3rem;
      font-size: $Q-sub-info-size;
      font-weight: $Q-strong-btn-weight;
      margin-bottom: 1.2rem;
      border-color: $Q-login-border-color;
      background: none;
    }
    
    .jiangqie-login-tip {
      font-size: 22rpx;
      color: $Q-login-color;
    
      text {
        color: $Q-login-color;
        text-decoration: underline;
      }
    }
    
    // 授权登录按钮
    .login-btn{
      position: absolute;
      width: 350upx;
      height: 50upx;
      top: 800upx;
      left: 50%;
      transform: translateX(-50%);
      margin: 0 auto;
    }
  }

  
</style>
