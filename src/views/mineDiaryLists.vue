<template>
<div class="all">
  <div class="diaryList">
    <div class="list">
      <p>日期</p>
      <div class="list-right" @click="openPicker('picker')" ref="birthday">
        <p :class="(birthday!='选择日期') || (diaryInfo.date10!='')?'colorA':''">{{diaryInfo.date10!=''&& birthday=='选择日期'?diaryInfo.date10:birthday}}</p>
        <div class="right-div">
          <img src="@/assets/images/icon/mineHore.png" />
        </div>
      </div>
    </div>
    <div class="list">
      <p>项目名称</p>
      <div class="list-right">
        <input placeholder="填写项目名称" type="text" v-model='proName' :readonly="!ifEdit?true:false" />
        <div class="right-div "></div>
      </div>
    </div>
    <div class="list">
      <p>项目天数</p>
      <div class="list-right">
        <input placeholder="填写项目天数" type="number" v-model='proNumber' :readonly="!ifEdit?true:false" />
        <div class="right-div "></div>
      </div>
    </div>
    <div class="question">
      <div class="checkbox-title" style="padding-bottom: calc(1rem / 2);">描述</div>
      <div class="question-textarea">
        <wv-textarea placeholder="请输入文本" :rows="4" :show-counter="false" v-model='conName' :readonly="!ifEdit?true:false"></wv-textarea>
      </div>
    </div>
    <div class="img">
      <div class="checkbox-title" style="padding-bottom: calc(3.2rem / 2);">上传照片或者视频（最多5张）</div>
      <div class="imgA">
        <div class="imgBdiv" @click="modieBox(item.cover,item.id,key)" v-for="(item,key) in contentList">
          <div class="closeImg" @click.stop="closeFun(key)" v-show="!ifEdit?false:true">
            <img src="../assets/images/icon/close.png" />
          </div>
          <img :src="item.cover" />
          <div v-if="item.isVideo==1" class="playImg">
            <img src="@/assets/images/icon/playImg.png" />
          </div>
        </div>
        <div class="imgBdiv" @click="modieBox(0,0)" v-if="contentList.length<5">
          <img src="../assets/images/icon/upload.png" />
        </div>
        <div style="clear: both;"></div>
      </div>
    </div>
    <div class="divHeight"></div>
  </div>
  <div class="buttonA" v-if="!ifEdit && !ifSucce" @click='editFun'>
    <button>编辑</button>
  </div>
  <div class="buttonA" v-if="ifEdit && ifSucce" @click='subSuccess'>
    <button :disabled="disab">保存</button>
  </div>
  <div class="buttonA" v-if="ifEdit&&!ifSucce" @click="submitA">
    <button :disabled="disab">提交</button>
  </div>
  <!-- 日期选择器 -->
  <wv-datetime-picker ref="picker" type="date" v-model="dateTime" @confirm="onConfirm" :start-date="new Date('1970/01/01 00:00')" :end-date="new Date()">
  </wv-datetime-picker>
  <!-- 日期选择器 END-->

  <!-- 上传文件 -->
  <div v-if="isShow" class="allBox">
    <div class="contentBox">
      <div>
        <form class="form form-horizontal" ref="form" method="post" enctype="multipart/form-data">
          <input type="file" class="sCbutton" id="formImg" name="uploadFile3" @change="changeUpload1('uploadFile3')" accept="image/*" />
          <input hidden name="uploadName" :value="uploadName">
        </form>
        <img :src="modImg" />
      </div>
      <div>
        <form class="form form-horizontal" ref="formVideo" method="post" enctype="multipart/form-data">
          <input type="file" class="sCbutton" id="formVideo" name="uploadFile3" @change="changeUpload2('uploadFile3')" accept="*" />
          <input hidden name="uploadName" :value="uploadName">
        </form>
        <img v-if="modUrl!=''" :src="modUrl" />
        <div v-if="modUrl==''" class="playImg">
          <img src="@/assets/images/icon/playImg.png" />
        </div>
      </div>
    </div>
    <div class="gbBox" @click="gbBox"></div>
  </div>
  <div v-if="isDafault" class="DafaultBox">
    <wv-button type="default" is-loading class="buttonBg">正在加载中...</wv-button>
  </div>
  <!-- 上传文件 END-->
