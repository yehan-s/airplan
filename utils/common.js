// 通用工具类
import * as db from './db.js';
import * as common from './common.js' //引入common
//操作失败的提示信息
function errorToShow(msg = '操作失败', callback = function() {}) {
	uni.showToast({
		title: msg,
		icon: 'none',
		duration: 1500
	})
	setTimeout(function() {
		callback()
	}, 1500)
}

//操作成功后，的提示信息
function successToShow(msg = '保存成功', callback = function() {}) {
	uni.showToast({
		title: msg,
		icon: 'success',
		duration: 1000
	})
	setTimeout(function() {
		callback()
	}, 500)
}
//跳转到登陆页面
function jumpToLogin() {
	var now_time = Date.parse(new Date())
	var value = db.get('jump_to_login')
	if (!value) {
		value = 0
	}
	if (now_time - value > 3000) {
		db.set('jump_to_login', now_time); //暂时屏蔽登录时间查询
		uni.showToast({
			title: '请先登录!',
			icon: 'none',
			duration: 1000,
			success: function(res) {
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/user/user',
						animationType: 'pop-in',
						animationDuration: 200
					})
				}, 500)
			}
		})
	}
}
//判断是否登录 跳转到登录页面
function IsjumpToLogin() {
	let token = db.get("token");
	if (!token) {
		common.jumpToLogin();
		return true;
	}
}

function throttle(fn, gapTime) {
	if (gapTime == null || gapTime == undefined) {
		gapTime = 1500
	}

	let _lastTime = null

	// 返回新的函数
	return function() {
		let _nowTime = +new Date()
		if (_nowTime - _lastTime > gapTime || !_lastTime) {
			fn.apply(this, arguments) //将this和参数传给原函数
			_lastTime = _nowTime
		}
	}
}

function timestampToTime(timestamp) {
	var date = new Date(timestamp * 1000);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = date.getDate() + ' ';
	var h = date.getHours() + ':';
	var m = date.getMinutes() + ':';
	var s = date.getSeconds();
	return Y + M + D + h + m + s;
}
/**
 * 统一跳转
 */
function navigateTo(url, callback) {
	uni.navigateTo({
		url: url,
		animationType: 'pop-in',
		animationDuration: 300,
		success: callback
	})
}
/**
 * 关闭当前页面统一跳转
 */
function redirectTo(url, callback) {
	console.log(1111)
	uni.redirectTo({
		url: url,
		animationType: 'pop-in',
		animationDuration: 300,
		success: callback
	})
}
/**
 * tabber跳转
 */
function switchTabTo(url, callback) {
	uni.switchTab({
		url: url,
		animationType: 'pop-in',
		animationDuration: 200,
		success: callback
	})
}
/**
 * 跳转的上一级页面
 */
function navigateBack(delta = 1, callback) {
	uni.navigateBack({
		delta,
		animationType: 'pop-in',
		animationDuration: 200,
		success: callback
	})
}
/**
 * 关闭所有的页面打开一个页面
 */
function reLaunch(url, callback) {
	uni.reLaunch({
		url: url,
		animationType: 'pop-in',
		animationDuration: 300,
		success: callback
	})
}
/**
 * 计算百分比
 */
function GetPercent(num, total) {
	num = parseFloat(num);
	total = parseFloat(total);
	if (isNaN(num) || isNaN(total)) {
		return "-";
	}
	return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00) + "%";
}
/**
 *  过滤非法字符
 */
function filterNum(i) {
	let num = i.charAt(i.length - 1)
	var reg = new RegExp("^[0-9]*$")
	if (!reg.test(num)) {
		return i.slice(0, -1)
	} else {
		return i
	}
}


function getNextDate(day = 1, date = new Date()) {
	var dd = new Date(date);
	dd.setDate(dd.getDate() + day);
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1;
	var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
	return y + '-' + m + '-' + d;
}

/**
 * 格式化时间
 */
function formatDate(timeStamp) {
	var date = new Date();
	date.setTime(timeStamp);
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	return y + '-' + m + '-' + d;
};

/**
 * 根据日期字符串获取星期几
 * @param dateString 日期字符串（如：2020-05-02）
 * @returns {String}
 */
function getWeek(dateString) {
	var dateArray = dateString.split("-");
	date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
	return "周" + "日一二三四五六".charAt(date.getDay());
};

/*
根据出生日期算出年龄
*/
function getAge(strAge) {
	var birArr = strAge.split("-");
	var birYear = birArr[0];
	var birMonth = birArr[1];
	var birDay = birArr[2];

	d = new Date();
	var nowYear = d.getFullYear();
	var nowMonth = d.getMonth() + 1; //记得加1
	var nowDay = d.getDate();
	var returnAge;

	if (birArr == null) {
		return false
	};
	var d = new Date(birYear, birMonth - 1, birDay);
	if (d.getFullYear() == birYear && (d.getMonth() + 1) == birMonth && d.getDate() == birDay) {
		if (nowYear == birYear) {
			returnAge = 0; // 
		} else {
			var ageDiff = nowYear - birYear; // 
			if (ageDiff > 0) {
				if (nowMonth == birMonth) {
					var dayDiff = nowDay - birDay; // 
					if (dayDiff < 0) {
						returnAge = ageDiff - 1;
					} else {
						returnAge = ageDiff;
					}
				} else {
					var monthDiff = nowMonth - birMonth; // 
					if (monthDiff < 0) {
						returnAge = ageDiff - 1;
					} else {
						returnAge = ageDiff;
					}
				}
			} else {
				return "出生日期晚于今天，数据有误"; //返回-1 表示出生日期输入错误 晚于今天
			}
		}
		return returnAge;
	} else {
		return ("输入的日期格式错误！");
	}
}


/**
 * 判断男女
 */
function isgender(val) {
	if (val == 0) {
		return '男'
	} else if (val == 1) {
		return '女'
	} else {
		return '未知'
	}
}
export {
	errorToShow,
	successToShow,
	jumpToLogin,
	IsjumpToLogin,
	throttle,
	timestampToTime,
	navigateTo,
	redirectTo,
	reLaunch,
	GetPercent,
	filterNum,
	switchTabTo,
	getNextDate,
	getAge,
	isgender,
	navigateBack,
	formatDate,
	getWeek
}
