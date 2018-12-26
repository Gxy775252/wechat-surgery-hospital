<template>
	<div>
		<div class="all">
			<div>
				<video :src="videoUrl" :controls="controls" :autoplay="autoplay"></video>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    props: {
        videoUrl: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            autoplay: true,
            controls: true
        };
    },
    created: function() {
        this.$store.commit('showBottomNav', {
            isShow: false
        });
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
}
</style>
