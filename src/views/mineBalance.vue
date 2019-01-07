<template>
	<div class="all">
		<div class="topText">
			<div>
				<img src="../assets/images/icon/tishi.png" />
			</div>
			<p>12月24日-1月1日式活动期间，充值100000年利率为6%，</p>
		</div>
		<div class="top">
			<div class="top-con">
				<p>总金额（元）</p>
				<div class="guize">
					<p>收益规则</p>
					<div>
						<img src="../assets/images/icon/balance.png" />
					</div>
				</div>
			</div>
			<p>3000000.00</p>
		</div>
		<div class="NavList">
			<div>
				<p>充值收益记录</p>
				<p></p>
			</div>
			<div>
				<p>余额消费记录</p>
				<p></p>
			</div>
		</div>
		<!-- <div class="box">
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
		</div> -->
		<div class="boxList">
			<div class="boxList-list">
				<div>
					<p class="price">充值100000</p>
					<p class="time">2018/12/12</p>
				</div>
				<div class="balance">
					<div>
						<p>年花利率8.00%</p>
						<p>截至日期2018/12/12-2019/12/12</p>
					</div>
					<div class="balance-con">
						<p>全部收益</p>
						<div>
							<img src="../assets/images/icon/rightColor.png" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="height: 6rem;"></div>
		<div class="buttonA">
			<button>充值</button>
		</div>
		<!-- 收益规则 -->
<!-- 		<div class="model">
			<div class="modelText">
				<p>- 收益规则 -</p>
				<div class="modelCon">
					
				</div>
				<div class="success">
					<button>确定</button>
				</div>
			</div>
		</div> -->
		<!-- 收益规则 END-->
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
	@import '@/assets/css/mineBalance.scss';
</style>
