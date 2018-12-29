<template>
	<div class="background">
		<div v-if="dataList.length==0" class="cartNull">
			<img src="../assets/images/icon/cartNull.png" />
			<p>购物车为空</p>
		</div>
		<div class="box" v-if="dataList.length!=0">
			<p class="edit">编辑</p>
			<div class="contentBox" v-for="(item,index) in dataList" :key="item.id">
				<div class="fontImg">
					<div class="check" @click="check(index)">
						<img v-if="!item.check" src="../assets/images/icon/sele.png" />
						<img v-if="item.check" src="../assets/images/icon/select.png" />
					</div>
					<img :src="item.img" />
					<div class="nameStandard">
						<p class="nameFont">{{item.name}}</p>
						<p class="standard">规格：{{item.standard}}</p>
					</div>
				</div>
				<div class="buttonMoney">
					<p>¥{{item.money}}</p>
					<div>
						<button @click="reduce(index)">-</button>
						<p>{{item.number}}</p>
						<button @click="plus(index)">+</button>
					</div>
				</div>
			</div>
			<div class="bottomBox">
				<div class="moneyBox">
					<div class="allcheck" @click="allcheck">
						<img v-if="!allSelect" src="../assets/images/icon/sele.png" />
						<img v-if="allSelect" src="../assets/images/icon/select.png" />
					</div>
					<p class="checkAll">全选</p>
					<p class="numFont">合计：</p>
					<p class="allMoney">￥{{num}}</p>
				</div>
				<div class="payGo">去结算</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'shoppingCart',
		data() {
			return {
				dataList: [{
						id: 1,
						name: '活力眼凝胶',
						money: 100,
						number: '1',
						standard: '200ml',
						img: require('../assets/images/example/listImgOne.png'),
						check: false
					},
					{
						id: 2,
						name: '活力眼凝胶',
						money: 100,
						number: '1',
						standard: '200ml',
						img: require('../assets/images/example/listImgOne.png'),
						check: false
					},
					{
						id: 3,
						name: '活力眼凝胶',
						money: 100,
						number: '1',
						standard: '200ml',
						img: require('../assets/images/example/listImgOne.png'),
						check: false
					}
				],
				num:0,
				allSelect:false
			};
		},
		watch: {
			// 监听数据是否变化，
			dataList: { //深度监听，可监听到对象、数组的变化
				handler(val, oldVal) {
					var money=0;
					var iArray=[];
        for(var i=0;i<this.dataList.length;i++){
					if(this.dataList[i].check==true){
						iArray.push(i);
						money+=(this.dataList[i].money*this.dataList[i].number);
					}
				}
				if(this.dataList.length!=0){
					if(iArray.length==this.dataList.length){
						this.allSelect=true;
					}else{
						this.allSelect=false;
					}
					this.num=money;
				}
				},
				deep: true
			}

		},

		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			})
		},
		methods: {
			// 复选框
			check(e) {
				if (this.dataList[e].check == false) {
					this.dataList[e].check = true;
				} else {
					this.dataList[e].check = false;
				}
			},
			// 全选
			allcheck(){
				if(this.allSelect==false){
					for(var i=0;i<this.dataList.length;i++){
						this.dataList[i].check=true;
						this.allSelect=true;
					}
					}else{
						for(var i=0;i<this.dataList.length;i++){
							this.dataList[i].check=false;
							this.allSelect=false;
						}
					}
			},
			// 减号
			reduce(e){
				if(this.dataList[e].number==1){
					// console.log('删除')
					this.dataList.splice(e, 1);
				}else{
					this.dataList[e].number--;
				}
			},
			// 加号
			plus(e){
				this.dataList[e].number++;
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	@import '@/assets/css/shoppingCart.scss';
</style>
