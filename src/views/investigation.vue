<template>
	<div>
		
	</div>
</template>

<script>
export default {
    data() {
        return {};
    },
    created: function() {
        this.$store.commit('showBottomNav', {
            isShow: true
        });
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/investigation.scss';
</style>
