<template>
	<div>
		<div class="all"  v-if="showDis" >
			<div>
				<video :src="videoUrl" :controls="controls" :autoplay="autoplay"></video>
			</div>
			<div  class="aller" @click="surt"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		videoUrl: {
			type: String,
			required: true
		},
		isNone: false
	},
	data() {
		return {
			autoplay: true,
			controls: true,
			showDis: true
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
	},
	methods: {
		surt() {
			this.showDis = this.isNone;
			this.$emit('surt', 'false');
		}
	}
};
</script>
<style lang="scss" scoped>
.all {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
	z-index: 20;
	> div {
		width: 100%;

		> video {
			width: 100%;
		}
	}
	.aller {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		z-index: -9;
	}
}
</style>
