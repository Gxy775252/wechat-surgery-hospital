<!-- 退货页面 -->
<template>
	<div class="all">
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
		<div class="list" @click="refundOrder(1)">
			<div class="list-text">
				<p>仅退款</p>
				<p>未收到货</p>
			</div>
			<div class="list-img">
				<img src="../assets/images/icon/mineHore.png" />
			</div>
		</div>
		<div class="list" @click="refundOrder(2)">
			<div class="list-text">
				<p>退货/退款</p>
				<p>已收到货，需要退回已收到的货物</p>
			</div>
			<div class="list-img">
				<img src="../assets/images/icon/mineHore.png" />
			</div>
		</div>
	</div>
</template>

<script>
import * as api from '@/assets/js/api';
import { Toast, Dialog } from 'we-vue';
import * as session from '@/assets/js/session';
export default {
	name: 'returnGoodsChoice',
	data() {
		return {};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		// 待修改  缺少上一个页面的数据
	},
	methods: {
		refundOrder: function(res) {
			// session.Lstorage.setItem('refunID', res);商品id
			session.Lstorage.setItem('refundOrderID', res);
			this.$router.push({ name: 'returnGoodsApply' });
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/returnGoodsChoice.scss';
</style>
