<template>
	<div>
		<Five-Srars :size="77"></Five-Srars>
		<Five-Srars :size="50"></Five-Srars>
	</div>
</template>

<script>
import FiveSrars from '@/components/fiveStars.vue';
import { Toast } from 'we-vue';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
export default {
	data() {
		return {};
	},
	components: {
		'Five-Srars': FiveSrars
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.goModelSurvey({
			data: {
				openid: this.$store.state.uid,
				orderid: 1 //待修改 传入订单号
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('满意度', res.data);
				// 待修改内容
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	}
};
</script>

<style>
</style>
