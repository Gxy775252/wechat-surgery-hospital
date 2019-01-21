<!-- 医生案例 -->
<template>
	<div class="all">
		<div class="caseTop">
			<p @click="selectProject(0)" :class="0==proId?'colorActive':''">全部</p>
			<p v-for="(item,key,index) in listProjectInfo" :key="key" @click="selectProject(item.projectid)" :class="item.projectid==proId?'colorActive':''">{{item.prjName}}</p>
			<div style="clear:both"></div>
		</div>
		<div class="caseList" v-for="(item,key,index) in listCaseInfo" :key='key'>
			<div class="mationTop">
				<div>
					<img :src="item.headimg || ImgNull" />
				</div>
				<div>
					<p>{{item.vipName}}</p>
					<p>{{item.date10}}</p>
				</div>
			</div>
			<div class="caseCen">
				<img :src="item.listCover[0].cover || ImgNull" />
				<div v-if="item.listCover[0].isVideo == 1" class="playImg">
					<img src="@/assets/images/icon/playImg.png" />
				</div>
			</div>
			<div class="mationCon">
				<!-- 待修改 缺少项目名称和天数 -->
				<p><span>[{{item.title}}]</span>{{item.brief}}</p>
			</div>
			<div class="xian"></div>
			<div class="mationBottom">
				<p>
					<!-- 缺少浏览量 -->
					{{item.browCount || 0}}人来过
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
export default {
	name: 'doctorCase',
	data() {
		return {
			proId: '', //项目列表选中id
			listProjectInfo: '', //项目列表
			listCaseInfo: '', //案例列表
			ImgNull: this.$store.state.ImgNull
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.getDoctorCase({
			data: {
				openid: this.$store.state.uid,
				doctorid: session.Lstorage.getItem('caseId'), //医生id,
				projectid: 0 //项目id 0=全部,
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('医生案例列表请求数据', res.data);
				this.listProjectInfo = res.data.listProject; //项目列表
				this.listCaseInfo = res.data.listCase; //案例列表
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	methods: {
		// 选择项目
		selectProject: function(res) {
			console.log(res);
			this.proId = res;
			api.getDoctorCase({
				data: {
					openid: this.$store.state.uid,
					doctorid: session.Lstorage.getItem('caseId'), //医生id,
					projectid: res,
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('医生案例列表请求数据', res.data);
					this.listProjectInfo = res.data.listProject; //项目列表
					this.listCaseInfo = res.data.listCase; //案例列表
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/doctorCase.scss';
</style>
