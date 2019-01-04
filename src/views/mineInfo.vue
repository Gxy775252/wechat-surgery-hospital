<template>
	<div>
		<div class="head">
			<div class="headImg">
				<img src="@/assets/images/example/doctor.png" />
			</div>
			<p>丁冰</p>
		</div>
		<div class="list" style="margin-top: calc(8.64rem / 2);">
			<p>生日</p> 
			<div @click="openPicker('picker')" class="list-right">
				<p>{{birthday}}</p>
				<div>
					<img src="@/assets/images/icon/mineHore.png" />
				</div>
			</div>
		</div>
		<div class="list">
			<p>性别</p> 
			<div class="list-right">
			
			</div>
		</div>	
			<wv-checklist title="基本示例" :options="options" v-model="checkedItems">
			
		</wv-checklist>
		
		
		<div class="list">
			<p>职业</p>
			<div class="list-right">
				<div>
					<img src="@/assets/images/icon/mineHore.png" />
				</div>
			</div>
		</div>	
		<div class="list">
			<p>邮箱</p> 
			<div class="list-right">
				<div>
					<img src="@/assets/images/icon/mineHore.png" />
				</div>
			</div>
		</div>			
		<!-- 日期选择器 -->
	<!-- 	<wv-datetime-picker
			ref="picker"
			type="date"
			v-model="dateTime" 
			@confirm="onConfirm"  
			:start-date="new Date('1970/01/01 00:00')" 
			:end-date="new Date()">
		</wv-datetime-picker> -->
		<!-- 日期选择器 END-->
	</div>
</template>
<script>
import Vue from 'vue';
import * as api from '@/assets/js/api';
import {  DatetimePicker } from 'we-vue';
Vue.use(DatetimePicker);
export default {
	data() {
		return {
			dateTime: new Date(),
			birthday: '选择生日',
			options: [
				{
					label: '选项1',
					value: 'value1'
				},
				{
					label: '选项2',
					value: 'value2'
				},
				{
					label: '选项3',
					value: 'value3'
				}
			],
			checkedItems: ['value1']
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
	},
	methods: {
		// 选择日期功能
		openPicker(res) {
			this.$refs[res].open();
		},
		onConfirm(res) {
			let year = res.getFullYear();
			let month = res.getMonth() + 1;
			let date = res.getDate();
			this.birthday = `${year}-${month}-${date}`;
		}
		// 选择日期功能 END
	}
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/mineInfo.scss';
</style>
