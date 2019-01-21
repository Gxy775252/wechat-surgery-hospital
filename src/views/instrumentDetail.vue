<!-- 仪器详情 -->
<template lang="html">
  <div class="content">
    <div class="header">
      <div class="swiper">
      	<div class="swiperImg">
      		<wv-swipe :autoplay="4000" class="swiperImg">
      			<wv-swipe-item v-for="(item,key,index) in swipeContent" :key="key">
      				<img :src="item.cover || ImgNull" class="imgA" />
      				<div v-if="item.isVideo==1" class="playImg">
      					<img src="@/assets/images/icon/playImg.png" />
      				</div>
      			</wv-swipe-item>
      		</wv-swipe>
      	</div>
      </div>
      <div class="dortor_name">
        <p class="name">{{instInfo.name}}</p>
      </div>
      <div class="dortor_jieshao">
        <p>{{instInfo.brief}}</p>
      </div>
    </div>
    <div class="dortor_title">
      <i></i>
      <p>仪器使用项目</p>
    </div>
    <div class="dortor_resume">
      <p class="yearFont">Instruments</p>
      <p class="yearFontA">used in the project</p>
      <div class="dortor_resume_list" v-for="(item,key,index) in listProjectInfo" :key='key'>
        <div class="dortor_resume_list_title">
          <i></i>
          <p>{{item.name}}</p>
        </div>
		<div class="dortor_resume_list_title2">
			<p>{{item.brief}}</p>
		</div>
      </div>
    </div>
    <div class="dortor_title">
      <i></i>
      <p>仪器详情</p>
    </div>
	<div class="textarea">
		<p v-html="instInfo.content"></p>
	</div>
	<div style="height: 15px;width:100%;background: #f7f7f7;"></div>
	<div class="seeI">
		<img src="@/assets/images/icon/kanjian.png" />
	</div>
    <div class="bottom_btn">
      <button type="button" name="button" class="btnA">在线预约</button>
      <button type="button" name="button" class="btnB">在线咨询</button>
    </div>
    <div style="height: 3rem;"></div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem, Toast } from 'we-vue';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
Vue.use(Swipe).use(SwipeItem);
export default {
	name: 'instrumentDetail',
	data() {
		return {
			ImgNull: this.$store.state.ImgNull,
			swipeContent: '',
			instInfo: '',
			listProjectInfo: ''
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.goInstDetail({
			data: {
				openid: this.$store.state.uid,
				id: session.Lstorage.getItem('instr')
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('仪器详情页', res.data);
				this.swipeContent = res.data.listBanner; //轮播列表
				this.instInfo = res.data.inst; //仪器信息
				this.listProjectInfo = res.data.listProject; //项目列表
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/instrumentDetail.scss';
@import '@/assets/css/doctorList.scss';
</style>
