<template>
<div class="all">
  <div class="diary">
    <div class="diaryLeft">
      <img src="@/assets/images/icon/level.jpg" />
      <p>门店时间信息</p>
    </div>
  </div>
  <div class="Allselect">
    <div class="Allselect-stores">
      <p>Stores</p>
      <div class="Allselect-list" @click="prickPro()">
        <div class="listCon" :class="listConA1">
          {{stores.name}}
        </div>
        <div class="listImg">
          <img src="@/assets/images/icon/mineHore.png" />
        </div>
      </div>
      <span></span>
    </div>
    <div class="Allselect-stores Second">
      <p>Subjects</p>
      <div class="Allselect-list" @click="prickject()">
        <div class="listCon" :class="listConA2">
          {{subjects.name}}
        </div>
        <div class="listImg">
          <img src="@/assets/images/icon/mineHore.png" />
        </div>
      </div>
      <span></span>
      <div v-show="ifSee" @click='goDetail2'>查看项目详情</div>
    </div>
    <div class="Allselect-stores Third">
      <p>Doctors</p>
      <div class="Allselect-list" @click="doctorJECt()">
        <div class="listCon" :class="listConA3">
          {{doctor.name}}
        </div>
        <div class="listImg">
          <img src="@/assets/images/icon/mineHore.png" />
        </div>
      </div>
      <span></span>
    </div>
  </div>
  <div class="diary">
    <div class="diaryLeft">
      <img src="@/assets/images/icon/level.jpg" />
      <p>预约时间</p>
    </div>
  </div>
  <div class="Allselect" style="padding: calc(3rem / 2) 0;">
    <div class="Allselect-top">
      <!-- active -->
      <div v-for="(item,key,index) in listDateInfo" :key='key' @click="clickList(item.date)" :class="item.date===date1? 'listA list':'list'">
        <p>星期{{item.dow}}</p>
        <p>{{item.date}}</p>
      </div>
    </div>
    <div class="Allselect-bottom">
      <p v-for="(item,key,index) in listPeriodInfo" :key='key' :class="item.id==perId?'Bottom-P':''" @click="clickPeriod(item.id)">{{item.period}}</p>
    </div>
  </div>
  <div class="diary">
    <div class="diaryLeft">
      <img src="@/assets/images/icon/level.jpg" />
      <p>预约信息</p>
    </div>
  </div>
  <div class="Allselect">
    <div class="Allselect-stores">
      <p>Name</p>
      <input placeholder="联系人姓名" type="text" v-model="nameInput" />
      <span></span>
    </div>
    <div class="Allselect-stores Second">
      <p>Telephone</p>
      <input placeholder="填写联系人电话" v-model="phoneInput" maxlength="11" type="number" />
      <span></span>
    </div>
    <div class="Allselect-stores Second">
      <p>Note</p>
      <input placeholder="填写备注" v-model="briefInput" type="text" />
      <span></span>
    </div>
  </div>
  <div class="diary">
    <div class="diaryLeft">
      <img src="@/assets/images/icon/level.jpg" />
      <p>支付方式</p>
    </div>
  </div>
  <div class="payName">
    <div class="payWeChat" v-for="item in dataPay" :key="item.id" @click="selectPay(item.id)">
      <div class="imgWeChat">
        <img :src="item.img" />
        <p>{{item.payFont}}</p>
      </div>
      <div class="selectImg">
        <img v-if="!item.isshow" src="../assets/images/icon/sele.png" />
        <img v-if="item.isshow" src="../assets/images/icon/select.png" />
      </div>
    </div>
  </div>
  <!-- <div class="integralBox">
    <div class="integralFont">
      <p class="uses">使用积分</p>
      <p class="numberInt">（1000积分共抵扣0000元）</p>
    </div>
    <img :src="shutOpent" @click="shutClick" />
  </div> -->
  <div class="diary">
    <div class="diaryLeft">
      <img src="@/assets/images/icon/level.jpg" />
      <p>预约费用</p>
    </div>
  </div>
  <div class="price">
    <div>
      <p>￥ {{calprice}}</p>
      <p>注：提前一天取消预约可退款，当天不可退款</p>
    </div>
  </div>
  <div class="submit" @click="submit">
    <button>立即预约</button>
  </div>
  <div style="height:3rem;"></div>
  <!-- 选择门店 -->
  <wv-picker :visible.sync="fruitPickerShow" :columns="fruitColumns" value-key="name" @confirm="confirmPerson" />
  <!-- 选择项目 -->
  <wv-picker :visible.sync="fruitPickerShow2" :columns="fruitColumns2" value-key="name" @confirm="confirmPerson2" />
  <!-- 选择医生 -->
  <wv-picker :visible.sync="fruitPickerShow3" :columns="fruitColumns3" value-key="name" @confirm="confirmPerson3" />
</div>
</template>