</div>
</template>

<script>
import * as api from '@/assets/js/api';
import Vue from 'vue';
import * as session from '@/assets/js/session';
import {
  Textarea,
  Toast,
  DatetimePicker,
  Button,
} from 'we-vue';
Vue.use(Textarea).use(DatetimePicker).use(Button);
export default {
  data() {
    return {
      ImgNull: this.$store.state.ImgNull,
      diaryInfo: '',
      ifEdit: false,
      dateTime: new Date(),
      birthday: '选择日期', //日期内容
      proName: '', //项目名称
      proNumber: '', //项目天数
      conName: '', //综合描述
      disab: false, //是否点击提交
      uploadName: '', //inout 名称 从这往下的变量都做为上传文件使用
      contentList: [],
      isShow: false,
      ifSucce: false, //是否保存内容
      modImg: '', //待修改路径，上传图片
      modUrl: '', //待修改路径，上传视频
      imgUrlid: "",
      isDafault: false, //正在加载框
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
  },
  mounted: function() {
    let that = this;
    if (!session.Lstorage.getItem('ifNewly')) {
      that.ifEdit = false;
      api.getVipDiaryDetail({
        data: {
          openid: that.$store.state.uid,
          diaryid: session.Lstorage.getItem('ListsID')
        }
      }).then(res => {
        if (res.data.flag) {
          console.log('我的日记详情', res.data);
          that.diaryInfo = res.data.diary;
          that.proName = res.data.diary.prjName;
          that.proNumber = res.data.diary.dayIndex;
          that.conName = res.data.diary.content;
          that.contentList = res.data.diary.listResource;
          console.log(res.data.diary.listResource)
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
      });
    } else {
      that.ifEdit = true;
    }
  },
  methods: {
    editFun: function() {
      this.ifSucce = true;
      this.ifEdit = true;
    },
    subSuccess: function() {
      // 保存
      let that = this;
      that.disab = true;
      api.saveDiary({
        data: {
          openid: this.$store.state.uid,
          diaryid: 1, //0=新增
          orderid: session.Lstorage.getItem('ListsID'),
          date: that.diaryInfo.date10,
          content: that.conName,
          resourceList: JSON.stringify(that.contentList),
          dayIndex: that.proNumber,
        }
      }).then(res => {
        if (res.data.flag) {
          console.log('提交日记详情', res.data);
          Toast.text({
            duration: 1000,
            message: '提交信息成功',
          });
          setTimeout(function() {
            history.go(-1);
          }, 1200);
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
      });
    },
    submitA: function() {
      // 提交
      let that = this;
      let num = /^[1-9]\d*$/;
      if (that.birthday == '选择日期') {
        Toast.text({
          duration: 1000,
          message: '请选择日期'
        });
        return;
      } else if (that.proName == "") {
        Toast.text({
          duration: 1000,
          message: '请填写项目名称'
        });
        return;
      } else if (that.proNumber == "") {
        Toast.text({
          duration: 1000,
          message: '请填写项目天数'
        });
        return;
      } else if (that.conName == "") {
        Toast.text({
          duration: 1000,
          message: '请填写项目描述'
        });
        return;
      } else if (!num.test(that.proNumber)) {
        Toast.text({
          duration: 1000,
          message: '请输入有效的项目天数'
        });
        return;
      }
      that.disab = true;
      // console.log('项目名称', that.proName);
      api.saveDiary({
        data: {
          openid: this.$store.state.uid,
          diaryid: 0, //0=新增
          orderid: '',
          date: that.birthday,
          content: that.conName,
          resourceList: JSON.stringify(that.contentList),
          dayIndex: that.proNumber,
        }
      }).then(res => {
        if (res.data.flag) {
          console.log('提交日记详情', res.data);
          Toast.text({
            duration: 1000,
            message: '提交信息成功',
          });
          setTimeout(function() {
            history.go(-1);
          }, 1200);
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
      });
    },
    // 选择日期功能
    openPicker: function(res) {
      // 选择日期功能
      if (!session.Lstorage.getItem('ifNewly')) {
        Toast.text({
          duration: 1000,
          message: '日期不可编辑',
        });
        return;
      }
      this.$refs[res].open();
    },
    onConfirm: function(res) {
      let year = res.getFullYear();
      let month = res.getMonth() + 1;
      let date = res.getDate();
      this.birthday = `${year}-${month}-${date}`;
    },
    // 选择日期功能 END
    // 从这里往下都是上传文件所需方法
    closeFun: function(key) {
      this.contentList.splice(key, 1);
    },
    gbBox: function() {
      this.isShow = false;
      this.imgUrlid = ''
    },
    modieBox: function(cover, id, key) {
      if (!this.ifEdit) {
        Toast.text({
          duration: 1000,
          message: '请点击编辑后修改'
        });
        return;
      }
      if (cover == 0) {
        console.log('添加');
        this.isShow = true;
        this.modImg = require('../assets/images/icon/upload.png');
        this.modUrl = require('../assets/images/icon/upload.png');
      } else {
        console.log('修改');
        this.isShow = true;
        this.imgUrlid = key;
        this.modImg = cover;
        if (this.contentList[key].isVideo == 0) {
          this.modUrl = require('../assets/images/icon/upload.png');
        } else {
          this.modUrl == ''
        }

      }
    },
    changeUpload1: function(_uploadName, _idImg) {
      this.uploadName = _uploadName;
      let that = this;
      var imgValue = document.getElementById('formImg').value;
      if (imgValue != '') {
        var index = imgValue.lastIndexOf("\.");
        var str = imgValue.substring(index + 1, imgValue.length);
        if (str == 'png' || str == "jpg" || str == "jpeg") {
          this.isDafault = true;
          setTimeout(function() {
            var formData = new FormData(that.$refs.form);
            that.Up(formData);
          }, 500);
        } else {
          Toast.text({
            duration: 1000,
            message: '请上传图片'
          });
          document.getElementById('formImg').value = '';
          return;
        }

      }
    },
    changeUpload2: function(_uploadName, _idImg) {
      console.log(this.imgUrlid, 'sdfdsfdsfsf');
      if (this.imgUrlid === '') {
        this.modUrl = require('../assets/images/icon/upload.png');
        Toast.text({
          duration: 1000,
          message: '请先上传图片'
        });
        return;
      } else {
        let that = this;
        var videoValue = document.getElementById('formVideo').value;
        if (videoValue != '') {
          var index = videoValue.lastIndexOf("\.");
          var str = videoValue.substring(index + 1, videoValue.length);
          if (str == 'mp4') {
            this.isDafault = true;
            this.uploadName = _uploadName;
            setTimeout(function() {
              var formData = new FormData(that.$refs.formVideo);
              that.UpFile(formData);
            }, 500);
          } else {
            console.log('sdfsdfdsfds');
            Toast.text({
              duration: 1000,
              message: '请上传视频'
            });
            document.getElementById('formVideo').value = '';
            return;
          }

        }

      }

    },
    UpFile: function(data) {
      var that = this;
      api.uploadFile({
        data: data
      }).then(res => {
        if (res.data.flag) {
          this.modUrl = '';
          this.contentList[this.imgUrlid].isVideo = 1;
          this.contentList[this.imgUrlid].url = res.data.url
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
        this.isDafault = false;
      });
    },
    Up: function(data) {
      api.uploadPic({
        data: data
      }).then(res => {
        if (res.data.flag) {
          this.modImg = res.data.url
          if (this.imgUrlid === '') {
            this.contentList.push({
              isVideo: 0,
              'cover': res.data.url,
              'url': ''
            })
            this.imgUrlid = this.contentList.length - 1;
          } else {
            this.contentList[this.imgUrlid].cover = res.data.url;
          }
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
        this.isDafault = false;
      });
    },
    // 到此结束上传视频方法

  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineDiaryLists.scss';
@import '@/assets/css/mineDiary.scss';

.colorA {
    color: #333 !important;
}
</style>
