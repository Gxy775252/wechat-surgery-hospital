<!-- 首页 -->
<template>
	<div style='overflow: hidden;background: #fff;'>
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
				<wv-swipe :autoplay="4000" class="swiperImg" v-if="isId!=1">
					<wv-swipe-item v-for="(item, key, index) in swipeContent" :key="key">
						<img :src="item.cover || ImgNull" class="imgA" @click="funcitonA(item.sourceid)" v-if="item.redirectType==0" />
						<img :src="item.cover || ImgNull" class="imgA" @click="funcitonB(item.sourceid)" v-if="item.redirectType==1" />
						<img :src="item.cover || ImgNull" class="imgA" @click="funcitonC(item.sourceid)" v-if="item.redirectType==2" />
						<img :src="item.cover || ImgNull" class="imgA" @click="funcitonD(item.sourceid)" v-if="item.redirectType==3" />
						<div v-if="item.isVideo==1" class="playImg" @click.stop="isIdFun(item.url)">
							<img src="@/assets/images/icon/playImg.png" />
						</div>
					</wv-swipe-item>
				</wv-swipe>
				<Samll-Video class="swiperImg" @surt="surt" v-if="isId==1" :videoUrl="videoUrl" :aspectRatio="aspectRatio"></Samll-Video>
			</div>
		</div>

		<div class="doctor">
			<img :src="configImg.homeDoctorPic || ImgNull" />
			<div class="bottomText" @click="goDoctorList()">
				<p>查看更多医生</p>
				<img src="@/assets/images/icon/rightColor.png" />
			</div>
		</div>
		<div class="doctor2">
			<img :src="configImg.homeInstPic || ImgNull" />
			<div class="bottomText" @click="goInstrumentList()">
				<p>查看更多仪器</p>
				<img src="@/assets/images/icon/rightColor.png" />
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
				<div class="listCon" :class="listConA">
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
		<div class="divHeight"></div>
		<!-- 选择肤质 -->
		<wv-picker :visible.sync="fruitPickerShow" :columns="fruitColumns" value-key="title" @confirm="confirmPerson" />
	</div>
</template>

<script>
	// @ is an alias to /src
	// import HelloWorld from '@/components/HelloWorld.vue'
	import Vue from 'vue';
	import {
		Swipe,
		SwipeItem,
		Flex,
		FlexItem,
		Picker,
		Toast
	} from 'we-vue';
	import {
		Authorization,
		parseUrl
	} from '@/assets/js/utils';
	import wx from 'weixin-js-sdk';
	import * as api from '@/assets/js/api';
	import * as session from '@/assets/js/session';
	import SamllVideo from '@/components/samllVideoPlay.vue';
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
				stores: [{
					title: '请选择'
				}], //您的肤质
				listConA: '', //改变颜色
				fruitPickerShow: false,
				fruitColumns: [{
					values: []
				}],
				videoUrl: '',
				isId: 0,
				aspectRatio: '14:9',
			};
		},
		components: {
			'Samll-Video': SamllVideo
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: true
			});
			console.log(this.$store.state, '----------????state')
			console.log(this.globalData, '------------------index globalDatass')
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
			isIdFun: function(e) {
				this.isId = 1;
				this.videoUrl = e
			},
			surt: function(e) {
				this.isId = e
			},
			funcitonA: function(res) {
				session.Lstorage.setItem('doctorId', res);
				this.$router.push({
					name: 'docInfo'
				});
			},
			funcitonB: function(res) {
				session.Lstorage.setItem('instr', res);
				this.$router.push({
					name: 'instrumentDetail'
				});
			},
			funcitonC: function(res) {
				session.Lstorage.setItem('shopId', res);
				this.$router.push({
					name: 'commodityDetail'
				});
			},
			funcitonD: function(res) {
				this.$router.push({
					name: 'reserveDetail2',
					query: {
						detail2Id: res
					},
				});
			},
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
				this.$router.push({
					name: 'diaryDetails'
				});
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
