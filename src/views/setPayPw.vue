<template>
<div class="background">
  <div class="pwdFont">设置6位数字赠送积分支付密码</div>
  <div class="pwd-box">
    <input maxlength="6" type="number" class="pwd-input" id="pwd-input" v-model="inputContent" oninput="if(value.length>6)value=value.slice(0,6)">
    <div class="fake-box">
      <input type="password" readonly="">
      <input type="password" readonly="">
      <input type="password" readonly="">
      <input type="password" readonly="">
      <input type="password" readonly="">
      <input type="password" readonly="">
    </div>
  </div>
  <div class="fontColor">积分赠送密码不能是重复、连续的数字</div>
  <button class="button" @click="buttonFrom">确定</button>
</div>
</template>

<script>
import * as api from '@/assets/js/api';
import {
  Toast
} from 'we-vue';
export default {
  data() {
    return {
      inputContent: ''
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
  },
  watch: {
    inputContent: function() {
      var $input = document.querySelectorAll('.fake-box input');
      var pwd = this.inputContent.replace(/\s+/g, '');
      this.inputContent = pwd;
      if (pwd.length <= 6) {
        for (var i = 0; i < pwd.length; i++) {
          $input[i].value = pwd[i];
        }
        for (var a = 0; a < $input.length; a++) {
          if (a >= pwd.length) {
            $input[a].value = '';
          }
        }
      }
    }
  },
  methods: {
    buttonFrom: function() {
      var pwds = this.inputContent;
      if (pwds.length < 6) {
        Toast.text({
          duration: 1000,
          message: '请填写完整密码'
        });
      } else if (this.pwdFun(pwds) == 1) {
        this.inputContent = ''
      } else {
        console.log('掉接口传值' + this.inputContent)
        api.setGiftPwd({
          data: {
            openid: this.$store.state.uid,
            password: this.inputContent,
          }
        }).then(res => {
          if (res.data.flag) {
            console.log('个人中心', res.data);
            Toast.text({
              duration: 1000,
              message: '设置成功',
            });
            setTimeout(function() {
              history.go(-1);
            }, 1500);
          } else {
            Toast.text({
              duration: 1000,
              message: res.data.msg
            });
          }
        });
      }
    },
    // 判断密码是否是数字，是否有连续或者倒叙的方法
    pwdFun: function(pwds) {
      var reg = /^[0-9]+$/;
      if (reg.test(pwds)) {
        var add = 1;
        var reduce = 1;
        var repeat = 1;
        for (var i = 0; i < pwds.length; i++) {
          var one = parseInt(pwds[(i)]) + 1;
          var two = parseInt(pwds[(i + 1)]);
          var three = parseInt(pwds[(i)]) - 1;
          var four = parseInt(pwds[(i + 1)]);
          var five = parseInt(pwds[(i)]);
          var six = parseInt(pwds[(i + 1)]);
          if (one == two) {
            add = add + 1;
            if (add >= 3) {
              Toast.text({
                duration: 1000,
                message: '密码格式不正确'
              });
              return 1;
            }
          } else {
            add = 1;
          }
          if (three == four) {
            reduce = reduce + 1;
            if (reduce >= 3) {
              Toast.text({
                duration: 1000,
                message: '密码格式不正确'
              });
              return 1;
            }
          } else {
            reduce = 1;
          }
          if (five == six) {
            repeat = repeat + 1;
            if (repeat >= 3) {
              Toast.text({
                duration: 1000,
                message: '密码格式不正确'
              });
              return 1;
            }
          } else {
            repeat = 1;
          }
        }
      } else {
        Toast.text({
          duration: 1000,
          message: '密码格式不正确'
        });
        return 1;
      }
    },

  }
};
</script>

<style lang="scss">
@import '@/assets/css/setPayPwd.scss';
</style>
