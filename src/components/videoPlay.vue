<template>
	<div>
		<div class="all" v-if="showDis">
			<div>
				<video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"
				 @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)"></video-player>
			</div>
			<div class="aller" @click="isNDis"></div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			videoUrl: {
				type: String
			},
			isNone: false
		},
		data() {
			return {
				// 视频播放
				playerOptions: {
					playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
					autoplay: false, //如果true,浏览器准备好时开始回放。
					muted: false, // 默认情况下将会消除任何音频。
					loop: false, // 导致视频一结束就重新开始。
					preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
					language: 'zh-CN',
					aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
					fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
					sources: [{
						type: '',
						src: 'http://img.tukuppt.com/video_show/2269348/00/02/23/5b52ff923e41e.mp4' //url地址
					}],
					// poster:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=764856423,3994964277&fm=27&gp=0.jpg', //你的封面地址
					// width: document.documentElement.clientWidth,
					notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
					controlBar: {
						timeDivider: true,
						durationDisplay: true,
						remainingTimeDisplay: false,
						fullscreenToggle: true //全屏按钮
					}
				},
				showDis: true
			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
			console.log('哈哈哈哈', this.videoUrl)
			this.playerOptions.autoplay = true;
			this.playerOptions.sources[0].src = this.videoUrl; //获取后台传入的视频地址
			this.showDis = this.isNone
		},
		methods: {
			onPlayerPlay(player) {},
			onPlayerPause(player) {},
			onPlayerEnded() {
				this.$emit('surt', 'false');
				this.showDis = this.isNone;
			},
			isNDis: function() {
				this.$store.commit('showBottomNav', {
					isShow: true
				});
				this.showDis = this.isNone;
				this.$emit('surt', 'false');
			}
		}
	};
	require('@/assets/css/videoPlay.scss');
	require('video.js/dist/video-js.css');
	require('vue-video-player/src/custom-theme.css');
</script>

<style lang="scss" scoped>
	.all {
		width: 100%;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		z-index: 20;

		>div {
			width: 100%;
		}
	}

	.aller {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		z-index: -9;
	}
</style>
