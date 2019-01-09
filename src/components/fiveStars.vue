<template>
	<div>
		<div class="rating">
			<img :style="{width:size+'px',height:size+'px'}" v-for="item,index in imgs" :src="item.colorUrl" v-on:click="stars(index)"/>
	     </div>
	</div>
</template>

<script>
	export default {
		props:{
			size: {
                type : Number//参数：尺寸
            },
		},
		data() {
			return {
				imgs:[
					{colorUrl:require("@/assets/images/icon/ashStars.png")},
					{colorUrl:require("@/assets/images/icon/ashStars.png")},
					{colorUrl:require("@/assets/images/icon/ashStars.png")},
					{colorUrl:require("@/assets/images/icon/ashStars.png")},
					{colorUrl:require("@/assets/images/icon/ashStars.png")}
				],
				gray:require("@/assets/images/icon/ashStars.png"),
				green:require("@/assets/images/icon/bigStarColor.png")
			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
		},
		methods:{
			stars:function(index){
				console.log(index);
				for(var i=0;i<this.imgs.length;i++){
					if(i<=index){
						this.imgs[i].colorUrl=this.green;
					}else{
						this.imgs[i].colorUrl=this.gray;
					}
				}
			}
		}
	}
</script>

<style>
.rating {
	width:calc(26.6rem/2);
	margin:calc(1.3rem/2);
	border:1px solid;
	display: flex;
}
/* img{
	width:calc(5.3rem/2);
	height:calc(5.3rem/2);
} */
</style>
