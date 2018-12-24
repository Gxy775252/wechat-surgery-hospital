<template>
	<div>
		<div class="navList">
			<p class="selection">全部商品</p>
			<p>商品分类</p>
			<p>电器分类</p>
			<p>家用物品</p>
			<p>家</p>
			<p>家物品</p>
		</div>
		<div class="orderBy">
			<div>
				<p>价格排序</p>
				<img src="@/assets/images/icon/arrowUp.png"/>
			</div>
			<div>
				<p>销量排序</p>
				<img src="@/assets/images/icon/arrowUp.png"/>
			</div>
			<div class="lastDiv">
				<img src="@/assets/images/icon/search.png"/>
			</div>
		</div>
		<div class="AllList">
			<div class="listDiv">
				<div class="listImg">
					<img src="@/assets/images/example/doctor.png" />
				</div>
				<div class="listText">
					<p>活力眼凝胶</p>
					<p>香调浓郁，持久清爽，纯植物配方</p>
					<div class="ListPrice">
						<p>￥ 99</p>
						<div>
							<img src="@/assets/images/icon/joinCart.png" />
						</div>
					</div>
				</div>
			</div>
			<div class="listDiv">
				<div class="listImg">
					<img src="@/assets/images/example/doctor.png" />
				</div>
				<div class="listText">
					<p>活力眼凝胶</p>
					<p>香调浓郁，持久清爽，纯植物配方</p>
					<div class="ListPrice">
						<p>￥ 99</p>
						<div>
							<img src="@/assets/images/icon/joinCart.png" />
						</div>
					</div>
				</div>
			</div>
			<div class="listDiv">
				<div class="listImg">
					<img src="@/assets/images/example/doctor.png" />
				</div>
				<div class="listText">
					<p>活力眼凝胶</p>
					<p>香调浓郁，持久清爽，纯植物配方</p>
					<div class="ListPrice">
						<p>￥ 99</p>
						<div>
							<img src="@/assets/images/icon/joinCart.png" />
						</div>
					</div>
				</div>
			</div>
			<div class="listDiv">
				<div class="listImg">
					<img src="@/assets/images/example/doctor.png" />
				</div>
				<div class="listText">
					<p>活力眼凝胶</p>
					<p>香调浓郁，持久清爽，纯植物配方</p>
					<div class="ListPrice">
						<p>￥ 99</p>
						<div>
							<img src="@/assets/images/icon/joinCart.png" />
						</div>
					</div>
				</div>
			</div>
			<div style="clear:both;"></div>
		</div>
		<div class="cart">
			<img src="@/assets/images/icon/cart.png" />
		</div>
		<div style="height:6rem;"></div>
	</div>
</template>

<script>
export default {
    data() {
        return {};
    },
		created: function(){
			this.$store.commit('showBottomNav', {
				isShow: false
			})
		}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/commodityList.scss';
</style>
