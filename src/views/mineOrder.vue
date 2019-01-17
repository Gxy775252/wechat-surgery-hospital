<!-- 商城订单列表 -->
<template>
	<div class="all">
		<div class="navList">
			<div>
				<p>全部</p>
				<p></p>
			</div>
		</div>
		<div class="conList">
			<div class="top">
				<p>订单编号：24783647878</p>
				<p>待支付</p>
			</div>
			<div class="center">
				<div class="center-left">
					<div class="leftImg">
						<img src="../assets/images/example/tuFour.png" />
					</div>
					<div class="leftText">
						<p>活力眼尖的</p>
						<p>规格：200ml</p>
					</div>
				</div>
				<div class="center-right">
					<p>￥ 299</p>
					<p>x1</p>
				</div>
			</div>
			<div class="bottom">
				<div class="bottom-left">
					<p>已付金额：</p>
					<p>￥299</p>
				</div>
				<div class="bottom-right">
					<button class="color2" @click="returnGoods(item.id)">退货/退款</button>
					<button class="color1" @click="cancel(item.id)">取消订单</button>
					<button class="color2">去支付</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import * as api from '@/assets/js/api';
import { Toast, Dialog } from 'we-vue';
import * as session from '@/assets/js/session';
export default {
	name: 'mineOrder',
	inject: ['reload'],
	data() {
		return {
			listOrderInfo: '',
			defaultProps1: {
				children: 'children',
				label: 'comName'
			}
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.getVipGoodsOrderList({
			data: {
				openid: this.$store.state.uid,
				status: 0
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('商城订单', res.data);
				this.listOrderInfo = res.data.listOrder;
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	methods: {
		cancel: function(res) {
			console.log('取消啊啊啊-----', res);
			Dialog.confirm({
				title: '提示',
				message: '是否取消',
				skin: 'ios',
				showCancelButton: true
			})
				.then(() => {
					api.cancelGoodsOrder({
						data: {
							openid: this.$store.state.uid,
							orderid: res
						}
					}).then(res => {
						console.log('是否取消了----', res);
						if (res.data.flag) {
							Toast.text({
								duration: 1000,
								message: '取消成功'
							});
							this.reload();
						} else {
							Toast.text({
								duration: 1000,
								message: res.data.msg
							});
						}
					});
				})
				.catch(() => {});
		},
		returnGoods:function(res){
			// 退货页面
			// 待修改  退货页面需要 商品图片名字 规格 数量 价钱
			session.Lstorage.setItem('returnId', res);
			this.$router.push({ name: 'returnGoodsChoice' });
		}
		
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineOrder.scss';
</style>
