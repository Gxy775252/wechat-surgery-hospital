<template>
	<div>
		<div class="TopContent">
			<div class="logo">
				<img src="@/assets/images/icon/logo.png"/>
			</div>
			<div class="search">
				<img src="@/assets/images/icon/search.png"/>
			</div>
		</div>
		<div class="swiper">
			<div class="swiperImg">
				<wv-swipe  :autoplay="4000" class="swiperImg">
					<wv-swipe-item>
						<img src="@/assets/images/icon/doctore.png" />	
					</wv-swipe-item>
					<wv-swipe-item>
						<img src="@/assets/images/icon/doctore.png" />	
					</wv-swipe-item>
					<wv-swipe-item>
						<img src="@/assets/images/icon/doctore.png" />	
					</wv-swipe-item>
				</wv-swipe>
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
@import '@/assets/css/Index.scss';
</style>
