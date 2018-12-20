<template>
	<div>
		<div class="logo">
			<img src="@/assets/images/icon/logo.png"/>
		</div>
		<!-- <div class="">
			<div>
				<wv-swipe>
				  <wv-swipe-item style="background-color: #f44336">1</wv-swipe-item>
				</wv-swipe>
			</div>
		</div> -->
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
            taskInfo: {}
        };
    },
    created: function() {},
    mounted: function() {},
    methods: {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/Index.scss';
</style>
