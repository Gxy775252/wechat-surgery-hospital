<template>
	<div>
		<Five-Srars :size="77"></Five-Srars>
		<Five-Srars :size="50"></Five-Srars>
	</div>
</template>

<script>
import FiveSrars from '@/components/fiveStars.vue';
export default {
	data() {
		return {};
	},
	components: {
		'Five-Srars': FiveSrars
	}
};
</script>

<style>
</style>
