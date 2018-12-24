<template>
	<div>
		<div class="TopContent">
			<div class="logo">
				<img src="@/assets/images/icon/logo.png"/>
			</div>
			<div class="search">
				<img src="@/assets/images/icon/search.png"/>
			</div>
		</div>
		<div class="swiper">
			<div class="swiperImg">
				<wv-swipe  :autoplay="4000" class="swiperImg">
					<wv-swipe-item>
						<img src="@/assets/images/example/doctor.png" />	
					</wv-swipe-item>
					<wv-swipe-item>
						<img src="@/assets/images/example/doctor.png" />	
					</wv-swipe-item>
					<wv-swipe-item>
						<img src="@/assets/images/example/doctore.png" />	
					</wv-swipe-item>
				</wv-swipe>
			</div>
		</div>
		<div class="doctor">
			<div class="doctorImg">
				<img src="@/assets/images/example/doctor.png" />
			</div>
			<div class="doctorText">
				<div class="centerText">
					<p>DOCTOR &nbsp; 医生</p>
					<p>执医超过15年</p>
					<p>中日友好医院整形外科主任医师</p>
				</div>
				<div class="bottomText" style="left:0.66rem;">
					<p>查看更多医生</p>
					<img src="@/assets/images/icon/rightColor.png" />
				</div>
			</div>
		</div>
		<div class="doctor">
			<div class="doctorText" style="border-left: 1px solid #008e83;border-right:0;margin-left: 6px;">
				<div class="centerText" style="text-align: right;margin-right:0.66rem;">
					<p>INSTRUMENT &nbsp; 仪器</p>
					<p>汇聚60多部环球卓越医美仪器体验顶尖医美疗程</p>
					<p></p>
				</div>
				<div class="bottomText" style="right:0.66rem;">
					<img src="@/assets/images/icon/rightColor.png" style="transform:rotate(180deg);margin: 0 0.3rem 0 0;"/>
					<p>查看更多仪器</p>
				</div>
			</div>
			<div class="doctorImg">
				<img src="@/assets/images/example/doctor.png" />
			</div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg"/>
				<p>美丽日记</p>
			</div>
			<div class="diaryRight">
				<p>MORE</p>
				<img src="@/assets/images/icon/rightGray.png"/>
			</div>
		</div>
		<div class="mation">
			<div class="mationTop">
				<div>
					<img src="@/assets/images/icon/shoppingCart.png" />
				</div>
				<div>
					<p>JuLia</p>
					<p>11月 &nbsp; 12日</p>
				</div>
			</div>
			<div class="mationCenter">
				<div>
					<img src="@/assets/images/example/doctore.png" />
				</div>
				<div>
					<img src="@/assets/images/example/doctor.png" />
				</div>
			</div>
			<div class="mationBottom">
				<p>【医美整形-ST全脸字体脂肪填充-第99天】&nbsp;大家好我又来更新日记啦，现在做完ST全脸脂肪填充已经恢复的很好了</p>
			</div>
			<div class="mationBottom">
				<p style="text-align:right;color:#434c53;">
					1000人来过
				</p>
			</div>
		</div>
		<div class="select">
			<div style="padding:1.7rem 0;">
				<img src="@/assets/images/icon/level.jpg" class="line"/>
				<p>皮肤分析</p>
				<img src="@/assets/images/icon/level.jpg" class="line"/>
			</div>
			<div>
				<select class="options">
					<option>色斑</option>
					<option>雀斑</option>
					<option>红血丝</option>
				</select>
			</div>
		</div>
		<div class="mationImg">
			<img src="@/assets/images/icon/mationImg.png" />
		</div>
		<div class="seeI">
			<img src="@/assets/images/icon/seeI.png" />
		</div>
		<div style="height:6rem;"></div>
	</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Vue from 'vue';
import { Swipe, SwipeItem, Flex, FlexItem } from 'we-vue';
import { Authorization, parseUrl } from '@/assets/js/utils';
import wx from 'weixin-js-sdk';
import * as api from '@/assets/js/api';

Vue.use(Swipe)
    .use(SwipeItem)
    .use(Flex)
    .use(FlexItem);

export default {
    name: 'index',
    components: {
        // HelloWorld
    },
    data: function() {
        return {
            isShowTaskWindow: true,
            taskInfo: {},
            num: 3
        };
    },
    created: function() {
			this.$store.commit('showBottomNav', {
				isShow: true
			})
		},
    mounted: function() {},
    methods: {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/Index.scss';
</style>
