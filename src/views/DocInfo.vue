<template lang="html">
  <div class="content">
    <div class="header">
      <img :src="doctorImgNull" >
      <div class="dortor_name">
        <p class="name">{{doctorInfo.name}}</p>
        <i></i>
        <p class="info">{{doctorInfo.title}}</p>
      </div>
      <div class="dortor_jieshao">
        <p>{{doctorInfo.brief}}</p>
        <div class="dortor_chengjiu">
          <div class="chengjiu_list">
            <p>278</p>
            <p>预约</p>
          </div>
          <div class="chengjiu_list" @click="goDoctorCase">
            <p>493</p>
            <p>案例</p>
          </div>
        </div>
      </div>
    </div>
    <div class="hospital">
      <img :src="doctorInfo.headimg || doctorImgNull" alt="" class="hospital_img" />
      <div class="hospital_info">
        <div class="hospital_name">
          <p>{{hospInfo.name}}</p>
          <p>{{hospInfo.type}}</p>
        </div>
        <p class="hospital_address">地址 | {{hospInfo.address}}</p>
      </div>
      <div class="hospital_tipe">
        <img src="@/assets/images/icon/horn.png" />
      </div>
    </div>
    <div class="dortor_title">
      <i></i>
      <p>医生资料</p>
    </div>
    <div class="dortor_resume">
      <img src="@/assets/images/icon/dortor_resume-icon.png"/>
      <div class="dortor_resume_list">
        <div class="dortor_resume_list_title">
          <i></i>
          <p>职业资格证书编号</p>
        </div>
        <!-- <p>{{listDqpcInfo[0].no || ""}}</p> -->
      </div>
      <div class="dortor_resume_list">
        <div class="dortor_resume_list_title">
          <i></i>
          <p>担任职务</p>
        </div>
        <p>{{doctorInfo.title}}</p>
      </div>
      <div class="dortor_resume_list">
        <div class="dortor_resume_list_title">
          <i></i>
          <p>擅长项目</p>
        </div>
        <p v-for="item in listPrjInfo" :key="item.id">
					{{item.name}}
				</p>
      </div>
      <div class="dortor_resume_list">
        <div class="dortor_resume_list_title">
          <i></i>
          <p>擅长仪器</p>
        </div>
        <p v-for="item in listInstInfo" :key="item.id">
						{{item.name}}
				</p>
      </div>
      <div class="dortor_resume_list">
        <div class="dortor_resume_list_title">
          <i></i>
          <p>医生简介</p>
        </div>
        <p>
					{{doctorInfo.brief}}
				</p>
      </div>
      <div class="dortor_resume_list">
        <div class="dortor_resume_list_title">
          <i></i>
          <p>医生详情</p>
        </div>
        <p>
					{{doctorInfo.content}}
				</p>
      </div>
    </div>
    <div class="dortor_title">
      <i></i>
      <p>医生证件</p>
    </div>
    <div class="dortor_certificate" v-for="item in listDqpcInfo" :key="item.id">
      <div class="certificate_title">
        <p>医生资格证书</p>
        <p>Doctor Qualification Certificate</p>
      </div>
      <div class="certificate_img">
        <img :src="item.pic" alt="">
      </div>
    </div>
		<div class="seeI">
			<img src="@/assets/images/icon/kanjian.png" />
		</div>
    <div class="bottom_btn">
      <button type="button" name="button">在线预约</button>
      <button type="button" name="button">在线咨询</button>
    </div>
    <div style="height: 90px;"></div>
  </div>
</template>

<script>
import * as api from '@/assets/js/api';
export default {
	name: 'DocInfo',
	data() {
		return {
			doctorInfo: '', //医生信息
			hospInfo: '', //医院信息
			listPrjInfo: '', //擅长项目列表信息
			listInstInfo: '', //擅长仪器列表信息
			listDqpcInfo: '', //证书列表信息
			doctorImgNull: this.$store.state.doctorImgNull
		};
	},
	components: {},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.getDoctorDetail({
			data: {
				openid: this.globalData.openid,
				id: this.$route.params.doctorId,
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('医生详情请求数据', res.data);
				this.doctorInfo = res.data.doctor;
				this.hospInfo = res.data.hosp;
				this.listPrjInfo = res.data.listPrj;
				this.listInstInfo = res.data.listInst;
				this.listDqpcInfo = res.data.listDqpc;
			} else {
				Toast.text({
					duration: 1000,
					message: '请求失败'
				});
			}
		});
	},
	methods: {
		goDoctorCase: function() {
			this.$router.push({
				name: 'doctorCase'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/DocInfo.scss';
</style>