<script>
import Vue from 'vue';
import * as api from '@/assets/js/api';
import {
  Toast,
  Picker,
  Group,
  Dialog,
  Cell
} from 'we-vue';

Vue.use(Picker).use(Group).use(Cell);
export default {
  data() {
    return {
      storesId: 0, //存储门店id
      subjectsId: 0, //存储项目id
      docId: 0, //存储医生id
      nameInput: '',
      phoneInput: '',
      briefInput: '',
      listDateInfo: '', //日期段，明天起的30天
      listPeriodInfo: '', //时间段
      perId: 0, //选中时间段内容
      pubicFunction: '', //请求数据方法
      ifSee: false, //是否显示查看项目详情
      calprice: 0, //价钱
      date1: '', //选择日期
      stores: {
        name: '选择门店(必填)'
      },
      listConA1: '', //改变颜色
      listConA2: '', //改变颜色
      listConA3: '', //改变颜色
      fruitPickerShow: false,
      fruitColumns: [{
        values: []
      }],
      subjects: {
        name: '选择项目(必填)'
      },
      fruitPickerShow2: false,
      fruitColumns2: [{
        values: []
      }],
      doctor: {
        name: '选择医生(选填)'
      },
      fruitPickerShow3: false,
      fruitColumns3: [{
        values: []
      }],
      shutOpent: require('../assets/images/icon/shut.png'),
      // shutOpentId: 1, //1=不使用积分2=使用积分
      dataPayId: 2, //2=微信支付1=余额支付
      dataPay: [{
          id: 2,
          img: require('../assets/images/icon/wechat.png'),
          payFont: '微信支付',
          isshow: true
        },
        {
          id: 1,
          img: require('../assets/images/icon/wallet.png'),
          payFont: '余额支付',
          isshow: false
        }
      ],
    };
  },
  created: function() {
    let that = this;
    this.$store.commit('showBottomNav', {
      isShow: true
    });
    this.pubicFunction = function(doctorid) {
      api.goAppointment({
        data: {
          openid: that.$store.state.uid,
          doctorid: doctorid,
        }
      }).then(res => {
        if (res.data.flag) {
          console.log('--', res.data);
          for (let i in res.data.listDate) {
            res.data.listDate[i].date = res.data.listDate[i].date.substring(5, res.data.listDate[i].date.leng);
            switch (res.data.listDate[i].dow) {
              case 1:
                res.data.listDate[i].dow = "日";
                break;
              case 2:
                res.data.listDate[i].dow = "一";
                break;
              case 3:
                res.data.listDate[i].dow = "二";
                break;
              case 4:
                res.data.listDate[i].dow = "三";
                break;
              case 5:
                res.data.listDate[i].dow = "四";
                break;
              case 6:
                res.data.listDate[i].dow = "五";
                break;
              case 7:
                res.data.listDate[i].dow = "六";
                break;
            }
          }
          that.listDateInfo = res.data.listDate;
          that.listPeriodInfo = res.data.listPeriod;
          that.fruitColumns[0].values = res.data.listHosp;
          that.calprice = res.data.cashBal;
          if (doctorid == '') {
            that.fruitColumns2[0].values = '';
            that.fruitColumns3[0].values = '';
          } else {
            that.listConA1 = 'listConA';
            that.listConA3 = 'listConA';
            that.stores.name = res.data.listHosp[0].name;
            that.storesId = res.data.listHosp[0].id;
            that.fruitColumns2[0].values = res.data.listProject;
            for (let i in res.data.listDoctor) {
              if (res.data.listDoctor[i].id == doctorid) {
                that.doctor.name = res.data.listDoctor[i].name
                that.docId = res.data.listDoctor[i].id;
              }
            }
          }
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
      })
    };

    api.ifVipExisted({
      data: {
        openid: that.$store.state.uid,
      }
    }).then(res => {
      if (res.data.flag) {
        if (this.$route.query.ReserveId != undefined) {
          this.pubicFunction(this.$route.query.ReserveId);
        } else {
          this.pubicFunction('');
        }
      } else {
        this.$router.push({
          name: 'register'
        });
      }
    })
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
          Toast.text({
            duration: 1000,
            message: '支付成功'
          })
          setTimeout(function() {
            this.$router.push({
              name: 'successfulPayment'
            });
          }, 1500)
        } else {
          // 未支付
          Toast.text({
            duration: 1000,
            message: '未支付,'
          })
        }
      })
    }
  },
  methods: {
    submit: function(res) {
      let that = this;
      let isPhone = /^1(3|4|5|7|8)\d{9}$/;
      if (this.stores.name == '选择门店(必填)') {
        Toast.text({
          duration: 1000,
          message: '请选择门店'
        });
        return;
      }
      if (this.subjects.name == '选择项目(必填)') {
        Toast.text({
          duration: 1000,
          message: '请选择项目'
        });
        return;
      }
      if (this.nameInput == "") {
        Toast.text({
          duration: 1000,
          message: '预约人姓名不能为空'
        });
        return;
      }
      if (!isPhone.test(this.phoneInput)) {
        Toast.text({
          duration: 1000,
          message: '请输入正确格式的手机号'
        });
        return;
      }
      if (this.date1 == "" || this.perId == 0) {
        Toast.text({
          duration: 1000,
          message: '请选择时间段'
        });
        return;
      }
      // 提交内容
      let subDate, subDow, subPeriod;
      for (let i in that.listDateInfo) {
        if (that.listDateInfo[i].date === that.date1) {
          subDate = that.listDateInfo[i].date;
          subDow = that.listDateInfo[i].dow;
        }
      }
      for (let i in that.listPeriodInfo) {
        if (that.listPeriodInfo[i].id === that.perId) {
          subPeriod = that.listPeriodInfo[i].period;
        }
      }
      Dialog.confirm({
          title: '提示',
          message: '您预约的是' + subDate + ',星期' + subDow + ',' + subPeriod,
          skin: 'ios',
          showCancelButton: true
        })
        .then(() => {
          api.submitProjectOrder({
            data: {
              openid: this.$store.state.uid || 'oYi8Av6WZm8rscL77fxDV8xWkBv0',
              projectid: this.subjectsId,
              doctorid: this.docId,
              date10: subDate,
              period: subPeriod,
              name: this.nameInput,
              phone: this.phoneInput,
              memo: this.briefInput,
              payByVip: this.dataPayId,
            }
          }).then(res => {
            if (res.data.flag) {
              console.log('预约', res.data);
              if (res.data.finished == 1) {
                // 直接跳转
                this.$router.push({
                  name: 'successReserve',
                  query: {
                    subDate: subDate,
                    subPeriod: subPeriod,
                    subjectsName: that.subjects.name,
                  },
                });
              } else {
                this.$store.state.prepay_id = null;
                // 跳转页面
                this.$router.push({
                  name: 'payment',
                  query: {
                    payId: res.data.prepay_id
                  }
                });
                this.$store.state.prepay_id = res.data.prepay_id;

              }
            } else {
              Toast.text({
                duration: 1000,
                message: res.data.msg
              });
            }
          });
        })
        .catch(() => {});
    },
    selectPay: function(id) {
      this.dataPayId = id;
      for (var i = 0; i < this.dataPay.length; i++) {
        if (id == this.dataPay[i].id) {
          this.dataPay[i].isshow = true;
        } else {
          this.dataPay[i].isshow = false;
        }
      }
    },
    clickList: function(res) {
      // 选择日期
      this.date1 = res;
    },
    clickPeriod: function(res) {
      this.perId = res;
    },

    doctorJECt: function() {
      if (this.$route.query.ReserveId != undefined) {
        return;
      }
      this.fruitPickerShow3 = true;
    },
    confirmPerson3: function(picker) {
      if (picker.getValues()[0] == undefined) {
        this.fruitPickerShow3 = false;
        return;
      }
      this.docId = picker.getValues()[0].id;
      this.doctor = picker.getValues()[0];
      this.listConA3 = 'listConA';
    },
    prickject: function() {
      this.fruitPickerShow2 = true;
    },
    confirmPerson2: function(picker) {
      if (picker.getValues()[0] == undefined) {
        this.fruitPickerShow2 = false;
        return;
      }
      api.getProjectDoctorList({
        data: {
          openid: this.$store.state.uid,
          projectid: picker.getValues()[0].id
        }
      }).then(res => {
        if (res.data.flag) {
          this.fruitColumns3[0].values = res.data.listDoctor;
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
      });
      this.subjectsId = picker.getValues()[0].id;
      this.subjects = picker.getValues()[0];
      this.listConA2 = 'listConA';
      this.ifSee = true;
    },
    prickPro: function() {
      if (this.$route.query.ReserveId != undefined) {
        return;
      }
      this.fruitPickerShow = true;
    },
    confirmPerson: function(picker) {
      if (picker.getValues()[0] == undefined) {
        this.fruitPickerShow = false;
        return;
      }
      api.getHospitalProjectList({
        data: {
          openid: this.$store.state.uid,
          hospid: picker.getValues()[0].id
        }
      }).then(res => {
        if (res.data.flag) {
          console.log('xiangmu---', res.data);
          this.fruitColumns2[0].values = res.data.listProject;
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
      });
      this.storesId = picker.getValues()[0].id;
      this.stores = picker.getValues()[0];
      this.listConA1 = 'listConA';
    },
    goDetail2: function() {
      // 跳转项目详情
      this.$router.push({
        name: 'reserveDetail2',
        query: {
          detail2Id: this.subjectsId
        }
      });
    },
  },
};
</script>


<style scoped="scoped" lang="scss">
@import '@/assets/css/reserve.scss';
</style>
