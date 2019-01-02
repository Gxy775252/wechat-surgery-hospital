<template>
	<div class="all">
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>门店时间信息</p>
			</div>
		</div>
		<div class="Allselect">
			<div class="Allselect-stores">
				<p>Stores</p>
				<select>
					<option>朝阳区合生汇门店</option>
				</select>
				<span></span>
			</div>
			<div class="Allselect-stores Second">
				<p>Subjects</p>
				<select>
					<option>选择项目(必填)</option>
				</select>
				<span></span>
				<div>查看项目详情</div>
			</div>
			<div class="Allselect-stores Third">
				<p>Doctors</p>
				<select>
					<option>选择医生(选填)</option>
				</select>
				<span></span>
			</div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>预约时间</p>
			</div>
		</div>
		<div class="Allselect" style="padding: calc(3rem / 2) 0;">
			<div class="Allselect-top">
				<div class="list active">
					<p>今日</p>
					<p>12-19</p>
				</div>
				<div class="list">
					<p>今日</p>
					<p>12-19</p>
				</div>
				<div class="list">
					<p>今日</p>
					<p>12-19</p>
				</div>
			</div>
			<div class="Allselect-bottom">
				<p>8:00-9:00</p>
				<p>8:00-9:00</p>
				<p>8:00-9:00</p>
			</div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>预约信息</p>
			</div>
		</div>
		<div class="Allselect">
			<div class="Allselect-stores">
				<p>Name</p>
				<input placeholder="联系人姓名"/>
				<span></span>
			</div>
			<div class="Allselect-stores Second">
				<p>Telephone</p>
				<input placeholder="填写联系人电话" />
				<span></span>
			</div>
			<div class="Allselect-stores Second">
				<p>Note</p>
				<input placeholder="填写备注" />
				<span></span>
			</div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>预约费用</p>
			</div>
		</div>
		<div class="price">
			<div>
				<p>￥ 50.00</p>
				<p>注：提前一天取消预约可退款，当天不可退款</p>
			</div>
		</div>
		<div class="submit">
			<button>立即预约</button>
		</div>
		<div style="height:3rem;"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: true
		});
	}
};
</script>

<style scoped="scoped" lang="scss">
@import '@/assets/css/reserve.scss';
</style>
