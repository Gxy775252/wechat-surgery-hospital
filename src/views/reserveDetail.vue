<template>
	<div class="background">
		<div class="userName">郑晓少（用户姓名）</div>
		<div class="content">
			<div class="lineBox">
				<p class="nameList">医生</p>
				<p>黄伟医生</p>
			</div>
			<div class="lineBox">
				<p class="nameList">预约时间</p>
				<p>11月4日 14:00~18:00</p>
			</div>
			<div class="lineBox">
				<p class="nameList">预约门店</p>
				<p>合生汇</p>
			</div>
			<div class="lineBox">
				<p class="nameList">预约项目</p>
				<p>抽脂瘦大腿</p>
			</div>
			<div class="lineBox">
				<p class="nameList">预约费用</p>
				<p>￥50</p>
			</div>
			<div class="lineBox">
				<p class="nameList">预约单号</p>
				<p>794646466456546</p>
			</div>
			<div class="lineBox">
				<p class="nameList">核销二维码</p>
			</div>
			<div class="code"></div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg"/>
				<p>术前注意事项</p>
			</div>
		</div>
		<div class="textContent">
			术前注意事项 图片文字
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg"/>
				<p>门店</p>
			</div>
		</div>
		<div class="positionBox">
			<div class="position">
				<p>我的位置：我的位置我的位置</p>
				<p>门店位置：门店位置门店位置</p>
				<div class="addImg"></div>
			</div>
		</div>
		
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
			})
		},
	}
</script>

<style scoped="scoped" lang="scss">
 @import '@/assets/css/reserveDetail.scss';
</style>
