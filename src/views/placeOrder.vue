<!-- 确认订单 -->
<template>
	<div class="background">
		<div class="addbox" @click="goSelectAddress()">
			<div class="bigBox">
				<div class="addFont">
					<div>
						<p class="nameFont">收件人：{{addressInfo != null?addressInfo.postName:''}}</p>
						<p class="nameFont">电话：{{addressInfo != null?addressInfo.postPhone:''}}</p>
					</div>
					<p class="add">收件地址：{{ addressInfo != null ?  addressInfo.postArea : ''}}{{addressInfo != null ? addressInfo.postAddress : ''}}</p>
				</div>
			</div>
			<div class="buttonImg"><img src="../assets/images/icon/rightGray.png"></div>
		</div>
		<div class="comBox" v-for="(item,key,index) in listDetailInfo" :key='key'>
			<img :src="item.coverResource.cover || ImgNull" class="comImg">
			<div class="specName">
				<p class="comName">{{item.goodsName}}</p>
				<p class="spec">规格：{{item.sizeName}}</p>
				<div>
					<p class="money">￥{{item.price}}</p>
					<div class="number">x{{item.number || 1}}</div>
				</div>
			</div>
		</div>
		<div class="payBox">
			<div class="payFont">支付方式</div>
		</div>
		<div class="payName">
			<div class="payWeChat" v-for="item in dataPay" :key="item.id" @click="selectPay(item.id)">
				<div class="imgWeChat">
					<img :src="item.img" />
					<p>{{item.payFont}}</p>
				</div>
				<div class="selectImg">
					<img v-if="!item.isshow" src="../assets/images/icon/sele.png" />
					<img v-if="item.isshow" src="../assets/images/icon/select.png" />
				</div>
			</div>
		</div>
		<div class="integralBox">
			<div class="integralFont">
				<p class="uses">使用积分</p>
				<p class="numberInt">（{{scoreBalInfo}}积分共抵扣{{maxScoreInfo}}元）</p>
			</div>
			<img :src="shutOpent" @click="shutClick" />
		</div>
		<div class="bottomBox">
			<div class="bottomMoney">￥{{orderInfo.money}}</div>
			<div class="bottomPay" @click="submitMoney">去支付</div>
		</div>
	</div>
</template>

