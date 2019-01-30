<!-- 购物车 -->
<template>
	<div class="background">
		<div v-if="dataList.length==0" class="cartNull">
			<img src="../assets/images/icon/cartNull.png" />
			<p>购物车为空</p>
		</div>
		<div class="box" v-if="dataList.length!=0">
			<p class="edit" @click="edit">{{editName}}</p>
			<div class="contentBox" v-for="(item,key,index) in dataList" :key="key">
				<div class="fontImg">
					<div class="check" @click="check(key)">
						<img v-if="!item.check" src="../assets/images/icon/sele.png" />
						<img v-if="item.check" src="../assets/images/icon/select.png" />
					</div>
					<img :src="item.coverResource!=null? item.coverResource.cover: ImgNull" />
					<div class="nameStandard">
						<p class="nameFont">{{item.goodsName}}</p>
						<p class="standard">规格：{{item.sizeName}}</p>
					</div>
				</div>
				<div class="buttonMoney">
					<p>¥{{item.price}}</p>
					<div>
						<button @click="reduce(item,key)">-</button>
						<p>{{item.number}}</p>
						<button @click="plus(item,key)">+</button>
					</div>
				</div>
			</div>
			<div class="bottomBox">
				<div class="moneyBox">
					<div class="allcheck" @click="allcheck">
						<img v-if="!allSelect" src="../assets/images/icon/sele.png" />
						<img v-if="allSelect" src="../assets/images/icon/select.png" />
					</div>
					<p class="checkAll">全选</p>
					<p class="numFont">合计：</p>
					<p class="allMoney">￥{{num}}</p>
				</div>
				<div class="payGo" v-if="!ifDel" @click="settlement">去结算</div>
				<div class="payGo" v-if="ifDel" @click="delet">删除</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		Toast,
		Dialog
	} from 'we-vue';
	import wx from 'weixin-js-sdk';
	import * as api from '@/assets/js/api';
	import * as session from '@/assets/js/session';
	export default {
		name: 'shoppingCart',
		inject: ['reload'],
		data() {
			return {
				dataList: [],
				num: 0,
				allSelect: false,
				editName: '编辑',
				ifDel: false, //是否删除
				ImgNull: this.$store.state.ImgNull,
				defaultProps1: {
					children: 'children',
					label: 'comName'
				}
			};
		},
		watch: {
			// 监听数据是否变化，
			dataList: {
				//深度监听，可监听到对象、数组的变化
				handler(val, oldVal) {
					var money = 0;
					var iArray = [];
					for (var i = 0; i < this.dataList.length; i++) {
						if (this.dataList[i].check == true) {
							iArray.push(i);
							money += this.dataList[i].price * this.dataList[i].number;
						}
					}
					if (this.dataList.length != 0) {
						if (iArray.length == this.dataList.length) {
							this.allSelect = true;
						} else {
							this.allSelect = false;
						}
						this.num = money.toFixed(2);
					}
				},
				deep: true
			}
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
			api.getMyCart({
				data: {
					openid: this.$store.state.uid
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('购物车数据', res.data);
					for (let i = 0; i < res.data.listCart.length; i++) {
						res.data.listCart[i].check = false;
						res.data.listCart[i].img = require('@/assets/images/example/listImgOne.png');
					}
					this.dataList = res.data.listCart;
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		methods: {
			// 编辑内容
			edit: function() {
				if (this.editName == '编辑') {
					this.editName = '完成';
					this.ifDel = true;
				} else {
					this.editName = '编辑';
					this.ifDel = false;
				}
				for (var i = 0; i < this.dataList.length; i++) {
					this.dataList[i].check = false;
					this.allSelect = false;
				}
			},
			// 去结算
			settlement: function() {
				let that = this;
				let cartidList = [];
				for (let i in that.dataList) {
					if (that.dataList[i].check == true) {
						cartidList.push(that.dataList[i].id);
					}
				};
				cartidList = cartidList.join(',');
				api.submitGoodsOrder({
					data: {
						openid: this.$store.state.uid,
						fromCart: 1,
						cartidList: cartidList,
					}
				}).then(res => {
					if (res.data.flag) {
						console.log('购物车购买', res.data);
						this.$store.state.perpay_id = null;
						session.Lstorage.setItem('orderId', res.data.orderid);
						this.$router.push({
							name: 'placeOrder'
						});
					} else {
						Toast.text({
							duration: 1000,
							message: res.data.msg
						});
					}
				});
			},
			// 删除
			delet: function() {
				let that = this;
				let cartidList = [];
				for (let i in that.dataList) {
					if (that.dataList[i].check == true) {
						cartidList.push(that.dataList[i].id);
					}
				};
				cartidList = cartidList.join(',');
				Dialog.confirm({
						title: '确认删除吗？',
						skin: 'ios',
						showCancelButton: true
					})
					.then(() => {
						api.deleteFromCart({
							data: {
								openid: this.$store.state.uid,
								cartidList: cartidList,
							}
						}).then(res => {
							if (res.data.flag) {
								this.reload();
							} else {
								Toast.text({
									duration: 1000,
									message: res.data.msg
								});
							}
						});
					})
			},
			// 复选框
			check: function(e) {
				if (this.dataList[e].check == false) {
					this.dataList[e].check = true;
				} else {
					this.dataList[e].check = false;
				}
			},
			// 全选
			allcheck: function() {
				if (this.allSelect == false) {
					for (var i = 0; i < this.dataList.length; i++) {
						this.dataList[i].check = true;
						this.allSelect = true;
					}
				} else {
					for (var i = 0; i < this.dataList.length; i++) {
						this.dataList[i].check = false;
						this.allSelect = false;
					}
				}
			},
			// 减号
			reduce: function(res, e) {
				if (this.dataList[e].number == 1) {
					Dialog.confirm({
							title: '确认删除吗？',
							skin: 'ios',
							showCancelButton: true
						})
						.then(() => {
							// 待修改删除接口
							api.deleteFromCart({
								data: {
									openid: this.$store.state.uid,
									cartidList: res.id
								}
							}).then(res => {
								if (res.data.flag) {
									this.reload();
								} else {
									Toast.text({
										duration: 1000,
										message: res.data.msg
									});
								}
							});
						})
				} else {
					this.dataList[e].number--;
					api.changeCartCount({
						data: {
							openid: this.$store.state.uid,
							goodsid: res.goodsid,
							sizeid: res.sizeid,
							count: res.number,
						}
					}).then(res => {
						if (!res.data.flag) {
							Toast.text({
								duration: 1000,
								message: res.data.msg
							});
						}
					});
				}
			},
			// 加号
			plus: function(res, e) {
				this.dataList[e].number++;
				api.changeCartCount({
					data: {
						openid: this.$store.state.uid,
						goodsid: res.goodsid,
						sizeid: res.sizeid,
						count: res.number,
					}
				}).then(res => {
					if (!res.data.flag) {
						Toast.text({
							duration: 1000,
							message: res.data.msg
						});
					}
				});
			}
		}
	};
</script>

<style scoped="scoped" lang="scss">
	@import '@/assets/css/shoppingCart.scss';
</style>
