<!-- 医生详情 -->
<template lang="html">
	<div class="content">
		<div class="header">
			<div class="swiper">
				<div class="swiperImg">
					<wv-swipe :autoplay="4000" class="swiperImg" v-if="isId!=1">
						<wv-swipe-item v-for="(item, key, index) in swipeContent" :key="key">
							<img :src="item.cover ? item.cover : ImgNull" class="imgA" />
							<div v-if="item.isVideo==1" class="playImg" @click.stop="isIdFun(item.url)">
								<img src="@/assets/images/icon/playImg.png" />
							</div>
						</wv-swipe-item>
					</wv-swipe>
					<Samll-Video class="swiperImg" @surt="surt" v-if="isId==1" :videoUrl="videoUrl" :aspectRatio="aspectRatio"></Samll-Video>
				</div>
			</div>
			<div class="dortor_name">
				<p class="name">{{ doctorInfo.name }}</p>
				<i></i>
				<p class="info">{{ doctorInfo.title }}</p>
			</div>
			<div class="dortor_jieshao">
				<p>{{ doctorInfo.brief }}</p>
				<div class="dortor_chengjiu">
					<div class="chengjiu_list">
						<p>{{ info.orders }}</p>
						<p>预约</p>
					</div>
					<div class="chengjiu_list" @click="goDoctorCase">
						<p>{{ info.cases }}</p>
						<p>案例</p>
					</div>
				</div>
			</div>
		</div>
		<div class="hospital" @click='goMap(hospInfo.position,hospInfo.name,hospInfo.address)'>
			<img :src="doctorInfo.headimg || ImgNull" alt="" class="hospital_img" />
			<div class="hospital_info">
				<div class="hospital_name">
					<p>{{ hospInfo.name }}</p>
					<p>{{ hospInfo.type }}</p>
				</div>
				<p class="hospital_address">地址 | {{ hospInfo.address }}</p>
			</div>
			<div class="hospital_tipe"><img src="@/assets/images/icon/horn.png" /></div>
		</div>
		<div class="dortor_title">
			<i></i>
			<p>医生资料</p>
		</div>
		<div class="dortor_resume">
			<img src="@/assets/images/icon/dortor_resume-icon.png" />
			<div class="dortor_resume_list">
				<div class="dortor_resume_list_title">
					<i></i>
					<p>职业资格证书编号</p>
				</div>
				<p>{{ doctorInfo.dpqc }}</p>
			</div>
			<div class="dortor_resume_list">
				<div class="dortor_resume_list_title">
					<i></i>
					<p>担任职务</p>
				</div>
				<p>{{ doctorInfo.title }}</p>
			</div>
			<div class="dortor_resume_list">
				<div class="dortor_resume_list_title">
					<i></i>
					<p>擅长项目</p>
				</div>
				<div class="dortor_resume_list_title2">
					<p v-for="item in listPrjInfo" :key="item.id">{{ item.name }}</p>
				</div>
			</div>
			<div class="dortor_resume_list">
				<div class="dortor_resume_list_title">
					<i></i>
					<p>擅长仪器</p>
				</div>
				<div class="dortor_resume_list_title2">
					<p v-for="item in listInstInfo" :key="item.id">{{ item.name }}</p>
				</div>
			</div>
			<div class="dortor_resume_list">
				<div class="dortor_resume_list_title">
					<i></i>
					<p>医生简介</p>
				</div>
				<p>{{ doctorInfo.brief }}</p>
			</div>
			<div class="dortor_resume_list">
				<div class="dortor_resume_list_title">
					<i></i>
					<p>医生详情</p>
				</div>
				<p>{{ doctorInfo.content }}</p>
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
			<div class="certificate_img"><img :src="item.pic || ImgNull" alt="" /></div>
		</div>
		<div class="seeI"><img src="@/assets/images/icon/kanjian.png" /></div>
		<div class="bottom_btn">
			<button type="button" name="button" class="btnA" @click="goReserve">在线预约</button>
			<button type="button" name="button" class="btnB">在线咨询</button>
		</div>
		<div style="height: 90px;"></div>
	</div>
</template>