<script>
	import {
		Toast,
		Dialog
	} from 'we-vue';
	import * as api from '@/assets/js/api';
	import * as session from '@/assets/js/session';
	import wx from 'weixin-js-sdk'

	export default {
		name: 'placeOrder',
		data() {
			return {
				cashBalInfo: '', //现金金额
				scoreBalInfo: '', //积分余额
				maxScoreInfo: '', //最大抵扣积分
				orderInfo: '', //订单信息
				addressInfo: '', //默认地址信息
				listDetailInfo: '', //商品列表
				shutOpent: require('../assets/images/icon/shut.png'),
				shutOpentId: 1, //1=不使用积分2=使用积分
				dataPayId: 1, //1=微信支付2=余额支付
				dataPay: [{
						id: 1,
						img: require('../assets/images/icon/wechat.png'),
						payFont: '微信支付',
						isshow: true
					},
					{
						id: 2,
						img: require('../assets/images/icon/wallet.png'),
						payFont: '余额支付',
						isshow: false
					}
				],
				ImgNull: this.$store.state.ImgNull
			};
		},
		created: function() {
			let _this = this
			this.$store.commit('showBottomNav', {
				isShow: false
			});
			this.orderId = session.Lstorage.getItem('orderId');

			// 订单确认页面
			function initData() {
				api.getConfirmOrder({
					data: {
						openid: _this.$store.state.uid,
						orderid: _this.orderId
					}
				}).then(res => {
					if (res.data.flag) {
						console.log('订单确认', res.data)
						_this.cashBalInfo = res.data.cashBal //现金金额
						_this.scoreBalInfo = res.data.scoreBal //积分余额
						_this.maxScoreInfo = res.data.maxScore //最大抵扣积分
						_this.orderInfo = res.data.order //订单信息
						_this.addressInfo = res.data.address //默认地址信息
						_this.listDetailInfo = res.data.listDetail //商品列表
					} else {
						Toast.text({
							duration: 1000,
							message: res.data.msg
						});
					}
				});
			}
			initData()
		},
		beforeMount: function() {
			let that = this;
			console.log('支付有没有走呢》？？？', this.$store.state.prepay_id);
			if (this.$store.state.prepay_id != null) {
				api.submitConfirmOrder({
					data: {
						prepay_id: this.$store.state.prepay_id
					}
				}).then(res => {
					if (res.data.flag) {
						// 已支付
						Toast.text({
							duration: 1000,
							message: '支付成功'
						})
						setTimeout(function() {
							this.$router.push({
								name: 'successfulPayment'
							});
						}, 1500)
					} else {
						// 未支付
						Toast.text({
							duration: 1000,
							message: '未支付,'
						})
						Dialog.confirm({
							title: '提示',
							message: '您有一笔订单未支付，是否继续支付',
							skin: 'ios',
							showCancelButton: false
						}).then(() => {
							that.$router.push({
								name: 'mineOrder'
							});
						})
					}
				})
			}
		},
		methods: {
			submitMoney: function() {
				let newMoney = 0
				if (this.addressInfo == null) {
					Toast.fail({
						duration: 1000,
						message: '请选择地址'
					})
					return;
				}
				if (this.dataPayId == 1) {
					if (this.shutOpentId != 1) {
						newMoney = this.orderInfo.money - this.maxScoreInfo != 0 ? this.orderInfo.money - this.maxScoreInfo : 0
					} else {
						newMoney = this.orderInfo.money
					}
				} else {
					if (this.shutOpentId != 1) {
						newMoney = this.cashBalInfo - this.maxScoreInfo != 0 ? this.cashBalInfo - this.maxScoreInfo : 0
					} else {
						newMoney = this.cashBalInfo
					}
				}
				let parmas = Object.assign({}, {
					openid: this.$store.state.uid || 'oYi8Av6WZm8rscL77fxDV8xWkBv0'
				}, {
					orderid: this.orderId
				}, {
					wxcash: this.dataPayId == 1 ? newMoney : ''
				}, {
					score: this.shutOpentId != 1 ? this.maxScoreInfo : ''
				}, {
					vipcash: this.dataPayId == 2 ? newMoney : ''
				}, {
					postName: this.addressInfo.postName
				}, {
					postPhone: this.addressInfo.postPhone
				}, {
					postAddress: this.addressInfo.postArea + ',' + this.addressInfo.postAddress
				})
				this.submitPay(parmas)
			},
			submitPay: function(parmas) {
				api.submitConfirmOrder({
					data: parmas
				}).then(res => {
					console.log('怎么肥四小老弟', res.data);
					if (res.data.flag) {
						this.$store.state.prepay_id = res.data.prepay_id;
						if (res.data.finished == 1) {
							// vip 支付
							this.$router.push({
								name: 'successfulPayment',
							});
						} else {
							// 跳转页面
							this.$router.push({
								name: 'payment',
								query: {
									payId: res.data.prepay_id
								}
							});
						}
					} else {
						Toast.fail({
							duration: 1000,
							message: res.data.msg
						})
					}
				})
			},


			shutClick: function() {
				if (this.shutOpent == require('../assets/images/icon/shut.png')) {
					this.shutOpent = require('../assets/images/icon/open.png');
					this.shutOpentId = 2;
				} else {
					this.shutOpent = require('../assets/images/icon/shut.png');
					this.shutOpentId = 1;
				}
			},
			selectPay: function(id) {
				this.dataPayId = id;
				for (var i = 0; i < this.dataPay.length; i++) {
					if (id == this.dataPay[i].id) {
						this.dataPay[i].isshow = true;
					} else {
						this.dataPay[i].isshow = false;
					}
				}
			},
			goSelectAddress: function() {
				// 选择地址
				this.$router.push({
					name: 'selectAddress'
				});
			}
		}
	};
</script>

<style scoped="scoped" lang="scss">
	@import '@/assets/css/placeOrder.scss';
</style>
