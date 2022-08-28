<script>
  
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
    globalData:{
      city_start: '武汉',
      city_end: '上海'
    }
	}
</script>

<style>
	/*每个页面公共css */
  @import '/wxcomponents/vant/dist/common/index.wxss';
  /*每个页面公共css */
  @import "static/css/main.css";
  @import "static/css/icon.css";
  @import "static/css/animation.css";
</style>
