<!-- 充值 -->
<template>
<div class="all">
  <div class="top">
    <div class="top-con">
      <p>总金额（元）</p>
    </div>
    <p>{{info.cashBal}}</p>
  </div>
  <div class="list">
    <p>请选择充值金额</p>
    <div class="allList">
      <p v-for="(item,key,index) in listChargeInfo" :key='key' :class="bankInfo==item.bank?'colorA':''" @click="selectBank(item.bank)">{{item.bank}}元</p>
    </div>
  </div>
  <div class="recharge">
    <div class="recharge-title">
      <p>充值规则</p>
    </div>
    <div class="textarea" v-html="info.chargeRule"></div>
  </div>
  <div class="button" @click="submit">
    <button>确定充值</button>
  </div>
  <!-- 充值成功 -->
  <Tan-Chuang v-if="ifbank" @HideTanChuang="clickDetermine" :data="this.$options.name">
    <div class="slotImg">
      <img src="@/assets/images/icon/success.png" />
    </div>
    <p class="slotP">恭喜你，充值成功</p>
    <div class="slotDiv">
      <p>获得积分商城支付可抵扣</p>
    </div>
  </Tan-Chuang>
  <!-- 充值成功 END-->
</div>
</template>

<script>
import * as api from '@/assets/js/api';
import {
  Toast
} from 'we-vue';
import * as session from '@/assets/js/session';
import TanChuang from '@/components/tanChuang';
export default {
  name: 'Recharge',
  data() {
    return {
      info: '',
      listChargeInfo: '',
      bankInfo: 0,
      ifbank: false
    };
  },
  components: {
    TanChuang
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
    api.goVipChargeList({
      data: {
        openid: this.$store.state.uid
      }
    }).then(res => {
      if (res.data.flag) {
        console.log('充值页面', res.data);
        this.info = res.data; //余额和富文本
        this.listChargeInfo = res.data.listCharge; //充值金额
      } else {
        Toast.text({
          duration: 1000,
          message: res.data.msg
        });
      }
    });
  },
  beforeMount: function() {
    let that = this;
    if (this.$store.state.prepay_id != null) {
      api.submitConfirmOrder({
        data: {
          prepay_id: this.$store.state.prepay_id
        }
      }).then(res => {
        if (res.data.flag) {
          // 已支付
          this.ifbank = true;
        } else {
          // 未支付
          this.$store.state.perpay_id = null;
        }
      })
    }
  },
  methods: {
    submit: function() {
      // 提交充值请求
      if (this.bankInfo == 0) {
        Toast.text({
          duration: 1000,
          message: '请选择充值金额'
        });
        return;
      }
      api.submitCharge({
        data: {
          openid: this.$store.state.uid || 'oYi8Av6WZm8rscL77fxDV8xWkBv0',
          money: this.bankInfo
        }
      }).then(res => {
        console.log('充值', res.data);
        if (res.data.flag) {
          this.$router.push({
            name: 'payment',
            query: {
              payId: res.data.prepay_id
            }
          });
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
      });
    },

    selectBank: function(res) {
      // 选择金额
      this.bankInfo = res;
    },
		clickDetermine:function(){
			this.ifbank = false
			console.log('--------abc');
		},
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/Recharge.scss';
</style>
