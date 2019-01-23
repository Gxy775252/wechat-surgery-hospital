<template>
<div class="all">
  <div class="top" v-if='orderInfo.status==0'>
    <div class="top-left">
      <p>待支付</p>
      <p></p>
    </div>
    <div class="top-right">
      <img src="../assets/images/icon/daizhifu.png" />
    </div>
  </div>
  <div class="top" v-if='orderInfo.status==1'>
    <div class="top-left">
      <p>待发货</p>
      <p>您的快递正在仓库等待快递小哥，请耐心等待</p>
    </div>
    <div class="top-right" style='width:calc(6.8rem/2);height:calc(5.73rem/2);'>
      <img src="../assets/images/icon/daifahuo.png" />
    </div>
  </div>
  <div class="top" v-if='orderInfo.status==-3'>
    <div class="top-left">
      <p>已取消</p>
      <p></p>
    </div>
    <div class="top-right">
      <!-- <img src="../assets/images/icon/daizhifu.png" /> -->
    </div>
  </div>

  <div class="dizhi">
    <div>
      <p>收件人：{{orderInfo.postName}}</p>
      <p>电话：{{orderInfo.postPhone}}</p>
    </div>
    <p>地址：{{orderInfo.postAddress}}</p>
  </div>
  <div class="center" v-for="(item,key,index) in listDetailInfo" :key='key'>
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
  <div class="info">
    <p>订单信息</p>
    <div class="info-con">
      <p>商品金额</p>
      <p>￥ {{orderInfo.money}}</p>
    </div>
    <div class="info-con">
      <p>积分抵扣</p>
      <p>￥ {{orderInfo.score}}</p>
    </div>
    <div class="info-con" style="margin-top:20px;">
      <p>订单编号</p>
      <p>{{orderInfo.kdNo}}</p>
    </div>
    <div class="info-con">
      <p>提交时间</p>
      <p>{{orderInfo.createTime}}</p>
    </div>
  </div>
  <div class="seeI">
    <img src="@/assets/images/icon/kanjian.png" />
  </div>
  <div style="height:3rem;"></div>
  <div class="bottomOperation" v-if='orderInfo.status==0'>
    <div class="leftOperation">￥{{orderInfo.money}}</div>
    <div class="centerOperation" @click="closeOrder">取消订单</div>
    <div class="rightOperation">立即付款</div>
  </div>
  <div class="bottomOperation" v-if='orderInfo.status==1'>
    <div class="leftOperation">￥{{orderInfo.money}}</div>
    <div class="centerOperation" @click='seeWuLiu(orderInfo.id)'>查看物流</div>
    <div class="rightOperation" @click="returnMoney(orderInfo.id,orderInfo.money)">退货/退款</div>
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
  name: 'minePaymentOrder',
  inject: ['reload'],
  data() {
    return {
      ImgNull: this.$store.state.ImgNull,
      listDetailInfo: '',
      orderInfo: {},
      defaultProps1: {
        children: 'children',
        label: 'comName'
      },
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
  },
  mounted: function() {
    api.getVipGoodsOrderDetail({
      data: {
        openid: this.$store.state.uid,
        orderid: this.$route.query.orderid,
      }
    }).then(res => {
      if (res.data.flag) {
        console.log('商城订单', res.data);
        this.listDetailInfo = res.data.listDetail;
        this.orderInfo = res.data.order[0];
      } else {
        Toast.text({
          duration: 1000,
          message: res.data.msg
        });
      }
    });
  },
  methods: {
    seeWuLiu: function(res) {
      this.$router.push({
        name: 'mineViewLogistics',
        query: {
          wuLiuId: res
        }
      });
    },
    returnMoney: function(res, money) {
      // 退货退款
      session.Lstorage.setItem('returnMoney1', money);
      this.$router.push({
        name: 'returnGoodsChoice',
        query: {
          returnId: res
        }
      });
    },
    closeOrder: function() {
      //取消订单
      let that = this;
      Dialog.confirm({
          title: '提示',
          message: '是否取消',
          skin: 'ios',
          showCancelButton: true
        })
        .then(() => {
          api.cancelGoodsOrder({
            data: {
              openid: this.$store.state.uid,
              orderid: this.$route.query.orderid
            }
          }).then(res => {
            if (res.data.flag) {
              that.reload();
              Toast.text({
                duration: 1000,
                message: '取消成功'
              });
            } else {
              Toast.text({
                duration: 1000,
                message: res.data.msg
              });
            }
          });
        })
        .catch(() => {});
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/minePaymentOrder.scss';
</style>
