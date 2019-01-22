<template>
	<div class="all">
		<div class="content">
			<img src="../assets/images/icon/zhifu.png" />
		</div>
	</div>
</template>

<script>
	import * as api from '@/assets/js/api';
	import wx from 'weixin-js-sdk'

	import {
		Toast
	} from 'we-vue';
	export default {
		data() {
			return {};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
		},
		mounted: function(){
			let _this = this
			// if (typeof WeixinJSBridge == "undefined") { // 判断是否在微信浏览器内
			//     if (document.addEventListener) {
			//         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			//     } else if (document.attachEvent) {
			//         document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
			//         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			//     }
			// } else {
				gotoPay()
			// }
			function gotoPay(){
				alert('4444')
				api.getWechatPay(_this.$store.state.uid || 'oYi8Av6WZm8rscL77fxDV8xWkBv0', _this.$route.query.payId, {data: {}}).then(res => {
					if(res.data.flag){
						let { appId, packageStr, paySign, signType, timestamp, nonceStr } = res.data.config
						WeixinJSBridge.invoke(
							'getBrandWCPayRequest', {
								appId: appId,
								timeStamp: String(timestamp), // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
								nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
								package: packageStr, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
								signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
								paySign: paySign, // 支付签名
							},
							function (res) {
								alert('支付成功')
								// console.log(res,'----------pay res')
								// _this.$router.push({name: 'taskList'})
								// 支付成功后的回调函数
							})
					}
				})
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/css/payment.scss';
</style>
