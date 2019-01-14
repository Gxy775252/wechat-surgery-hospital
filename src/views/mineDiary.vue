<template>
	<div class="all">
		<div class="diaryList">
			<div class="list">
				<p>皮肤检测</p>
				<div class="list-right">
					<p>去检测皮肤</p>
					<div class="right-div">
						<img src="@/assets/images/icon/mineHore.png" />
					</div>
				</div>
			</div>
			<div class="list">
				<p>您的肤质</p>
				<div class="list-right">
					<p @click="Picker" :class="listConA">{{stores | pickerValueFilter}}</p>
					<div class="right-div">
						<img src="@/assets/images/icon/mineHore.png" />
					</div>
				</div>
			</div>
			<div class="list">
				<p>是否做过整容项目</p>
				<div class="select">
					<div class="select-on" @click="sex(1)">
						<div>
							<img src="@/assets/images/icon/select-Center.png" v-if="ifSex==1" />
							<img src="@/assets/images/icon/sele.png" v-else />
						</div>
						<p>是</p>
					</div>
					<div class="select-on" @click="sex(2)">
						<div>
							<img src="@/assets/images/icon/select-Center.png" v-if="ifSex==2" />
							<img src="@/assets/images/icon/sele.png" v-else />
						</div>
						<p>否</p>
					</div>
				</div>
			</div>
			<div class="checkbox">
				<div class="checkbox-title">做过的整容项目<p>（勾选您做过的整容项目，可多选）</p>
				</div>
				<div class="checkbox-con">
					<div class="content" v-for="(item,key,index) in list" :key='key' @click="checkbox(item.id)">
						<div>
							<img src="@/assets/images/icon/checkbox-z.png" v-if="item.isClick" />
							<img src="@/assets/images/icon/checkbox.png" v-else />
						</div>
						<p>{{item.name}}</p>
					</div>
					<div style="clear: both;"></div>
				</div>
			</div>
			<div class="question">
				<div class="checkbox-title" style="padding-bottom: calc(1rem / 2);">需要解决的问题以及期望</div>
				<div class="question-textarea">
					<wv-textarea placeholder="请输入文本" :rows="4"></wv-textarea>
				</div>
			</div>
			<div class="img">
				<div class="checkbox-title" style="padding-bottom: calc(3.2rem / 2);">上传照片或者视频（最多5张）</div>
				<div class="imgA">
					<div class="imgA-An">
						<img src="../assets/images/icon/upload.png" />
					</div>
					<div style="clear: both;"></div>
				</div>
			</div>
			<div style="height: 6rem;"></div>
		</div>
		<div class="buttonA" @click="submit">
			<button>提交</button>
		</div>
		<!-- 选择肤质 -->
		<wv-picker :visible.sync="fruitPickerShow" :columns="fruitColumns" value-key="name" @confirm="confirmPerson" />
	</div>
</template>

<script>
	import Vue from 'vue';
	import * as api from '@/assets/js/api';
	import {
		Textarea,
		Toast,
		Picker
	} from 'we-vue';
	Vue.use(Textarea).use(Picker);
	export default {
		data() {
			return {
				doctorImgNull: this.$store.state.doctorImgNull,
				ifSex: 2, //是否做过整容项目
				list: [], //整容项目
				listArray: [], //存储整容项目
				stores: [{name:'请选择您的肤质'}], //您的肤质
				listConA: '', //改变颜色
				fruitPickerShow: false,
				fruitColumns: [{
					values: [{
							name: 'Apple',
							price: 1.3
						},
						{
							name: 'Banana',
							price: 2.0
						},
						{
							name: 'Orange',
							price: 10
						},
						{
							name: 'Pear',
							price: 0.5
						}
					]
				}],

			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
			api.goVipSkinInfo({
				data: {
					openid: this.globalData.openid
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('我的肤质页', res.data);
					for (let i in res.data.listProject) {
						res.data.listProject[i].isClick = false;
					}
					this.list = res.data.listProject; //整容项目
					this.ticketColumns = res.data.skinInfo; //肤质信息
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		methods: {
			// 提交内容
			submit:function(){
				// 待修改  提交内容  submitSkininfo 接口地址
				this.$router.push({
					name: 'mineDiaryList'
				})
			},
			
			// 多选整容项目
			checkbox: function(res) {
				for (let i in this.list) {
					if (this.list[i].id == res && !this.list[i].isClick) {
						this.list[i].isClick = true;
						this.listArray.push(this.list[i].id);
					} else if (this.list[i].id == res && this.list[i].isClick) {
						this.list[i].isClick = false;
						if (this.listArray.indexOf(this.list[i].id) > -1) {
							this.listArray.splice(this.listArray.indexOf(this.list[i].id), 1);
						}
					}
				}
			},
			// 选择您的肤质
			Picker: function() {
				this.fruitPickerShow = true;
			},
			confirmPerson: function(picker) {
				this.stores = picker.getValues()[0]
				this.listConA = 'listConA';
			},
			// 选择是否做过整容项目
			sex(res) {
				this.ifSex = res;
			},
		},
		filters: {
			pickerValueFilter(val) {
				if (val.constructor == Array) {
					return '请选择您的肤质'
				} else {
					return val.name.toString()
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/css/mineDiary.scss';
</style>
