<!-- 选择地址 -->
<template>
	<div class="all">
		<div class="addressLst" v-for="(item,key,index) in listAddressInfo" :key='key'>
			<div class="listLeft" @click="clickAddress(item.id)">
				<div>
					<p>{{item.postName}}</p>
					<p>{{item.postPhone}}</p>
				</div>
				<p>{{item.postAddress}}</p>
			</div>
			<div class="listRight">
				<p></p>
				<p @click="edit(item.id)">编辑</p>
				<p @click="delAddress(item.id)">删除</p>
			</div>
		</div>
		<div class="bottomButton" @click="edit()">
			添加新地址
		</div>
	</div>
</template>

<script>
import { Toast, Dialog } from 'we-vue';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
export default {
	name: 'selectAddress',
	data() {
		return {
			listAddressInfo: ''
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.getVipAddressList({
			data: {
				openid: this.$store.state.uid
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('地址列表', res.data);
				this.listAddressInfo = res.data.listAddress; //地址列表
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	methods: {
		clickAddress: function(res) {
			// 选择地址
			console.log(res);
			api.setVipAddressid({
				data: {
					openid: this.$store.state.uid,
					addressid: res
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('选择地址', res.data);
					// 待修改 选择完地址后要干嘛
					this.$router.go(-1);
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		edit: function(res) {
			// 编辑
			session.Lstorage.setItem('editid',res)
			session.Lstorage.setItem('ifEditid',true)
			this.$router.push({
				name: 'newAddress',
			});
		},
		delAddress: function(res) {
			// 删除地址信息
			Dialog.confirm({
				title: '确认删除吗？',
				skin: 'ios',
				showCancelButton: true
			})
				.then(() => {
					api.deleteVipAddressid({
						data: {
							openid: this.$store.state.uid,
							addressid: res
						}
					}).then(res => {
						if (res.data.flag) {
						} else {
							Toast.text({
								duration: 1000,
								message: res.data.msg
							});
						}
					});
				})
				.catch(() => {});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/selectAddress.scss';
</style>
