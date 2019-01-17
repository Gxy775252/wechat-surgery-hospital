<!-- 我的收藏 -->
<template>
	<div class="all">
		<div class="listAll">
			<div class="insList" v-for="(item,key,index) in content" :key='key'>
				<div class="insImg" @click="videoPlay(item.resource.url)">
					<img :src="item.resource.cover || ImgNull" class="imgA"/>
					<div v-if="item.resource.isVideo==1" class="playImg">
						<img src="@/assets/images/icon/playImg.png" />
					</div>
				</div>
				<div class="insInfo">
					<p>{{item.goodsName}}</p>
					<p>{{item.goodsBrief}}</p>
				</div>
				<div class="inspirce">
					<p>￥{{item.goodsPrice}}</p>
					<div @click="shoucang(item.goodsid)">
						<img :src="heart" />
					</div>
				</div>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="briefImg" v-if="isPlay">
			<Video-Play :videoUrl="videoUrl" v-on:surt="surtChild" :isNone="isPlay"></Video-Play>
		</div>
	</div>
</template>
<script>
import VideoPlay from '@/components/bigWindowVideo';
import * as api from '@/assets/js/api';
import { Toast, Dialog } from 'we-vue';
import * as session from '@/assets/js/session';
export default {
	name: 'mineCollector',
	inject: ['reload'],
	components: {
		VideoPlay
	},
	data() {
		return {
			ImgNull: this.$store.state.ImgNull,
			isPlay: false,
			content: [],
			heart: require('@/assets/images/icon/shoucang.png'),
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
		api.getVipFavorList({
			data: {
				openid: this.$store.state.uid
			}
		}).then(res => {
			console.log('我的收藏', res.data);
			if (res.data.flag) {
				this.content = res.data.listFavor;
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	methods: {
		shoucang: function(res) {
			let that = this;
			Dialog.confirm({
				title: '确认取消收藏吗？',
				skin: 'ios',
				showCancelButton: true
			})
				.then(() => {
					api.unfavor({
						data: {
							openid: this.$store.state.uid,
							goodsid: res
						}
					}).then(res => {
						if (res.data.flag) {
							Toast.text({
								duration: 1000,
								message: '取消成功'
							});
							this.reload();
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
		videoPlay: function(res) {
			// 点击播放视频
			if (res.isVideo == 1) {
				this.videoUrl = res.url;
				this.isPlay = true;
				this.isNone = true;
			}
		},
		surtChild: function(data) {
			this.isPlay = false;
			this.isNone = false;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineCollector.scss';
</style>
