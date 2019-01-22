<!-- 首页 -->
<template>
	<div>
		<div class="TopContent">
			<div class="logo">
				<img src="@/assets/images/icon/logo.png" />
			</div>
			<div class="search" @click="goSearch()">
				<img src="@/assets/images/icon/search.png" />
			</div>
		</div>
		<div class="swiper">
			<div>
				<wv-swipe :autoplay="4000" class="swiperImg">
					<wv-swipe-item v-for="(item, key, index) in swipeContent" :key="key">
						<!-- <img :src="item.cover || ImgNull" class="imgA" /> 待修改-->
						 <img src="@/assets/images/example/listImgOne.png" class="imgA" />
						<div v-if="item.isVideo==1" class="playImg">
							<img src="@/assets/images/icon/playImg.png" />
						</div>
					</wv-swipe-item>
				</wv-swipe>
			</div>
		</div>
		<div class="doctor">
			<div class="doctorImg">
				<!-- <img :src="ImgNull" /> 待修改-->
				<img src="@/assets/images/example/doctor.png" />
			</div>
			<div class="doctorText">
				<div class="centerText">
					<img :src="configImg.homeDoctorPic || ImgNull"/>
				</div>
				<div class="bottomText" style="left:0.66rem;" @click="goDoctorList()">
					<p>查看更多医生</p>
					<img src="@/assets/images/icon/rightColor.png" />
				</div>
			</div>
		</div>
		<div class="doctor">
			<div class="doctorText" style="border-left: 1px solid #008e83;border-right:0;margin-left: 6px;">
				<div class="centerText" style="text-align: right;margin-right:0.66rem;">
					<img :src="configImg.homeInstPic" />
				</div>
				<div class="bottomText" style="right:0.66rem;" @click="goInstrumentList()">
					<img src="@/assets/images/icon/rightColor.png" style="transform:rotate(180deg);margin: 0 0.3rem 0 0;" />
					<p>查看更多仪器</p>
				</div>
			</div>
			<div class="doctorImg">
				<!-- <img :src="ImgNull" 待修改/> -->
				<img src="@/assets/images/example/yiqi.png" />
			</div>
		</div>
		<div class="diary" style="width:100%;">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>美丽日记</p>
			</div>
			<div class="diaryRight" @click="gobeautifulDiary2()">
				<p>MORE</p>
				<img src="@/assets/images/icon/rightGray.png" />
			</div>
		</div>
		<div class="mation" v-for="(item,key,index) in diaryLisy" :key="key">
			<div class="mationTop">
				<div>
					<img :src="item.headimg" />
				</div>
				<div>
					<p>{{item.vipName}}</p>
					<p>{{item.date10}}</p>
				</div>
			</div>
			<div class="mationCenter">
				<div v-for="(item2,key,index) in item.listResource" :key="key">
					<img :src="item2.cover || ImgNull" />
					<div class="playImg" v-if="item2.isVideo==1">
						<img src="@/assets/images/icon/playImg.png" />
					</div>
				</div>
			</div>
			<div class="mationCon" @click="goDiaryDetail(item.id)">
				<p><span>[{{item.prjName}}-第{{item.dayIndex}}天]</span>{{item.content}}</p>
			</div>
			<div class="xian" @click="goDiaryDetail(item.id)"></div>
			<div class="mationBottom" @click="goDiaryDetail(item.id)">
				<p>
					{{item.brows}}人来过
				</p>
			</div>
		</div>
		<div class="select">
			<div style="padding:1.7rem 0;">
				<img src="@/assets/images/icon/level.jpg" class="line" />
				<p>皮肤分析</p>
				<img src="@/assets/images/icon/level.jpg" class="line" />
			</div>
			<div class="options" @click="prickPro()">
				<div class="listCon"  :class="listConA">
					{{stores | pickerValueFilter}}
				</div>
				<div class="listImg">
					<img src="@/assets/images/icon/mineHore.png" />
				</div>
			</div>
		</div>
		<div class="mationImg">
			<img :src="configImg.indexPic" />
		</div>
		<div class="seeI">
			<img src="@/assets/images/icon/kanjian.png" />
		</div>
		<!-- 待修改 视频播放功能 -->
		<!-- <div class="briefImg" v-if="isPlay">
			<Video-Play :videoUrl="videoUrl" v-on:surt="surtChild" :isNone="isPlay"></Video-Play>
		</div> -->
		<div style="height:3rem;"></div>
		<!-- 选择肤质 -->
		<wv-picker :visible.sync="fruitPickerShow" :columns="fruitColumns" value-key="title" @confirm="confirmPerson" />
	</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Vue from 'vue';
import { Swipe, SwipeItem, Flex, FlexItem, Picker, Toast } from 'we-vue';
import { Authorization, parseUrl } from '@/assets/js/utils';
import wx from 'weixin-js-sdk';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';

Vue.use(Swipe)
	.use(SwipeItem)
	.use(Flex)
	.use(FlexItem)
	.use(Picker);

export default {
	name: 'index',
	data() {
		return {
			isPlay: false,
			swipeContent: '',
			configImg: '',
			diaryLisy: '',
			optionId: -1,
			ImgNull: this.$store.state.ImgNull,
			stores: [{ title: '请选择' }], //您的肤质
			listConA: '', //改变颜色
			fruitPickerShow: false,
			fruitColumns: [{ values: [] }]
		};
	},

	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: true
		});
		console.log(this.$store.state,'----------????state')
		console.log(this.globalData,'------------------index globalDatass')
		api.getIndex({
			data: {
				openid: this.$store.state.uid
			}
		}).then(res => {
			console.log('首页请求数据', res.data);
			if (res.data.flag) {
				this.configImg = res.data.config; //就那个看见自己上面的图，还有轮播下面的图；
				this.swipeContent = res.data.listBanner; //轮播
				this.fruitColumns[0].values = res.data.listQa; //下拉框
				this.diaryLisy = res.data.listDiary; //美丽日记内容
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	methods: {
		goDoctorList: function() {
			//跳医生列表
			this.$router.push({
				name: 'doctorList'
			});
		},
		goInstrumentList: function() {
			// 跳仪器列表
			this.$router.push({
				name: 'instrumentList'
			});
		},
		gobeautifulDiary2: function() {
			console.log('是否执行');
			// 跳美丽日记
			this.$router.push({
				name: 'beautifulDiary'
			});
		},
		goDiaryDetail: function(res) {
			// 进入美丽日记详情
			session.Lstorage.setItem('diaryId', res);
			this.$router.push({ name: 'diaryDetails' });
		},
		// 选择皮肤分析
		prickPro: function() {
			this.fruitPickerShow = true;
		},
		confirmPerson: function(picker) {
			this.stores = picker.getValues()[0];
			this.listConA = 'listConA';
			session.Lstorage.setItem('selectId', picker.getValues()[0].id);
			// 跳转到皮肤页面
			this.$router.push({
				name: 'skinAnalysis'
			});
		}
	},
	filters: {
		pickerValueFilter(val) {
			if (val.constructor == Array) {
				return '请选择';
			} else {
				return val.title.toString();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/Index.scss';
</style>
