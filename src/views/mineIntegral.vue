<template>
	<div class="all">
		<div class="top">
			<div class="top-con">
				<p>总金额（元）</p>
				<div class="guize">
					<p>积分规则</p>
					<div>
						<img src="../assets/images/icon/balance.png" />
					</div>
				</div>
			</div>
			<p>3000000.00</p>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>积分记录</p>
			</div>
		</div>
		<div class="box">
			<div class="diaryList">
				<p class="yearFont">2018年</p>
				<div class="monthBox">
					<div class="month">
						<div class="monthImg"><img src="@/assets/images/icon/level.jpg"></div>
						<p>10月10日</p>
					</div>
					<div class="con">
						<p>商城消费</p>
						<p>-1000</p>
					</div>
				</div>
			</div>
		</div>
		<div style="height: 2rem;"></div>
		<div class="buttonA">
			<button>送积分</button>
		</div>
		<!-- 积分规则 -->
		<!-- <div class="model">
			<div class="modelText">
				<p>- 积分规则 -</p>
				<div class="modelCon">

				</div>
				<div class="success">
					<button>确定</button>
				</div>
			</div>
		</div> -->
		<!-- 积分规则 END-->
		<!-- 送积分 -->
		<div class="model">
			<div class="jifen">
				<p>- 送积分 -</p>
				<p>请输入要送出的积分数值（输入整数）</p>
				<div class="inputA">
					<input placeholder="2000" />
				</div>
				<div class="success" style="margin-top:45px;">
					<button>确定</button>
				</div>
				<div class="close">
					<img src="../assets/images/icon/guanbi.png" />
				</div>
			</div>
		</div>
		<!-- 送积分 END-->
	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/css/mineIntegral.scss';
</style>
