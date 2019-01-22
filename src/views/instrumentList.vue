<!-- 仪器列表 -->
<template>
<div class="all">
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
  <div class="listAll" v-for="(item,key,index) in dataList" :key='key'>
    <div class="insList" @click="goDetail(item.id)">
      <div class="insImg">
        <img :src="item.coverResource.cover  || ImgNull" />
      </div>
      <div class="insInfo">
        <p>{{item.name}}</p>
        <p>{{item.brief}}</p>
      </div>
    </div>
    <div style="clear: both;"></div>
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
import {
  Authorization,
  parseUrl
} from '@/assets/js/utils';
import wx from 'weixin-js-sdk';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
Vue.use(Swipe).use(SwipeItem);
export default {
  name: 'instrumentList',
  data() {
    return {
      dataList: '',
      swipeContent: '',
      ImgNull: this.$store.state.ImgNull
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });

    api.getInstrumentList({
      data: {
        openid: this.$store.state.uid
      }
    }).then(res => {
      if (res.data.flag) {
        console.log('美丽日记', res.data);
        this.dataList = res.data.listInst; //仪器列表
        this.swipeContent = res.data.listBanner; //轮播列表
      } else {
        Toast.text({
          duration: 1000,
          message: res.data.msg
        });
      }
    });
  },
  methods: {
    goDetail: function(res) {
      // 跳转到仪器详情并将仪器id缓存
      session.Lstorage.setItem('instr', res);
      // 跳转到皮肤页面
      this.$router.push({
        name: 'instrumentDetail'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/instrumentList.scss';
@import '@/assets/css/doctorList.scss';
</style>
