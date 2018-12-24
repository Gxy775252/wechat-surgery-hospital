<template>
	<div>
		<div class="model">
			<div class="modelWhite">
				<slot></slot>
				<button type="button" @click="clickDetermine">确定</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
		props:['data'],
    data() {
        return {};
    },
		methods: {
			clickDetermine: function(){
				if(this.data == "register"){
					this.$emit("HideTanChuang",{data: this.data});
				}
      },
		}
};
</script>

<style lang="scss" scoped>
.model {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    display: flex;
    align-items: center;
    .modelWhite {
        width: calc(33.33rem / 2);
        height: calc(38.86rem / 2);
        margin: auto;
        background: #fff;
        border-radius: 0.26rem;
        position: relative;
        > button {
            width: calc(21.33rem / 2);
            height: calc(5rem / 2);
            background-color: #008e83;
            border-radius: 0.26rem;
            color: #fff;
            position: absolute;
            left: 50%;
            margin-left: -31%;
			bottom:1.8rem;
        }
    }
}
</style>
