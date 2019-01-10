<template>
	<div class="all">
		<div class="caseTop">
			<p class="colorActive">全部</p>
			<p v-for="(item,key,index) in listProjectInfo" :key="key">{{item.projectName}}</p>
			<div style="clear:both"></div>
		</div>
		<div class="caseList" v-for="(item,key,index) in listCaseInfo" :key='key'>
			<div class="mationTop">
				<div>
					<img :src="item.headimg || doctorImgNull" />
				</div>
				<div>
					<p>{{item.title}}</p>
					<p>{{item.date10}}</p>
				</div>
			</div>
			<div class="caseCen">
				<img :src="doctorImgNull" />
			</div>
			<div class="mationCon">
				<p><span>[医美整形-ST全脸字体脂肪填充-第99天]</span>{{item.brief}}</p>
			</div>
			<div class="xian"></div>
			<div class="mationBottom">
				<p>
					1000人来过
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import * as api from '@/assets/js/api';
export default {
	data() {
		return {
			listProjectInfo: '', //项目列表
			listCaseInfo: '', //案例列表
			doctorImgNull: this.$store.state.doctorImgNull
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.getDoctorCase({
			data: {
				openid: this.globalData.openid,
				doctorid: 1, //医生id,
				projectid: 0 //项目id,
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('医生案例列表请求数据', res.data);
				this.listProjectInfo = res.data.listProject; //项目列表
				this.listCaseInfo = res.data.listCase; //案例列表
			} else {
				Toast.text({
					duration: 1000,
					message: '请求失败'
				});
			}
		});
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/doctorCase.scss';
</style>
