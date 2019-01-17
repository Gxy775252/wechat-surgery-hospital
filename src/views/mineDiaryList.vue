<!-- 美丽日记列表 -->
<template>
	<div>
		<div class="box" >
			<div class="diaryList">
				<p class="yearFont">2018年</p>
				<p class="yearFontA">Beautiful Diary</p>
				<div class="monthBox">
					<div class="month">
						<div class="monthImg"><img src="@/assets/images/icon/level.jpg"></div>
						<p>10月10日</p>
						<div class="function">
							<div class="function-list" @click="edit(1)">
								<div class="bianji">
									<img src="../assets/images/icon/bianji.png" />
								</div>
								<p class="isColor">编辑</p>
							</div>
							<div class="function-list">
								<div class="chakan">
									<img src="../assets/images/icon/public.png" />
								</div>
								<p class="isColor">公开</p>
							</div>
						</div>
					</div>
					<div class="listContent">
						<div class="contentBox">
							<div>
								<img src="@/assets/images/example/doctor.png" />
							</div>
							<div>
								<img src="@/assets/images/example/doctor.png" />
							</div>
						</div>
						<div class="listFont">
							<p><span>[医美整形-ST全脸字体脂肪填充-第99天]</span>我哟来了，奥地利咖啡机阿里的开发杰拉德发了哈看到</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="height: 3rem;"></div>
		<div class="buttonA" @click="Newly">
			<button>新建</button>
		</div>
	</div>
</template>

<script>
import * as api from '@/assets/js/api';
import Vue from 'vue';
import { Toast } from 'we-vue';
import * as session from '@/assets/js/session';
export default {
	name: 'mineDiaryList',
	data() {
		return {
			listDiaryInfo: '' //日记列表
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
				// 待修改 数据格式需要询问
				console.log('我的日记列表', res.data);
				// this.listDiaryInfo = res.data.listDiary;
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	methods: {
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
