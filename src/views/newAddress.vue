<template>
	<div class="all">
		<div class="inputText">
			<p>姓名</p>
			<input placeholder="输入收获人姓名"/>
		</div>
		<div class="inputText">
			<p>手机号</p>
			<input  type="number" maxlength="11" placeholder="输入收获人手机号"  />
		</div>
		<div class="inputText">
			<p>邮政编码</p>
			<input placeholder="输入邮政编码"/>
		</div>
		<div class="inputText">
			<p>详细地址</p>
			<input placeholder="街道、楼牌号等详细地址"/>
		</div>
		<div class="sub">
			<button>保存</button>
		</div>
	</div>
</template>

<script>
export default {
    name: 'newAddress',
    data() {
        return {};
    },
    created: function() {
        this.$store.commit('showBottomNav', {
            isShow: false
        });
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/newAddress.scss';
</style>
