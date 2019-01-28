<!-- 美丽日记列表 -->
<template>
	<div>
		<div class="box">
			<div class="diaryList" v-for="(item,key,index) in listDiaryInfo" :key='key'>
				<p class="yearFont">{{item.year}}年</p>
				<p class="yearFontA">Beautiful Diary</p>
				<div class="monthBox" v-for="(item2,key,index) in item.listDiary">
					<div class="month">
						<div class="monthImg"><img src="@/assets/images/icon/level.jpg"></div>
						<p>{{item2.date10}}</p>
						<div class="function">
							<div class="function-list" @click="edit(item2.id)">
								<div class="bianji">
									<img src="../assets/images/icon/bianji.png" />
								</div>
								<p class="isColor">编辑</p>
							</div>
							<div class="function-list" v-if="item2.isPrivate!=1" @click="ifPublic(0)">
								<div class="chakan">
									<img src="../assets/images/icon/public.png" />
								</div>
								<p class="isColor">公开</p>
							</div>
							<div class="function-list" v-if="item2.isPrivate==1" @click="ifPublic(1)">
								<div class="chakan">
									<img src="../assets/images/icon/publicNo.png" />
								</div>
								<p>隐私</p>
							</div>
						</div>
					</div>
					<div class="listContent">
						<div class="contentBox">
							<div v-for="(item3,key,index) in item2.listResource" :key='key'>
								<img :src="item2.listResource[key]!=null?item3.cover:ImgNull" />
							</div>
						</div>
						<div class="listFont">
							<p><span>[{{item2.prjName}}-第{{item2.dayIndex}}天]</span>{{item2.content}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="divHeight"></div>
		<div class="buttonA" @click="Newly">
			<button>新建</button>
		</div>
	</div>
</template>

<script>
	import * as api from '@/assets/js/api';
	import Vue from 'vue';
	import {
		Toast
	} from 'we-vue';
	import * as session from '@/assets/js/session';
	export default {
		name: 'mineDiaryList',
		data() {
			return {
				listDiaryInfo: '', //日记列表
				ImgNull: this.$store.state.ImgNull,
			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
			api.getVipDiaryList({
				data: {
					openid: this.$store.state.uid
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('我的日记列表', res.data);
					this.listDiaryInfo = res.data.listYear;
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		methods: {
			ifPublic: function(res) {
				// 公开或者隐私
				console.log('-----public', res);
			},
			Newly: function() {
				// 新建
				session.Lstorage.setItem('ifNewly', true);
				this.$router.push({
					name: 'mineDiaryLists'
				});
			},
			edit: function(res) {
				// 编辑
				session.Lstorage.setItem('ifNewly', false);
				session.Lstorage.setItem('ListsID', res);
				this.$router.push({
					name: 'mineDiaryLists'
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/css/mineDiaryList.scss';
</style>
