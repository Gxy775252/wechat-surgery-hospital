<template>
	<div class="background">
		<div class="addbox">
			<div class="bigBox">
				<div class="addimg"><img src="../assets/images/icon/add.png"></div>
				<div class="addFont">
					<div>
						<p class="nameFont">收件人：丁冰</p>
						<p class="nameFont">电话：13333333333</p>
					</div>
					<p class="add">收件地址：北京朝阳区安立路长新大厦401</p>
				</div>
			</div>
			<div class="buttonImg"><img src="../assets/images/icon/rightGray.png"></div>
		</div>
		<div class="comBox">
			<img src="../assets/images/example/yiqi.png" class="comImg">
			<div class="specName">
				<p class="comName">活力眼凝胶</p>
				<p class="spec">规格：20ml</p>
				<div>
					<p class="money">￥299</p>
					<div class="number">x1</div>
				</div>
			</div>
		</div>
		<div class="payBox">
			<div class="payFont">支付方式</div>
		</div>
		<div class="payName">
			<div class="payWeChat" v-for="item in dataPay" :key="item.id" @click="selectPay(item.id)">
				<div class="imgWeChat">
					<img :src="item.img" />
					<p>{{item.payFont}}</p>
				</div>
				<div class="selectImg">
					<img v-if="!item.isshow" src="../assets/images/icon/sele.png" />
					<img v-if="item.isshow" src="../assets/images/icon/select.png" />
			     </div>
			</div>
		</div>
		<div class="integralBox">
			<div class="integralFont">
				<p class="uses">使用积分</p>
				<p class="numberInt">（1000积分共抵扣10元）</p>
			</div>
			<img :src="shutOpent" @click="shutClick"/>
		</div>
		<div class="bottomBox">
			<div class="bottomMoney">￥299</div>
			<div class="bottomPay">去支付</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
               shutOpent:require('../assets/images/icon/shut.png'),
			   dataPay:[
				  {id:1,img:require('../assets/images/icon/wechat.png'),payFont:'微信支付',isshow:false},
				   {id:2,img:require('../assets/images/icon/wallet.png'),payFont:'余额支付',isshow:true}
			   ]
			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			})
		},
		methods:{
			shutClick(){
				if(this.shutOpent==require('../assets/images/icon/shut.png')){
					this.shutOpent=require('../assets/images/icon/open.png')
				}else{
					this.shutOpent=require('../assets/images/icon/shut.png')
				}
			},
			selectPay(id){
				for(var i=0; i<this.dataPay.length;i++){
					if(id==this.dataPay[i].id){
						this.dataPay[i].isshow=true;
					}else{
						this.dataPay[i].isshow=false;
					}
				}
			   
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	@import '@/assets/css/placeOrder.scss';
</style>
