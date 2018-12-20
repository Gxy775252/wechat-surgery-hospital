<template>
	<div class="content">
		<div class="header logo">
			<img src="../assets/images/icon/logo.png" />
			<img src="" />
		</div>
		<div class="MSswiper">
			<div class="ppt_img">
				<img v-for="(item, index) in num" :key="index" src="@/assets/images/icon/doctore.png" alt="">
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Vue from 'vue';
import { Swipe, SwipeItem, Flex, FlexItem } from 'we-vue';
import { Authorization, parseUrl } from '@/assets/js/utils';
import wx from 'weixin-js-sdk';
import * as api from '@/assets/js/api';

Vue.use(Swipe)
    .use(SwipeItem)
    .use(Flex)
    .use(FlexItem);

export default {
    name: 'index',
    components: {
        // HelloWorld
    },
    data: function() {
        return {
            isShowTaskWindow: true,
            taskInfo: {},
			num: 3
        };
    },
    created: function() {},
    mounted: function() {},
    methods: {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/MissionSquare.scss';
</style>
