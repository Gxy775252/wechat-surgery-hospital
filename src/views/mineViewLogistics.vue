<template>
<div class="all">
  <div class="top">
    <div class="topImg">
      <img src="../assets/images/icon/wuping.png" />
    </div>
    <div class="topText">
      <p class="text-top">{{orderInfo.products}}件商品</p>
      <p class="text-bottom">快递：{{orderInfo.logCode}}</p>
      <p class="text-bottom">快递单号：{{orderInfo.logNo}}</p>
    </div>
  </div>
  <div class="box">
    <div class="diaryList">
      <p class="yearFont">物流详情</p>
      <p class="yearFontA">Logistics details</p>
      <div class="monthBox" v-for='(item,key,index) in traceListInfo' :key='key'>
        <div class="month">
          <div class="monthImg"><img src="@/assets/images/icon/level.jpg"></div>
          <p>您的宝贝正在派件</p>
        </div>
        <div class="con">
          <p>{{item.AcceptStation}}</p>
        </div>
        <div class="con">
          <p>{{item.AcceptTime}}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="seeI">
    <img src="@/assets/images/icon/kanjian.png" />
  </div>
</div>
</template>

<script>
import * as api from '@/assets/js/api';
import {
  Toast,
} from 'we-vue';
import * as session from '@/assets/js/session';
export default {
  data() {
    return {
      orderInfo: '',
      traceListInfo: ''
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
  },
  mounted: function() {
    api.goVipGoodsOrderLogistics({
      data: {
        openid: this.$store.state.uid,
        id: this.$route.query.wuLiuId
      }
    }).then(res => {
      if (res.data.flag) {
        console.log('试卷和但是', res.data);
        this.orderInfo = res.data.order;
        this.traceListInfo = res.data.traceList;
      } else {
        Toast.text({
          duration: 1000,
          message: res.data.msg
        });
      }
    });
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineViewLogistics.scss';
</style>
