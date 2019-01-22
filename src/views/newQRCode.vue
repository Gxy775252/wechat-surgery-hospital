<!-- 拉新二维码 -->
<template>
<div class="all">
  <div class="textarea">
    <div class="textarea-con">
      <div class="textarea-text" v-html="shareContent"></div>
    </div>
    <div style="height:calc(1.8rem/2);background: #f7f7f7;"></div>
    <div class="code">
      <div class="code-img">
        <img :src="barcode || ImgNull" />
      </div>
      <p>点击右上角分享页面，分享给朋友。</p>
      <p>好友通过二维码注册成功后，您可获得积分奖励。</p>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import * as api from '@/assets/js/api';
import {
  Toast
} from 'we-vue';
export default {
  name: 'newQRCode',
  data() {
    return {
      ImgNull: this.$store.state.ImgNull,
      barcode: '',
      shareContent: '',
      publicFunction: '',
    };
  },
  created: function() {
    let that = this;
    this.$store.commit('showBottomNav', {
      isShow: false
    });

  },
  mounted: function() {
    let that = this;
    this.publicFunction = function() {
      let {
        uid
      } = that.$store.state
      api.goVipShare({
        data: {
          openid: uid,
          shareOpenid: uid || 'test',
          // 待修改  取消test
        }
      }).then(res => {
        console.log(res.data);
        if (res.data.flag) {
          that.barcode = res.data.barcode;
          that.shareContent = res.data.shareContent;
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
      });
    }
    this.publicFunction();
  }
};
</script>

<style scoped="scoped" lang="scss">
@import '@/assets/css/newQRCode.scss';
</style>
