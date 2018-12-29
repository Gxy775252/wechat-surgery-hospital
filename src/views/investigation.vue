<template>
	<div>
	</div>
     
</template>

<script>
import star from '@/components/Stars'; //引入星级评分组件

export default {
	data() {
		return {
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
	},
	components: {
		star
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/investigation.scss';
</style>
