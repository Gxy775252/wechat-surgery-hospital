<!-- 我的收藏 -->
<template>
	<div class="all">
		<div class="listAll">
			<div class="insList" v-for="(item,key,index) in content" :key='key'>
				<div class="insImg" @click="videoPlay(item.resource.url)">
					<img :src="resource!=null ?item.resource.cover : ImgNull" class="imgA" />
				</div>
				<div class="insInfo">
					<p>{{item.goodsName}}</p>
					<p>{{item.goodsBrief}}</p>
				</div>
				<div class="inspirce">
					<p>￥{{item.goodsPrice}}</p>
					<div @click="shoucang(item.goodsid)">
						<img :src="heart" />
					</div>
				</div>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div v-if="content.length==0" class="nullImg">
			<div class="cartNull">
				<img src="../assets/images/icon/cartNull.png" />
				<p>暂无收藏商品</p>
			</div>
		</div>
	</div>
</template>
<script>
	import * as api from '@/assets/js/api';
	import {
		Toast,
		Dialog
	} from 'we-vue';
	import * as session from '@/assets/js/session';
	export default {
		name: 'mineCollector',
		inject: ['reload'],
		data() {
			return {
				ImgNull: this.$store.state.ImgNull,
				isPlay: false,
				content: [],
				heart: require('@/assets/images/icon/shoucang.png'),
				defaultProps1: {
					children: 'children',
					label: 'comName'
				}
			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
			api.getVipFavorList({
				data: {
					openid: this.$store.state.uid
				}
			}).then(res => {
				console.log('我的收藏', res.data);
				if (res.data.flag) {
					this.content = res.data.listFavor;
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		methods: {
			shoucang: function(res) {
				Dialog.confirm({
						title: '确认取消收藏吗？',
						skin: 'ios',
						showCancelButton: true
					})
					.then(() => {
						api.unfavor({
							data: {
								openid: this.$store.state.uid,
								goodsid: res
							}
						}).then(res => {
							if (res.data.flag) {
								Toast.text({
									duration: 1000,
									message: '取消成功'
								});
								this.reload();
							} else {
								Toast.text({
									duration: 1000,
									message: res.data.msg
								});
							}
						});
					})
					.catch(() => {});
			},
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/css/mineCollector.scss';
</style>