<script>
import Vue from 'vue';
import {
  Swipe,
  SwipeItem,
  Toast
} from 'we-vue';
import wx from 'weixin-js-sdk';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
import SamllVideo from '@/components/samllVideoPlay.vue';
Vue.use(Swipe).use(SwipeItem);
export default {
  name: 'DocInfo',
  data() {
    return {
      doctorInfo: '', //医生信息
      hospInfo: '', //医院信息
      listPrjInfo: '', //擅长项目列表信息
      listInstInfo: '', //擅长仪器列表信息
      listDqpcInfo: '', //证书列表信息
      swipeContent: '', //轮播
      info: '', //案例，预约
      ImgNull: this.$store.state.ImgNull,
      videoUrl: '',
      isId: 0,
      aspectRatio: '16:9',
    };
  },
  components: {
    'Samll-Video': SamllVideo
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
    this.getConfig = function() {
      return new Promise((rel, ret) => {
        api.getWechatConfig({
          data: {
            url: window.location.href.split('#')[0]
          }
        }).then(res => {
          console.log(res, '----------res')
          let {
            appId,
            timestamp,
            nonceStr,
            signature
          } = res.data.config
          if (res.data.flag) {
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: appId, // 必填，公众号的唯一标识
              timestamp: timestamp, // 必填，生成签名的时间戳
              nonceStr: nonceStr, // 必填，生成签名的随机串
              signature: signature, // 必填，签名
              jsApiList: ['openLocation'] // 必填，需要使用的JS接口列表
            });
            rel('success')
          }
        })
      })
    }

  },
  mounted: function() {
    console.log('----', session.Lstorage.getItem('doctorId'));
    this.getConfig().then(res => {
      if (res == 'success') {
        api.getDoctorDetail({
          data: {
            openid: this.$store.state.uid,
            id: session.Lstorage.getItem('doctorId')
          }
        }).then(res => {
          res.data.listBanner = [{
              id: 1,
              isVideo: "0",
              cover: "http://tcjh.suitang1973.com/pic/cover1.jpg",
              url: "http://img.tukuppt.com/video_show/2269348/00/02/23/5b52ff923e41e.mp4",
              sourceid: '1',
              redirectType: '0',
              //0医生 1仪器 2商品 3项目
            },
            {
              id: 2,
              isVideo: "1",
              cover: "http://tcjh.suitang1973.com/pic/cover1.jpg",
              url: "http://img.tukuppt.com/video_show/2269348/00/02/23/5b52ff923e41e.mp4",
              sourceid: '1',
              redirectType: '0',
            },
          ]
          if (res.data.flag) {
            console.log('医生详情请求数据', res.data);
            this.doctorInfo = res.data.doctor;
            this.hospInfo = res.data.hosp;
            this.listPrjInfo = res.data.listPrj;
            this.listInstInfo = res.data.listInst;
            this.listDqpcInfo = res.data.listDqpc;
            this.swipeContent = res.data.listBanner;
            this.info = res.data; //预约数 案例数
          } else {
            Toast.text({
              duration: 1000,
              message: res.data.msg
            });
          }
        });
      }
    })
  },
  methods: {
    goMap: function(res, name, address) {
      let lat = res.split(',')[0],
        lon = res.split(',')[1];
      // 查看地图
      wx.openLocation({
        latitude: lat, // 纬度，浮点数，范围为90 ~ -90
        longitude: lon, // 经度，浮点数，范围为180 ~ -180。
        name: name, // 位置名
        address: address, // 地址详情说明
        scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      });
    },
    goDoctorCase: function() {
      // 跳转医生案例页面并将医生id缓存
      session.Lstorage.setItem('caseId', session.Lstorage.getItem('doctorId'));
      this.$router.push({
        name: 'doctorCase'
      });
    },
    goReserve: function() {
      console.log('点击了');
      this.$router.push({
        name: 'reserve',
        query: {
          ReserveId: session.Lstorage.getItem('doctorId')
        }
      });
    },
    isIdFun: function(e) {
      this.isId = 1;
      this.videoUrl = e
    },
    surt: function(e) {
      this.isId = e
    },
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/DocInfo.scss';
@import '@/assets/css/doctorList.scss';
</style>
