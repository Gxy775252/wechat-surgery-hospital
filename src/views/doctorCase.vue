<template>
	<div>
		<div class="caseTop" v-for="item in listProjectInfo">
			<p>{{item.projectName}}</p>
			<div style="clear:both"></div>
		</div>
		<div class="mation" v-for="item in listCaseInfo">
			<div class="mationTop">
				<div>
					<img :src="item.headimg" />
				</div>
				<div>
					<p>{{item.title}}</p>
					<p>{{item.date10}}</p>
				</div>
			</div>
			<div class="mationCenter" v-for="item2 in item.listCover">
				<div>
					<img :src="item2.cover" />
				</div>
			</div>
			<div class="mationBottom">
				<p>{{item.brief}}</p>
			</div>
			<div class="mationBottom">
				<p style="text-align:right;color:#434c53;">
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
            listCaseInfo: '' //案例列表
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
                projectid: 1 //项目id,
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
@import '@/assets/css/Index.scss';
</style>
