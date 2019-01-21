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
					<img :src="item.img || ImgNull" />
					<div class="nameStandard">
						<p class="nameFont">{{item.goodsName}}</p>
						<p class="standard">规格：{{item.sizeName}}</p>
					</div>
				</div>
				<div class="buttonMoney">
					<p>¥{{item.price}}</p>
					<div>
						<button @click="reduce(key)">-</button>
						<p>{{item.number}}</p>
						<button @click="plus(key)">+</button>
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
import { Toast, Dialog } from 'we-vue';
import wx from 'weixin-js-sdk';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
export default {
	name: 'shoppingCart',
	data() {
		return {
			dataList: [
				{
					id: 1,
					goodsName: '活力眼凝胶',
					price: 100,
					number: 1,
					sizeName: '200ml',
					img: require('../assets/images/example/listImgOne.png'),
					check: false
				},
				{
					id: 2,
					goodsName: '活力眼凝胶',
					price: 100,
					number: 1,
					sizeName: '200ml',
					img: require('../assets/images/example/listImgOne.png'),
					check: false
				},
				{
					id: 3,
					goodsName: '活力眼凝胶',
					price: 100,
					number: 1,
					sizeName: '200ml',
					img: require('../assets/images/example/listImgOne.png'),
					check: false
				}
			],
			num: 0,
			allSelect: false,
			editName: '编辑',
			ifDel: false, //是否删除
			ImgNull: this.$store.state.ImgNull
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
					this.num = money;
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
				// this.dataList = res.data.listCart;
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
			// 待修改 立即修改
			// 				api.submitGoodsOrder({
			// 					data: {
			// 						openid: this.$store.state.uid,
			// 						fromCart: 1,
			// 						goodsid: '',
			// 						sizeid: '',
			// 						number: '',
			// 						cartidList: '',
			// 					}
			// 				}).then(res => {
			// 					if (res.data.flag) {
			//
			// 					} else {
			// 						Toast.text({
			// 							duration: 1000,
			// 							message: res.data.msg
			// 						});
			// 					}
			// 				});
			// submitConfirmOrder  提交订单  （商品详情应该也要记得加上）
			// 				api.submitGoodsOrder({
			// 					data: {
			// 						openid: this.$store.state.uid,
			// 						fromCart: 1,
			// 						goodsid: '',
			// 						sizeid: '',
			// 						number: '',
			// 						cartidList: '',
			// 					}
			// 				}).then(res => {
			// 					if (res.data.flag) {
			//
			// 					} else {
			// 						Toast.text({
			// 							duration: 1000,
			// 							message: res.data.msg
			// 						});
			// 					}
			// 				});
		},
		// 删除
		delet: function() {
			Dialog.confirm({
				title: '确认删除吗？',
				skin: 'ios',
				showCancelButton: true
			})
				.then(() => {
					// 待修改 删除内容
					// 						api.deleteFromCart({
					// 							data: {
					// 								openid: this.$store.state.uid,
					// 								goodsid: '',
					// 								sizeid: '',
					// 							}
					// 						}).then(res => {
					// 							if (res.data.flag) {
					//
					// 							} else {
					// 								Toast.text({
					// 									duration: 1000,
					// 									message: res.data.msg
					// 								});
					// 							}
					// 						});
				})
				.catch(() => {});
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
		reduce: function(e) {
			if (this.dataList[e].number == 1) {
				this.dataList.splice(e, 1);
				Dialog.confirm({
					title: '确认删除吗？',
					skin: 'ios',
					showCancelButton: true
				})
					.then(() => {
						api.deleteFromCart({
							data: {
								openid: this.$store.state.uid,
								goodsid: '',
								sizeid: ''
							}
						}).then(res => {
							if (res.data.flag) {
							} else {
								Toast.text({
									duration: 1000,
									message: res.data.msg
								});
							}
						});
					})
					.catch(() => {});
				// 待修改  删除sku
			} else {
				this.dataList[e].number--;
			}
			// 待修改  修改sku数量不知道怎么弄
			// api.changeCartCount({
			// 					data: {
			// 						openid: this.$store.state.uid,
			// 						goodsid: '',
			// 						sizeid: '',
			// 						count:'',
			// 					}
			// 				}).then(res => {
			// 					if (res.data.flag) {
			//
			// 					} else {
			// 						Toast.text({
			// 							duration: 1000,
			// 							message: res.data.msg
			// 						});
			// 					}
			// 				});
		},
		// 加号
		plus: function(e) {
			this.dataList[e].number++;
			// 待修改  修改sku数量不知道怎么弄
			// 				api.changeCartCount({
			// 					data: {
			// 						openid: this.$store.state.uid,
			// 						goodsid: '',
			// 						sizeid: '',
			// 						count:'',
			// 					}
			// 				}).then(res => {
			// 					if (res.data.flag) {
			//
			// 					} else {
			// 						Toast.text({
			// 							duration: 1000,
			// 							message: res.data.msg
			// 						});
			// 					}
			// 				});
		}
	}
};
</script>

<style scoped="scoped" lang="scss">
@import '@/assets/css/shoppingCart.scss';
</style>
