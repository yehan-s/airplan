<template>
  
	<view class="yellow-white">
    <!-- 自定义导航 -->
    <van-nav-bar :title="city_start + '-' + city_end" left-arrow safe-area-inset-top="true" :placeholder="true"
      @click-left="onClickLeft" :border="false">
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <!-- 半圆包裹 -->
    <view class="cart-bar">
      <view class="main-contents">
        <!-- 通知栏 -->
<!--        <van-notice-bar left-icon="volume-o" text="温馨提示 : 注意当地疫情防范" background="rgba(47, 172, 239, 0.3)" color="#eee"/> -->
        <!-- 购物车列表 -->
        <ticket :tickets="solo"></ticket>
      </view>
    </view>
    
		<!--详情-->
		<view class="bg-white margin-xs circle-corner">
			<view class="cu-bar">
				<view class="padding-lr">
          <!-- 发车第一排黑字 -->
					<view>{{orderInfo.speedDate}} {{orderInfo.speedTime}}发车</view>
          <!-- 发车第二排灰字 -->
					<view class="text-sm text-gray">{{orderInfo.startRegion}} - {{orderInfo.endRegion}}</view>
				</view>
			</view>
			<view class="cu-bar top-line min-height35">
				<view class="padding-lr">
					<text class="cuIcon-edit"></text>
					<text class="padding-lr-xs text-sm">
						发车前30分钟<text class="text-green">可在线退票</text>
					</text>
				</view>
			</view>
		</view>

		<!--乘车人-->
		<view class="bg-white margin-xs circle-corner">
			<view class="cu-bar min-height35">
				<view class="padding-lr">
					<text>乘车人</text><text class="text-xs padding-lr-sm">最多{{orderInfo.pollNum}}人</text>
				</view>
				<view class="padding-lr">
					<button class="cu-btn bg-gradual-orange sm" @click="showAddPassenger()">添加乘车人</button>
				</view>
			</view>
			<view class="cu-bar top-line" v-for="(pa, index) in passenger" :key="index">
				<view class="padding-lr flex justify-center align-center">
					<text class="cuIcon-roundclosefill text-orange" @click="delPassenger(pa, index)"></text>
					<view class="padding-lr text-sm">
						<view>姓名：{{pa.name}}</view>
						<view>身份证号：{{pa.idNumber}}</view>
					</view>
				</view>
				<view class="padding-lr">
					<button @click="setHolder(pa)" class="cu-btn line-orange sm" :class="pa.isHolder ? '' : 'line-gray'">{{pa.isHolder ? '取票人' : '设为取票人'}}</button>
				</view>
			</view>
		</view>

		<!--添加乘客模态框-->
		<view class="cu-modal bottom-modal" :class="modalName=='addPassengerModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white">
					<view class="action" @tap="hideModal">确定</view>
					<view class="action" @tap="hideModal">取消</view>
				</view>
				<view class="padding-sm" style="height: 400px">
					<view class="cu-bar bg-white circle-corner justify-center text-orange min-height40" @click="goAddPassenger()">
						<text class="cuIcon-roundadd padding-lr-xs"></text>新增乘车人
					</view>
					<view class="bg-white circle-corner margin-top-xs">
						<view class="cu-bar top-line" v-for="(pa, index) in passenger" :key="index">
							<view class="padding-lr flex justify-center align-center">
								<text class="cuIcon-write text-gray"></text>
								<view class="padding-lr text-sm text-left">
									<view>姓名：{{pa.name}}</view>
									<view>身份证号：{{pa.idNumber}}</view>
								</view>
							</view>
							<view class="padding-lr">
								<text class="cuIcon-roundcheckfill text-lg " :class="pa.isHolder ? 'text-orange': ''" style="font-size: 20px"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!--联系电话-->
		<view class="bg-white margin-xs circle-corner">
			<view class="cu-bar min-height35">
				<view class="padding-lr flex">
					<text class="text-gray padding-right-sm">联系电话</text> <input type="text" v-model="phone" />
				</view>
			</view>
		</view>
		<!--提示-->
		<view class="padding-lr">
			<view class="flex">
				<text class="cuIcon-info text-orange self-start" style="margin: 2px"></text>
				<view class="padding-lr-xs text-sm">
					汽车票无法保证100%出票，如出票失败将短信通知，票款将原路退回到您的付款账户，请您谅解
				</view>
			</view>
		</view>
		<!--费用明细模态框-->
		<view class="cu-modal bottom-modal z-index1100" :class="[modalName=='detailModal'?'show':'']" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="bg-white">
					<view class="padding">费用明细</view>
					<view class="cu-bar padding-lr-sm top-line">
						<view>最高票面价</view>
						<view class="text-orange2">¥{{orderInfo.speedMon}} x {{orderInfo.pollNum}}人</view>
					</view>
				</view>
				<view class="cu-bar"></view>
			</view>
		</view>
		<!--最底下按钮-->
		<view class="flex bottom-fix z-index1101">
			<view class="cu-bar bg-white half-width" @click="detail()">
				<view class="padding-lr-sm">
					<view>
						<text class="text-sm text-orange2">¥</text>
						<text class="text-lg text-orange2">{{orderInfo.allPrice}}</text>
						<text class="text-sm text-gray padding-lr-xs">共{{orderInfo.pollNum}}人</text>
					</view>
					<view class="text-sm text-gray">订单总价</view>
				</view>
				<view class="padding-lr-sm flex justify-center align-center">
					<text class="text-sm text-gray">明细</text>
					<view class="padding-lr-xs cuIcon-fold rotate" :class="detailAnimation? 'rotate2': ''"></view>
				</view>
			</view>
			<view class="cu-bar bg-gradual-orange half-width justify-center" @click="goPay()">去付款</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
        city_start: '',
        city_end: '',
        tickets: [], //车票详情
        
				orderInfo: null,
				passenger: [],
				detailAnimation: false,
				modalName: '',
				phone: ''
			}
		},
		onLoad() {
			this.orderInfo = this.$store.state.getOrderInfo
		},
    onShow() {
      // 获取导航城市
      this.city_start = getApp().globalData.city_start
      this.city_end = getApp().globalData.city_end
    },
		methods: {
			// 明细
			detail() {
				this.detailAnimation = !this.detailAnimation
				if (this.detailAnimation) {
					this.modalName = 'detailModal'
				} else {
					this.modalName = null
				}
			},
			// 设置取票人
			setHolder(pa) {
				if (pa.isHolder) {
					return
				}
				this.passenger.forEach(p => {
					p.isHolder = false;
				})
				pa.isHolder = true;
			},
			// 隐藏modal
			hideModal(e) {
				this.modalName = null
			},
			//显示添加乘客模态框
			showAddPassenger() {
				this.modalName = 'addPassengerModal'
			},
			delPassenger(pa, index) {
				this.passenger.splice(index, 1)
			},
			goProtocol() {
				uni.navigateTo({
					url: '/pages/richText/RichText'
				})
			},
			goPay() {
				if (this.$day(this.orderInfo.speedDate).isSame(this.$day(), 'day')) {
					if (this.$day().isSameOrBefore(this.$day(this.orderInfo.speedTime, 'HH:mm'))) {
						if (!this.$validate.isEmpty(this.phone)) {
							this.$comm.errorToShow('电话不能为空')
							return;
						}
						if (!(this.passenger.some(i => i.isHolder))) {
							this.$comm.errorToShow('请选择取票人')
							return;
						}
						this.orderInfo.phone = this.phone
						this.orderInfo.passenger = this.passenger
						this.$api.addOrder({
							...this.orderInfo
						}).then(res => {
							if (res.code) {
								this.$comm.reLaunch("/pages/index/index", () => {
									setTimeout(() => {
										this.$comm.successToShow("添加成功")
										this.$store.dispatch('saveOrderInfoAction', {})
									}, 500)
								})
							} else {
								this.$comm.errorToShow(res.data)
							}
						})
					}else{
						this.$comm.errorToShow('已结束订票')
					}
				}
			},
			goAddPassenger() {
        // 检查票数是否够
				// if (this.passenger.length >= this.orderInfo.pollNum) {
				// 	return this.$comm.errorToShow("座位不足")
				// }
				this.$comm.navigateTo("/subpkg/addPassenger/addPassenger")
				uni.$once('addPassenger', (res) => {
					this.passenger.push({
						...res,
						isHolder: false
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
  
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
  
  // 包裹层
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
  
  
  
	.yellow-white {
		background: linear-gradient(#ffdf40, #f4f4f4);
		/* 标准的语法（必须放在最后） */
	}

	.yellow-white2 {
		/*color: linear-gradient(#ffdf40, orange); !* 标准的语法（必须放在最后） *!*/
	}

	.half-width {
		width: 50%;
	}

	.rotate2 {
		transform: rotate(180deg);
		-moz-transform: rotate(180deg);
		/* Firefox 4 */
		-webkit-transform: rotate(180deg);
		/* Safari and Chrome */
		-o-transform: rotate(180deg);
		/* Opera */
	}

	.rotate {
		transition: width 0.2s, height 0.2s;
		-moz-transition: width 0.2s, height 0.2s, -moz-transform 0.2s;
		/* Firefox 4 */
		-webkit-transition: width 0.2s, height 0.2s, -webkit-transform 0.2s;
		/* Safari and Chrome */
		-o-transition: width 0.2s, height 0.2s, -o-transform 0.2s;
		/* Opera */
	}

	.z-index1100 {
		z-index: 1100;
	}

	.z-index1101 {
		z-index: 1101;
	}
</style>
