<template>
	<view @click.stop="thTap">
		<slot></slot>
	</view>
</template>

<script>
	// 第二版
	function throttle(func, wait) {
		var timeout;
		var previous = 0;

		return function() {
			context = this;
			args = arguments;
			if (!timeout) {
				timeout = setTimeout(function() {
					timeout = null;
					func.apply(context, args)
				}, wait)
			}

		}
	}
	export default {
		methods: {
			thTap: throttle(function() {
				this.$emit('thTap')
			}, 500)
		}
	}
</script>

<style>
</style>
