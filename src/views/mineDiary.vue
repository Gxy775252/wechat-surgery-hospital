<!-- 美丽日记 -->
<template>
	<div class="all">
		<div class="diaryList">
			<div class="list">
				<p>皮肤检测</p>
				<div class="list-right">
					<p>去检测皮肤</p>
					<div class="right-div">
						<img src="@/assets/images/icon/mineHore.png" />
					</div>
				</div>
			</div>
			<div class="list">
				<p>您的肤质</p>
				<div class="list-right" @click="prickPro()">
					<p :class="listConA">{{stores | pickerValueFilter}}</p>
					<div class="right-div">
						<img src="@/assets/images/icon/mineHore.png" />
					</div>
				</div>
			</div>
			<div class="list">
				<p>是否做过整容项目</p>
				<div class="select">
					<div class="select-on" @click="sex(1)">
						<div>
							<img src="@/assets/images/icon/select-Center.png" v-if="ifSex==1" />
							<img src="@/assets/images/icon/sele.png" v-else />
						</div>
						<p>是</p>
					</div>
					<div class="select-on" @click="sex(2)">
						<div>
							<img src="@/assets/images/icon/select-Center.png" v-if="ifSex==2" />
							<img src="@/assets/images/icon/sele.png" v-else />
						</div>
						<p>否</p>
					</div>
				</div>
			</div>
			<div class="checkbox">
				<div class="checkbox-title">做过的整容项目<p>（勾选您做过的整容项目，可多选）</p>
				</div>
				<div class="checkbox-con">
					<div class="content" v-for="(item,key,index) in list" :key='key' @click="checkbox(item.id)">
						<div>
							<img src="@/assets/images/icon/checkbox-z.png" v-if="item.isClick" />
							<img src="@/assets/images/icon/checkbox.png" v-else />
						</div>
						<p>{{item.name}}</p>
					</div>
					<div style="clear: both;"></div>
				</div>
			</div>
			<div class="question">
				<div class="checkbox-title" style="padding-bottom: calc(1rem / 2);">需要解决的问题以及期望</div>
				<div class="question-textarea">
					<wv-textarea placeholder="请输入文本" :rows="4" v-model='textABC'></wv-textarea>
				</div>
			</div>

			<div class="img">
				<div class="checkbox-title" style="padding-bottom: calc(3.2rem / 2);">上传照片或者视频（最多5张）</div>
				<div class="imgA">
					<div class="imgBdiv" @click="modieBox(item.cover,item.id,key)" v-for="(item,key) in contentList">
						<div class="closeImg" @click.stop="closeFun(key)">
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
		<div class="buttonA" @click="submit">
			<button>提交</button>
		</div>
		<!-- 选择肤质 -->
		<wv-picker :visible.sync="fruitPickerShow" :columns="fruitColumns" value-key="skinType" @confirm="confirmPerson" />
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
						<input type="file" class="sCbutton" id="formVideo" name="uploadFile3" @change="changeUpload2('uploadFile3')"
						 accept="*" />
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
	</div>
</template>

<script>
	import Vue from 'vue';
	import * as api from '@/assets/js/api';
	import {
		Textarea,
		Toast,
		Picker,
		Button
	} from 'we-vue';
	Vue.use(Textarea).use(Picker).use(Button);
	export default {
		name: 'mineDiary',
		data() {
			return {
				ImgNull: this.$store.state.ImgNull,
				ifSex: 2, //是否做过整容项目
				list: [], //整容项目
				listArray: [], //存储整容项目
				uploadName: '', //inout 名称
				contentList: [],
				isShow: false,
				modImg: '', //待修改路径，上传图片
				modUrl: '', //待修改路径，上传视频
				imgUrlid: "",
				isDafault: false, //正在加载框
				fruitPickerShow: false,
				fruitColumns: [{
					values: []
				}],
				stores: [{
					skinType: '请选择'
				}], //您的肤质
				listConA: '', //改变颜色
				textABC: '', //文本信息
			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
		},
		mounted: function() {
			api.goVipSkinInfo({
				data: {
					openid: this.$store.state.uid
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('美丽日记数据', res.data);
					for (let i in res.data.listProject) {
						res.data.listProject[i].isClick = false;
					}
					this.list = res.data.listProject; //整容项目
					this.ticketColumns = res.data.skinInfo;
					this.fruitColumns[0].values = res.data.listSkinType; //肤质信息
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		methods: {
			closeFun: function(key) {
				this.contentList.splice(key, 1);
			},
			gbBox: function() {
				this.isShow = false;
				this.imgUrlid = ''
			},
			modieBox: function(cover, id, key) {
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

			// 提交内容
			submit: function() {
				let that = this;
				api.submitSkininfo({
					data: {
						openid: that.$store.state.uid,
						skinType: that.stores.skinType,
						faceLifted: that.ifSex,
						projects: that.listArray.join(';'),
						memo: that.textABC,
						resourceList: JSON.stringify(that.contentList), //上传图片内容
					}
				}).then(res => {
					if (res.data.flag) {
						this.$router.push({
							name: 'mineDiaryList'
						});
					} else {
						Toast.text({
							duration: 1000,
							message: res.data.msg
						});
					}
				});
			},

			// 多选整容项目
			checkbox: function(res) {
				for (let i in this.list) {
					if (this.list[i].id == res && !this.list[i].isClick) {
						this.list[i].isClick = true;
						this.listArray.push(this.list[i].id);
					} else if (this.list[i].id == res && this.list[i].isClick) {
						this.list[i].isClick = false;
						if (this.listArray.indexOf(this.list[i].id) > -1) {
							this.listArray.splice(this.listArray.indexOf(this.list[i].id), 1);
						}
					}
				}
			},
			// 选择是否做过整容项目
			sex: function(res) {
				this.ifSex = res;
			},
			// 选择皮肤分析
			prickPro: function() {
				this.fruitPickerShow = true;
			},
			confirmPerson: function(picker) {
				this.stores = picker.getValues()[0];
				this.listConA = 'listConA';
			}
		},
		filters: {
			pickerValueFilter(val) {
				if (val.constructor == Array) {
					return '请选择';
				} else {
					return val.skinType.toString();
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/css/mineDiary.scss';
</style>
