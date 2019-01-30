<template>
<div class="all">
  <div class="payment">
    <div class="successIconImg">
      <img src="@/assets/images/icon/successReserve.png" />
    </div>
    <p class="successTitle">预约成功!</p>
  </div>
  <div class="xian"></div>
  <div class="ReserveInform">
    <div class="InformTop">
      您已预约
      <p>{{date}} {{Time}}</p>
      的
      <p>{{subjectsName}}</p>
      项目
    </div>
    <div class="InformCenter">
      预约二维码已生成，到店后向店员展示核销
    </div>
    <div class="InformBottom">
      提前一天取消预约可退款，当天不可退款
    </div>
  </div>
  <div class="successOperation">
    <button @click='goMine'>去个人中心</button>
    <button @click="returnIndex">返回首页</button>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      date: '',
      Time: '',
      subjectsName: '',
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
  },
  mounted: function() {
    this.date = this.$route.query.subDate;
    this.Time = this.$route.query.subPeriod;
    this.subjectsName = this.$route.query.subjectsName;
  },
  methods: {
    goMine: function() {
      this.$router.push({
        name: 'mine'
      });
    },
    returnIndex: function() {
      this.$router.push({
        name: 'index'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/successReserve.scss';
</style>
