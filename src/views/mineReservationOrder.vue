<!-- 我的预约订单 -->
<template>
	<div class="all">
		<div class="navList">
			<div v-for="(item,key,index) in titleContent" :key='key' @click="titleName(item.id)" >
				<p :class="titleId==item.id?'navSelect1':''">{{item.name}}</p>
				<p :class="titleId==item.id?'navSelect2 lineP':'lineP'"></p>
			</div>
		</div>
		<div class="conList" v-for="(item,key,inex) in listOrder" :key='key'>
			<div class="top">
				<!-- =0全部 =1已支付未核销 =2已核销 =-1已取消 -->
				<p class="hexiao" v-if="item.status==-1">已取消</p>
				<p class="hexiao" v-if="item.status==1">未核销</p>
				<p class="hexiao" v-if="item.status==2">已核销</p>
				<div>
					<p>预约时间</p>
					<p>{{item.date}} {{item.period}}</p>
				</div>
				<div>
					<p>预约门店</p>
					<p>{{item.hospName}}</p>
				</div>
				<div>
					<p>预约项目</p>
					<p>{{item.prjName}}</p>
				</div>
				<div>
					<p>预约医生</p>
					<p>{{item.doctorName}}</p>
				</div>
			</div>
			<div class="bottom">
				<div class="bottom-left">
					<p>已付金额：</p>
					<p>￥{{item.payMoney}}</p>
				</div>
				<div class="bottom-right" v-if="item.status==1">
					<button class="color1" @click="cancel(item.id)">取消预约</button>
					<button class="color2" @click="gomineReserveSuccess(item.id)">去核销</button>
				</div>
				<div class="bottom-right" v-if="item.status==2">
					<button class="color2" @click="seeId(item.id)">查看详情</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import { Toast, Dialog } from 'we-vue';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
export default {
	name: 'mineReservationOrder',
	inject: ['reload'],
	data() {
		return {
			titleId: 0,
			titleContent: [
				{ id: 0, name: '全部' },
				{ id: 1, name: '未核销' },
				{ id: 2, name: '已核销' }
			],
			listOrder: '',
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
		api.getVipGoodsOrderList({
			data: {
				openid: this.$store.state.uid,
				status: 0 //0=全部
			}
		}).then(res => {
			console.log(res);
			if (res.data.flag) {
				console.log('我的预约订单', res.data);
				this.listOrder = res.data.listOrder;
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	methods: {
		titleName: function(res) {
			// 选择顶部导航
			this.titleId = res;
			console.log('aaa----', res);
			api.getVipGoodsOrderList({
				data: {
					openid: this.$store.state.uid,
					status: res //=0全部 =1已支付未核销 =2已核销 =-1已取消
				}
			}).then(res => {
				console.log(res);
				if (res.data.flag) {
					console.log('我的预约订单', res.data);
					this.listOrder = res.data.listOrder;
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		cancel: function(res) {
			console.log('取消啊啊啊-----', res);
			Dialog.confirm({
				title: '提示',
				message: '是否取消',
				skin: 'ios',
				showCancelButton: true
			})
				.then(() => {
					api.cancelPrjtOrder({
						data: {
							openid: this.$store.state.uid,
							orderid: res
						}
					}).then(res => {
						console.log('是否取消了----', res);
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
		gomineReserveSuccess: function(res) {
			// 去核销
			session.Lstorage.setItem('successId', res);
			this.$router.push({ name: 'mineReserveSuccess' });
		},
		seeId:function(res){
			// 去查看详情
			session.Lstorage.setItem('seeId', res);
			this.$router.push({ name: 'mineReserveCheck' });
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineReservationOrder.scss';
</style>
