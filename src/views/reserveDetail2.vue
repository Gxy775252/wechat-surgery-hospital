<!-- 医生详情 -->
<template lang="html">
	<div class="content">
		<div class="header">
			<div class="swiper">
				<div class="swiperImg">
					<wv-swipe :autoplay="4000" class="swiperImg">
						<wv-swipe-item v-for="(item, key, index) in swipeContent" :key="key">
							<img :src="item.cover || ImgNull" class="imgA" />
							<div v-if="item.isVideo == 1" class="playImg">
								<img src="@/assets/images/icon/playImg.png" />
							</div>
						</wv-swipe-item>
					</wv-swipe>
				</div>
			</div>
    </div>
    <div class='doctor'>
      <div class="doctorBottom">
        <div>
          <p>预约项目</p>
          <p>{{project.name}}</p>
        </div>
        <div>
          <p>项目简介</p>
          <p>{{project.brief}}</p>
        </div>
      </div>
    </div>
    <div class="diary">
      <div class="diaryLeft">
        <img src="@/assets/images/icon/level.jpg" />
        <p>术前注意事项</p>
      </div>
    </div>
    <div class="white">
      <div v-html="project.preInfo"></div>
    </div>
    <div class="diary">
      <div class="diaryLeft">
        <img src="@/assets/images/icon/level.jpg" />
        <p>术后注意事项</p>
      </div>
    </div>
    <div class="white">
      <div v-html="project.postInfo"></div>
    </div>
    <div class="diary">
      <div class="diaryLeft">
        <img src="@/assets/images/icon/level.jpg" />
        <p>更多信息</p>
      </div>
    </div>
    <div class="white">
      <div v-html="project.content"></div>
    </div>
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

Vue.use(Swipe).use(SwipeItem);
export default {

  data() {
    return {
      swipeContent: '',
      project: '',
      ImgNull: this.$store.state.ImgNull
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
    console.log('aaa', this.$route.query.detail2Id);
  },
  mounted: function() {
    let that = this;
    api.goProjectDetail({
      data: {
        openid: this.$store.state.uid,
        projectid: this.$route.query.detail2Id,
      }
    }).then(res => {
      if (res.data.flag) {
        console.log('详情', res.data);
        that.swipeContent = res.data.listBanner;
        that.project = res.data.project[0];
      } else {
        Toast.text({
          duration: 1000,
          message: res.data.msg
        });
      }
    });
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/DocInfo.scss';
@import '@/assets/css/doctorList.scss';
.doctor {
    width: 100%;
    margin: calc(2.46rem / 2) 0;
    background: #fff;
    .doctorBottom {
        > div {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            > p:first-child {
                margin: 0 calc(2.66rem / 2) 0 calc(2.66rem / 2);
                font-size: calc(1.6rem / 2);
                color: #666;
            }
            > p:last-child {
                font-size: calc(1.46rem / 2);
                color: #333;
                margin-left: 5px;
            }
        }
    }
}
.diary {
    width: 100%;
    height: calc(3.86rem / 2);
    background-color: #f7f7f7;
    display: flex;
    align-items: center;
    color: #000;
    > div {
        display: flex;
        align-items: center;
    }
    .diaryLeft {
        font-size: calc(2rem / 2);
        > img {
            width: calc(1.4rem / 2);
            height: calc(0.26rem / 2);
            margin: 0 0.66rem;
        }
    }
}
.white {
    width: 100%;
    background: #fff;
    > div {
        width: 85%;
        padding: 10px 0;
        margin: auto;
        font-size: calc(1.33rem / 2);
        color: #666;
    }
}
</style>
