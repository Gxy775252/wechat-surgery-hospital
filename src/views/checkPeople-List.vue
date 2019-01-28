<template>
	<div class="all">
		<div class="head" style="margin-bottom:10px;">
			<div class="headImg">
				<img :src="ImgNull" />
			</div>
			<p>测试帐医生</p>
		</div>
		<div class="navList" style="margin-top:10px;width: calc(47.6rem / 2);margin:auto;border-radius: 4px;">
			<div :class="navId == 0 ? 'col_00' : 'col_ff' " @click="selectNav(0)">
				<p>未完成</p>
				<p></p>
			</div>
			<div :class="navId == 1 ? 'col_00' : 'col_ff' " @click="selectNav(1)">
				<p>已完成</p>
				<p></p>
			</div>
		</div>
		<div class="conList">
			<div class="name">
				<div class="name-left">
					<p>用户<span></span></p>
					<p>用户</p>
				</div>
				<!-- <div class="name-right" v-if="item.status == 2">已完成</div> -->
			</div>
			<div class="top">
				<div>
					<p>预约时间</p>
					<p>预约时间</p>
				</div>
				<div>
					<p>预约门店</p>
					<p>预约门店</p>
				</div>
				<div>
					<p>预约项目</p>
					<p>预约项目</p>
				</div>
				<div>
					<p>预约医生</p>
					<p>预约医生</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Toast
	} from 'we-vue';
	import * as api from '@/assets/js/api';
	import * as session from '@/assets/js/session';
	export default {
		data() {
			return {
				ImgNull: this.$store.state.ImgNull,
				navId: 0,
			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
		},
		methods: {
			selectNav: function(res) {
				let that = this;
				that.navId = res;
				// 待修改  根据不同的参数请求不同的接口
			},
		}
	};
</script>
<style lang="scss" scoped>
	@import '@/assets/css/stationingDoctorOrder.scss';
	@import '@/assets/css/stationingDoctorPersonalCenter.scss';
</style>
