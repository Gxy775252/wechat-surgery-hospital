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
				<div class="Allselect-list">
					<div class="listCon">
						{{stores}}
					</div>
					<div class="listImg">
						<!-- <img src="@/assets/images/icon/mineHore.png" /> -->
					</div>
				</div>

				<!-- <select>
					<option>朝阳区合生汇门店</option>
				</select> -->
				<span></span>
			</div>
			<div class="Allselect-stores Second">
				<p>Subjects</p>
				<div class="Allselect-list">
					<div class="listCon">{{subjects}}</div>
					<div class="listImg">
						<img src="@/assets/images/icon/mineHore.png" />
					</div>
				</div>
				<!-- <select>
					<option>选择项目(必填)</option>
				</select> -->
				<span></span>
				<div>查看项目详情</div>
			</div>
			<div class="Allselect-stores Third">
				<p>Doctors</p>
				<div class="Allselect-list">
					<div class="listCon">{{doctor}}</div>
					<div class="listImg">
						<img src="@/assets/images/icon/mineHore.png" />
					</div>
				</div>
				<!-- <select>
					<option>选择医生(选填)</option>
				</select> -->
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
				<!-- active -->
				<div class="list" v-for="(item,key,index) in listDateInfo" :key='key' @click="clickList(item.id)" >
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
				<input placeholder="联系人姓名" />
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
	import Vue from 'vue';
	import * as api from '@/assets/js/api';
	import {
		Toast,
		Picker,
		Group,
		Cell
	} from 'we-vue';

	Vue.use(Picker).use(Group).use(Cell);
	export default {
		data() {
			return {
				listDateInfo: '', //时间段，明天起的30天
				stores: '选择门店(必填)', //门店
				subjects: '选择项目(必填)', //项目
				doctor: '选择医生(选填)', //医生
			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: true
			});
			api.goAppointment({
				data: {
					openid: this.$store.state.uid
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('预约', res.data);
					this.listDateInfo = res.data.listDate;
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		methods: {

		},
	};
</script>


<style scoped="scoped" lang="scss">
	@import '@/assets/css/reserve.scss';
</style>
