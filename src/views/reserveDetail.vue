<template>
	<div class="background">
		<div class="userName">{{orderInfo.name}}（用户姓名）</div>
		<div class="content">
			<div class="lineBox">
				<p class="nameList">预期医生</p>
				<p>{{orderInfo.doctorName}}</p>
			</div>
			<div class="lineBox">
				<p class="nameList">预约时间</p>
				<p>{{orderInfo.date}} {{orderInfo.period}}</p>
			</div>
			<div class="lineBox">
				<p class="nameList">预约门店</p>
				<p>{{orderInfo.hospName}}</p>
			</div>
			<div class="lineBox">
				<p class="nameList">预约项目</p>
				<p>{{orderInfo.prjName}}</p>
			</div>
			<div class="lineBox">
				<p class="nameList">预约费用</p>
				<p>￥{{orderInfo.payMoney}}</p>
			</div>
			<div class="lineBox">
				<p class="nameList">预约单号</p>
				<p>{{orderInfo.orderno}}</p>
			</div>
			<div class="lineBox">
				<p class="nameList">核销二维码</p>
			</div>
			<div class="code">
				<img :src="orderInfo.qrcode || ImgNull" />
			</div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg"/>
				<p>术前注意事项</p>
			</div>
		</div>
		<div class="textContent" v-html="orderInfo.preNotes"></div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg"/>
				<p>门店</p>
			</div>
		</div>
		<div class="positionBox">
			<div class="position">
				<p>我的位置：我的位置我的位置</p>
				<p>门店位置：门店位置门店位置</p>
				<div class="addImg"></div>
			</div>
		</div>
		
	</div>
</template>

<script>
import * as api from '@/assets/js/api';
import { Toast } from 'we-vue';
import * as session from '@/assets/js/session';
export default {
	data() {
		return {
			orderInfo:"",
			ImgNull: this.$store.state.ImgNull
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.goModelOrderDetail({
			data: {
				openid: this.$store.state.uid,
				orderid: 1,//待修改  接收传入的id
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('预约详情页', res.data);
				this.orderInfo=res.data.order;
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

<style scoped="scoped" lang="scss">
@import '@/assets/css/reserveDetail.scss';
</style>
