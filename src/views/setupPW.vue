<template>
<div class="all">
  <div class="list">
    <p>旧密码</p>
    <input placeholder="请输入旧密码" maxlength="6" v-model="pwd" @blur.prevent="pwdChange" type="password" />
  </div>
  <div class="list">
    <p>新密码</p>
    <input placeholder="请输入新密码" maxlength="6" @blur.prevent="newPwdChange" v-model="newPwd" type="password" />
  </div>
  <div class="list">
    <p>确认密码</p>
    <input placeholder="请确认新密码" maxlength="6" v-model="repeatPwd" @blur.prevent="repeatPwdChange" type="password" />
  </div>
  <div class="info">
    <p>积分赠送密码不能是重复，连续的数字，最少6个数字</p>
  </div>
  <div class="buttonA">
    <button @click="fromContent">确定</button>
  </div>
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
      pwd: '',
      newPwd: "",
      repeatPwd: ""
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
  },
  methods: {
    pwdChange: function() {
      var pwds = this.pwd;
      if (this.pwdFun(pwds) == 1) {
        this.pwd = ''
      }
    },
    newPwdChange: function() {
      var pwds = this.newPwd;
      if (this.pwdFun(pwds) == 1) {
        this.newPwd = ''
      } else if (this.pwd == this.newPwd) {
        Toast.text({
          duration: 1000,
          message: '新密码不能与旧密码一致'
        });
        this.newPwd = ''
      }
    },

    repeatPwdChange: function() {
      var pwds = this.repeatPwd;
      if (this.pwdFun(pwds) == 1) {
        this.repeatPwd = ''
      } else if (this.repeatPwd != this.newPwd) {
        Toast.text({
          duration: 1000,
          message: '两次输入密码不一致'
        });
        this.repeatPwd = ''
      }
    },
    // 提交方法
    fromContent: function() {
      if (this.pwd == '') {
        Toast.text({
          duration: 1000,
          message: '旧密码不能为空'
        });
      } else if (this.newPwd == '') {
        Toast.text({
          duration: 1000,
          message: '新密码不能为空'
        });
      } else if (this.repeatPwd == "") {
        Toast.text({
          duration: 1000,
          message: '重复密码不能为空'
        });
      } else {
        api.getResetGiftPwd({
          data: {
            oldPwd: this.pwd,
            newPwd: this.newPwd,
            openid: this.$store.state.uid
          }
        }).then(res => {
          if (res.data.flag) {
            Toast.text({
              duration: 1000,
              message: '修改成功',
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
        })
      }
    },
    // 判断密码是否是数字，是否有连续或者倒叙的方法
    pwdFun: function(pwds) {
      var reg = /^[0-9]+$/;
      if (reg.test(this.pwd)) {
        var add = 1;
        var reduce = 1;
        for (var i = 0; i < pwds.length; i++) {
          var one = parseInt(pwds[(i)]) + 1;
          var two = parseInt(pwds[(i + 1)]);
          var three = parseInt(pwds[(i)]) - 1;
          var four = parseInt(pwds[(i + 1)]);
          if (one == two) {
            add = add + 1;
            if (add >= 3) {
              Toast.text({
                duration: 1000,
                message: '密码格式不正常'
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
                message: '密码格式不正常'
              });
              return 1;
            }
          } else {
            reduce = 1;
          }
        }
      } else {
        Toast.text({
          duration: 1000,
          message: '密码格式不正常'
        });
        return 1;
      }


    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/setupPW.scss';
</style>
