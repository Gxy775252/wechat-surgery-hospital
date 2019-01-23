<template>
<div>
  <div class="head">
    <div class="headimg">
      <img :src="vipinfo.headimg || ImgNull" />
    </div>
    <div class="headText">
      <p>{{vipinfo.name}}</p>
      <p>做过的项目：{{vipinfo.prjtList}}</p>
    </div>
  </div>
  <div class="box">
    <div class="diaryList" v-for='(item,key,index) in listYearinfo' :key='key'>
      <p class="yearFont">{{item.year}}年</p>
      <p class="yearFontA">Beautiful Diary</p>
      <div class="monthBox" v-for='(item2,key,index) in item.listDiary' :key='key'>
        <div class="month">
          <div class="monthImg"><img src="@/assets/images/icon/level.jpg"></div>
          <p>{{item2.date10}}</p>
          <div class="function">
            <div class="function-list">
              <div class="bianji"></div>
              <p></p>
            </div>
            <div class="function-list">
              <div class="chakan">
                <img src="../assets/images/icon/delSmall.png" />
              </div>
              <p style="color: #008e83;" @click="onDelete(item2.id)">删除</p>
            </div>
          </div>
        </div>
        <div class="listContent" @click="godetails">
          <div class="contentBox">
            <div v-for='(item3,key,index) in item2.listVideo' :key='key'>
              <img :src="item3.cover || ImgNull" />
            </div>
          </div>
          <div class="listFont">
            <p><span>[{{item2.prjName}}-第{{item2.dayIndex}}天]</span>{{item2.content}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div style="height: 6rem;"></div>
  <div class="buttonA" @click="goUpdayend(1)">
    <button>上传美丽日记</button>
  </div>
</div>
</template>
<script>
import {
  Toast,
  Dialog
} from 'we-vue';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
export default {
  inject: ['reload'],
  data() {
    return {
      docId: '',
      vipinfo: '',
      listYearinfo: '',
      listDiaryinfo: '',
      ImgNull: this.$store.state.ImgNull,
      defaultProps1: {
        children: 'children',
        label: 'comName'
      }
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
  },
  mounted: function() {
    this.docId = this.$route.query.docId;
    api.goDoctorVipDiaryList({
      data: {
        openid: this.$store.state.uid,
        vipid: this.docId
      }
    }).then(res => {
      if (res.data.flag) {
        console.log('医生用户美丽日记', res.data);
        this.vipinfo = res.data.vip;
        this.listYearinfo = res.data.listYear;
        this.listDiaryinfo = res.data.listDiary;
      } else {
        Toast.text({
          duration: 1000,
          message: res.data.msg
        });
      }
    });
  },
  methods: {
    goUpdayend: function(res) {
      this.$router.push({
        name: 'stationingUpload',
        params: {
          id: this.id
        }
      });
    },
    godetails: function() {
      this.$router.push({
        name: 'stationingBeautyDiaryDetail'
      });
    },
    onDelete: function(res) {
      let that = this;
      Dialog.confirm({
          title: '确认删除吗？',
          skin: 'ios',
          showCancelButton: true
        })
        .then(() => {
          api.delVipDiary({
            data: {
              openid: this.$store.state.uid,
              diaryid: res
            }
          }).then(res => {
            if (res.data.flag) {
              console.log('删除', res.data);
              Toast.text({
                duration: 1000,
                message: '删除成功',
              });
              that.reload();
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
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineDiaryList.scss';
@import '@/assets/css/seeBeautyDiary.scss';
</style>
