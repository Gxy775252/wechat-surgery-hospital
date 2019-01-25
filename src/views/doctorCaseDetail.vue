<!-- 医生案例详情 -->
<template>
<div>
  <div class="userBox">
    <div class="userImg"><img :src="caseInfo.headimg" /></div>
    <div class="userFont">
      <p class="userName"></p>
      <p class="userTitle">项目名称：abc</p>
    </div>
  </div>
  <div class="lineBox">
    <div class="lineImg"><img src="../assets/images/icon/level.jpg" /></div>
    <p>项目医生</p>
  </div>
  <div class="doctorBox">
    <div class="doctorImgName">
      <div class="doctorImg"><img :src="ImgNull" /></div>
      <div class="doctorFont">
        <p class="doctorName">医生</p>
        <p class="doctorTitle">医生</p>
        <p class="doctorAdd">所在门店所在门店 | </p>
      </div>
    </div>
    <div class="doctorHorn"></div>
  </div>
  <div class="diary">
    <div class="diaryLeft">
      <img src="@/assets/images/icon/level.jpg" />
      <p>案例详情</p>
    </div>
  </div>
  <div class="white">
    <div v-html=""></div>
  </div>
  <div style="height: 3rem;"></div>
</div>
</template>

<script>
import {
  Toast
} from 'we-vue';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
export default {
  data() {
    return {
      caseInfo: '',
      listResourceInfo: '',
      ImgNull: this.$store.state.ImgNull
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
    // api.goCaseDetail({
    //   data: {
    //     openid: this.$store.state.uid,
    //     // caseid:this.$route.query.caseId,
    //     caseid: 1,
    //   }
    // }).then(res => {
    //   if (res.data.flag) {
    //     console.log('美丽日记详情数据', res.data);
    //     this.caseInfo = res.data.case;
    //     this.listResourceInfo = res.data.listResource;
    //   } else {
    //     Toast.text({
    //       duration: 1000,
    //       message: res.data.msg
    //     });
    //   }
    // });
  }
};
</script>

<style scoped="scoped" lang="scss">
@import '@/assets/css/doctorCaseDetail.scss';
@import '@/assets/css/diaryDetails.scss';
</style>
