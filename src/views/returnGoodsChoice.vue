<!-- 退货页面 -->
<template>
<div class="all">
  <div class="center" v-for='(item,key,index) in listDetailInfo' :key='key'>
    <div class="center-left">
      <div class="leftImg">
        <img :src="item.coverResource!=null?item.coverResource.cover:ImgNull" />
      </div>
      <div class="leftText">
        <p>{{item.goodsName}}</p>
        <p>规格：{{item.sizeName}}</p>
      </div>
    </div>
    <div class="center-right">
      <p>￥ {{item.price}}</p>
      <p>x{{item.number}}</p>
    </div>
  </div>
  <div class="list" @click="refundOrder(1)" style='margin-top: calc(2rem/2);'>
    <div class="list-text">
      <p>仅退款</p>
      <p>未收到货</p>
    </div>
    <div class="list-img">
      <img src="../assets/images/icon/mineHore.png" />
    </div>
  </div>
  <div class="list" @click="refundOrder(2)">
    <div class="list-text">
      <p>退货/退款</p>
      <p>已收到货，需要退回已收到的货物</p>
    </div>
    <div class="list-img">
      <img src="../assets/images/icon/mineHore.png" />
    </div>
  </div>
</div>
</template>

<script>
import * as api from '@/assets/js/api';
import {
  Toast,
  Dialog
} from 'we-vue';
import * as session from '@/assets/js/session';
export default {
  name: 'returnGoodsChoice',
  data() {
    return {
      listDetailInfo: '',
      ImgNull: this.$store.state.ImgNull,
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
    // 待修改  缺少上一个页面的数据
    console.log('数据啊----', this.$route.query.returnId);
  },
  mounted: function() {
    api.goOrderComment({
      data: {
        openid: this.$store.state.uid,
        orderid: this.$route.query.returnId
      }
    }).then(res => {
      if (res.data.flag) {
        console.log('aaaaaaa', res.data);
        this.listDetailInfo = res.data.listDetail;
      } else {
        Toast.text({
          duration: 1000,
          message: res.data.msg
        });
      }
    });
  },
  methods: {
    refundOrder: function(res) {
      this.$router.push({
        name: 'returnGoodsApply',
        query: {
          refundOrderID: res
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/returnGoodsChoice.scss';
</style>
